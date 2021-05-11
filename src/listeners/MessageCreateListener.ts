import Listener from "../structures/listener/Listener";
import Client from "../structures/Client";
import CommandContext from "../structures/command/CommandContext";

import database from "quick.db";
import Command from "../structures/command/Command";

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

    public name: string = "messageCreate";
    public async run(client: Client, message: any) {
        if ( message.author.bot || message.webhookID || !message.guildID ) return;

        const guildData = this.getGuildData(message.guildID);
        const userData = this.getUserData(message.author.id);

        const locale = await client.localeStructure.loadLocale(userData.language);
        
        if ( !message.content.startsWith(guildData.prefix) ) return;

        const args = message.content.slice(guildData.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        const command: Command = client.commandRegistry.findByName(commandName);
        if ( !command ) return false;

        const context = new CommandContext(client, message, args, locale, { guild: guildData, user: userData });
        await message.channel.sendTyping();

        if ( command?.onlyDevelopers != false ) {
            if ( !process.env.DEVELOPERS.includes(message.author.id) ) {
                return context.replyT("Error", "basic:missingDeveloperPermission");
            };
        };

        command.run(context);
    };

};
