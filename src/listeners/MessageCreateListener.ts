import Listener from "../structures/listener/Listener";
import Client from "../structures/Client";
import CommandContext from "../structures/command/CommandContext";

import database from "quick.db";

interface guildData {
    prefix: string;
    language: string;
};

export default class MessageCreateListener extends Listener {

    private getGuildData(guildId): guildData {
        if ( !database.has(`guildData.${guildId}`) ) {
            database.set(`guildData.${guildId}`, { prefix: process.env.PREFIX, language: "en-US" });
            return {
                prefix: process.env.PREFIX,
                language: "en-US",
            };
        } else {
            return database.get(`guildData.${guildId}`);
        };
    };

    public name: string = "messageCreate";
    public async run(client: Client, message: any) {
        if ( message.author.bot || message.webhookID || !message.guildID ) return;

        const guildData = this.getGuildData(message.guildID);
        if ( !message.content.startsWith(guildData.prefix) ) return;

        const args = message.content.slice(guildData.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        if ( !client.commandRegistry.has(commandName) ) return false;
        const command = client.commandRegistry.get(commandName);

        const context = new CommandContext(client, message, args, "test");
        await message.channel.sendTyping();

        command.run(context);
    };

};
