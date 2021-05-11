import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import database from "quick.db";

export default class LanguageCommand extends Command {

    public name = "language";
    public category = "management";
    public aliases = [];
    public botPermission = [];
    public userPermission = [];
    public onlyDevelopers = false;

    public async run(context: CommandContext) {
        switch (context.args[0]?.toLowerCase()) {
            case "en-US":
                if ( context.database.guild.language == "en-US" ) {
                    return context.replyT("Error", "commands:language.messageError");
                };
                database.set(`guildData.${context.message.guildID}.language`, "en-US");
                context.replyT(":flag_us:", "commands:language.messageSuccess");
            case "pt-BR":
                if ( context.database.guild.language == "pt-BR" ) {
                    return context.replyT("Error", "commands:language.messageError");
                };
                database.set(`guildData.${context.message.guildID}.language`, "pt-BR");
                context.replyT(":flag_br:", "commands:language.messageSuccess");
            default:
                const embed = new EmbedBuilder();
                embed.setTitle(context.locale("commands:language.embedTitle"));
                embed.setColor("MANAGEMENT");
                embed.addField(`:flag_br: Português (pt-BR)`, `**Rafael CM**`, true);
                embed.addField(`:flag_us: American english (en-US)`, `**Rafael CM**`, true);
                context.send(embed.build());
        };
    };

};