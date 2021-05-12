import Listener from "../structures/listener/Listener";
import Client from "../structures/Client";
import CommandContext from "../structures/command/CommandContext";

import database from "quick.db";
import Command from "../structures/command/Command";
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
            if ( !memberPermissions.has(permission) ) missingPermissions.push(permission);
        });
        if ( channel == true ) {
            permissions.forEach(permission => {
                if ( missingPermissions.includes(permission) ) return;
                if ( !message.channel.permissionsOf(memberId).has(permission) ) {
                    missingPermissions.push(permission);
                };
            });
        };
        return missingPermissions;
    };

    private missingBotPermissions(message: any, client: any) {
        const necessaryPermissions = ["sendMessages", "readMessageHistory"];
        if ( this.missingPermissions(message, client.user.id, necessaryPermissions, true).length > 0 ) {
            return false;
        } else {
            return true;
        };
    };

    public name: string = "messageCreate";
    public async run(client: Client, message: any) {
        if ( message.author.bot || message.webhookID || !message.guildID ) return;
        if ( !this.missingBotPermissions(message, client) ) return;

        const guildData = this.getGuildData(message.guildID);
        const userData = this.getUserData(message.author.id);

        const locale = await client.localeStructure.loadLocale(userData.language);
        
        if ( message.content.replace(/[<@!>]/g, "") == client.user.id ) return message.channel.createMessage({
            content: locale("basic:messageMention", { prefix: guildData.prefix, user: message.author.mention }),
            messageReferenceID: message.id,
        });
        if ( !message.content.startsWith(guildData.prefix) ) return;

        const args = message.content.slice(guildData.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        const command: Command = client.commandRegistry.findByName(commandName);
        if ( !command ) return false;

        const context = new CommandContext(client, message, args, locale, { guild: guildData, user: userData });
        await message.channel.sendTyping();

        if ( command?.botPermission != [] ) {
            let missingPermissions = this.missingPermissions(message, client.user.id, command.botPermission, true);
            if ( missingPermissions.length > 0 ) {
                missingPermissions = missingPermissions.map(v => locale(`permissions:${v}`)).join(", ");
                return context.replyT("Error", "basic:missingBotPermission", { permissions: missingPermissions });
            };
        };

        if ( command?.userPermission != [] ) {
            let missingPermissions = this.missingPermissions(message, client.user.id, command.userPermission, true);
            if ( missingPermissions.length > 0 ) {
                missingPermissions = missingPermissions.map(v => locale(`permissions:${v}`)).join(", ");
                return context.replyT("Error", "basic:missingUserPermission", { permissions: missingPermissions });
            };
        };

        if ( command?.onlyDevelopers != false ) {
            if ( !process.env.DEVELOPERS.includes(message.author.id) ) {
                return context.replyT("Error", "basic:missingDeveloperPermission");
            };
        };

        if ( args.length < command?.minArgument ) {
            return Helper.help(context, command);
        };

        command.run(context);
    };

};
