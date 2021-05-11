import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import database from "quick.db";

export default class LanguageCommand extends Command {

    public name = "language";
    public category = "util";
    public aliases = [];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 0;
    public description = {
        "en-US": "Change a language on how I'm going to talk about a user.",
        "pt-BR": "Muda a linguagem de como eu vou falar de um usuário."
    };
    public examples = ["en-US", "pt-BR"];

    public async run(context: CommandContext) {
        switch (context.args[0]?.toLowerCase()) {
            case "en-us" || "enus":
                if ( context.database.user.language == "en-US" ) {
                    return context.replyT("Error", "commands:language.messageError");
                };
                database.set(`userData.${context.message.author.id}.language`, "en-US");
                return context.replyT(":flag_us:", "Now I will speak English with you!");
            case "pt-br" || "ptbr":
                if ( context.database.user.language == "pt-BR" ) {
                    return context.replyT("Error", "commands:language.messageError");
                };
                database.set(`userData.${context.message.author.id}.language`, "pt-BR");
                return context.replyT(":flag_br:", "Agora vou falar português com você!");
            default:
                const embed = new EmbedBuilder();
                embed.setTitle(context.locale("commands:language.embedTitle"));
                embed.setColor("MANAGEMENT");
                embed.addField(`:flag_br: Português (pt-BR)`, `Rafael CM`, true);
                embed.addField(`:flag_us: American english (en-US)`, `Rafael CM`, true);
                context.send(embed.build());
        };
    };

};