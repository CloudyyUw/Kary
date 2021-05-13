import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

export default class BanCommand extends Command {

    public name = "ban";
    public category = "administration";
    public aliases = [];
    public botPermission = ["banMembers"];
    public userPermission = ["banMembers"];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "Ban the mentioned user for 7 days from the server that executed the command.",
        "pt-BR": "Bane o usuário mencionado por 7 dias do servidor que foi executado o comando."
    };
    public examples = ["@Rafael", "818929343743918181 I'm Gorgeous"];

    public async run(context: CommandContext) {
        const user = await context.getUser(context.args[0]);
        if ( !user ) return context.replyT("Error", "commands:invalidMention");

        const guildMember = context.message.channel.guild.members.get(user.id);
        if ( guildMember ) {
            if ( user.id == context.message.author.id ) return context.replyT("Error", "commands:ban.selfBan");
            if ( user.id == context.message.channel.guild.ownerID ) return context.replyT("Error", "commands:ban.ownerBan");
        };

        const banReason = !context?.args[1] ? context.locale("commands:ban.noReason") : context.args.slice(1);

        try {
            await context.client.banGuildMember(context.message.guildID, user.id, 7, banReason);
            context.replyT("Success", "commands:ban.success");  
        } catch (err) {
            context.replyT("Error", "commands:ban.error");
        };
    };

};