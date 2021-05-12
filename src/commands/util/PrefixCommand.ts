import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import database from "quick.db";

export default class PrefixCommand extends Command {

    public name = "prefix";
    public category = "util";
    public aliases = [];
    public botPermission = [];
    public userPermission = ["manageGuild"];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "Change my server prefix or show what my current prefix.",
        "pt-BR": "Muda o meu prefixo do servidor ou mostra qual é meu prefixo atual."
    };
    public examples = ["lol!", "&"];

    public run(context: CommandContext) {
        if ( context.args[0].length > 5 ) return context.replyT("Error", "commands:prefix.limit");
        if ( context.args[0] == context.database.guild.prefix ) return context.replyT("Error", "commands:prefix.same");

        database.set(`guildData.${context.message.guildID}.prefix`, context.args[0]);
        context.replyT("Success", "commands:prefix.success", { prefix: context.args[0] });
    };

};