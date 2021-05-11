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
            case "en-us" || "enus":
                if ( context.database.guild.language == "en-US" ) {
                    return context.replyT("Error", "commands:language.messageError");
                };
                database.set(`guildData.${context.message.guildID}.language`, "en-US");
                return context.replyT(":flag_us:", "Now I will speak English with you!");
            case "pt-br" || "ptbr":
                if ( context.database.guild.language == "pt-BR" ) {
                    return context.replyT("Error", "commands:language.messageError");
                };
                database.set(`guildData.${context.message.guildID}.language`, "pt-BR");
                return context.replyT(":flag_br:", "Agora vou falar português com você!");
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