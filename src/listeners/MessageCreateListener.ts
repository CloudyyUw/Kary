import Listener from "../structures/listener/Listener";
import Client from "../structures/Client";
import CommandContext from "../structures/command/CommandContext";

import database from "quick.db";
import Command from "../structures/command/Command";
import CommandCooldown from "../structures/command/CommandCooldown";
import Helper from "../structures/util/Helper";

import Emoji from "../utils/Emoji";

interface guildData {
    prefix: string;
};

interface userData {
    language: string;
};

export default class MessageCreateListener extends Listener {

    private getGuildData(guildId): guildData {
        if ( !database.has(`guildData.${guildId}`) ) {
            database.set(`guildData.${guildId}`, { prefix: process.env.PREFIX });
            return {
                prefix: process.env.PREFIX,
            };
        } else {
            return database.get(`guildData.${guildId}`);
        };
    };

    private getUserData(userId): userData {
        if ( !database.has(`userData.${userId}`) ) {
            database.set(`userData.${userId}`, { language: "en-US" });
            return { language: "en-US" };
        } else {
            return database.get(`userData.${userId}`);
        };
    };

    private missingPermissions(message: any, memberId: string, permissions: string[], channel?: boolean): any {
        const missingPermissions = [];
        const memberPermissions = message.channel.guild.members.get(memberId).permissions;
        permissions.forEach(permission => {
            if ( !memberPermissions.has(permission) && !message.channel.permissionsOf(memberId).has(permission) ) missingPermissions.push(permission);
        });
        return missingPermissions;
    };

    private missingBotPermissions(message: any, client: any, permission: string) {
        const necessaryPermissions = [permission];
        if ( this.missingPermissions(message, client.user.id, necessaryPermissions, true).length > 0 ) {
            return false;
        } else {
            return true;
        };
    };

    public name: string = "messageCreate";
    public async run(client: Client, message: any) {
        if ( message.author.bot || message.webhookID || !message.guildID ) return;
        if ( !this.missingBotPermissions(message, client, "sendMessages") ) return;

        const guildData = this.getGuildData(message.guildID);
        const userData = this.getUserData(message.author.id);

        const regPrefix = new RegExp(`^(${guildData.prefix}|<@!?${client.user.id}>)( )*`, "gi");
        const locale = await client.localeStructure.loadLocale(userData.language);
        
        if ( !this.missingBotPermissions(message, client, "readMessageHistory") ) {
            await message.channel.sendTyping();
            return message.channel.createMessage(locale("basic:missingPermissionReadMessageHistory"));
        };
        if ( message.content.replace(/[<@!>]/g, "") == client.user.id ) {
            await message.channel.sendTyping();
            return message.channel.createMessage({
                content: locale("basic:messageMention", { prefix: guildData.prefix, user: message.author.mention }),
                messageReferenceID: message.id,
            });
        }
        if ( !message.content.match(regPrefix) ) return;
        
        const args = message.content.replace(regPrefix, "").trim().split(/ /g);
        const commandName = args.shift().toLowerCase();

        const command: Command = client.commandRegistry.findByName(commandName);
        if ( !command ) return false;

        const context = new CommandContext(client, message, args, locale, { guild: guildData, user: userData });
        await message.channel.sendTyping();

        if ( CommandCooldown.hasUser(message.author.id) ) {
            let userCooldownTime: any = CommandCooldown.getUserTime(message.author.id);
            if ( userCooldownTime < 0 ) userCooldownTime = locale("basic:cooldown.thousandths");
            else userCooldownTime = `${userCooldownTime.toFixed(0)} ${userCooldownTime == 1 ? locale("basic:cooldown.seconds") : locale("basic:cooldown.second")}`;
            return context.replyT("⏰", "basic:cooldown.message", { time: userCooldownTime });
        } else CommandCooldown.addUser(message.author.id);

        if ( command?.botPermission !== [] ) {
            let missingPermissions = this.missingPermissions(message, client.user.id, command.botPermission, true);
            if ( missingPermissions.length > 0 ) {
                missingPermissions = missingPermissions.map(v => locale(`permissions:${v}`)).join(", ");
                return context.replyT("Error", "basic:missingBotPermission", { permissions: missingPermissions });
            };
        };

        if ( command?.userPermission !== [] ) {
            let missingPermissions = this.missingPermissions(message, message.author.id, command.userPermission, true);
            if ( missingPermissions.length > 0 ) {
                missingPermissions = missingPermissions.map(v => locale(`permissions:${v}`)).join(", ");
                return context.replyT("Error", "basic:missingUserPermission", { permissions: missingPermissions });
            };
        };

        if ( command?.onlyDevelopers !== false ) {
            if ( !process.env.DEVELOPERS.includes(message.author.id) ) {
                return context.replyT("Error", "basic:missingDeveloperPermission");
            };
        };

        if ( Number(args.length) < Number(command?.minArgument) ) {
            return Helper.help(context, command, this.missingPermissions);
        };

        command.run(context);
    };

};
