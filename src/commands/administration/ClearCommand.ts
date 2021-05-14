import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

export default class ClearCommand extends Command {

    public name = "clear";
    public category = "administration";
    public aliases = ["clean"];
    public botPermission = ["manageMessages", "readMessageHistory"];
    public userPermission = ["manageMessages"];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "Clear messages from a channel, or just clear messages from a user on that channel.",
        "pt-BR": "Limpa mensagens de um canal, ou só limpa mensagens de um usuário neste canal."
    };
    public examples = ["37", "52 @Rafael"];

    public async run(context: CommandContext) {
        if ( isNaN(parseInt(context.args[0])) ) return context.replyT("Error", "commands:clear.nan");
        if ( parseInt(context.args[0]) < 2 || parseInt(context.args[0]) > 100 ) return context.replyT("Error", "commands:clear.limit");
        
        const userFilter = await context.getUser(context.args[1]);
        const purgeFilter = userFilter ? (((message) => message.author.id == userFilter?.id)) : null;

        context.message.channel.purge(parseInt(context.args[0]), purgeFilter).then(messages => {
            if ( purgeFilter == null ) context.replyT("🧹", "commands:clear.success", { messages }, { reference: false });
            else context.replyT("🗑", "commands:clear.successFilter", { messages, userFilter: userFilter.mention }, { reference: false });
        });
    };

};