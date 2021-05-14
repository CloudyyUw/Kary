import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

export default class KickCommand extends Command {

    public name = "kick";
    public category = "administration";
    public aliases = [];
    public botPermission = ["kickMembers"];
    public userPermission = ["kickMembers"];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "Kicks off the mentioned user.",
        "pt-BR": "Expulsa o usuário mencionado."
    };
    public examples = ["@Rafael", "818929343743918181 I'm Gorgeous"];

    public async run(context: CommandContext) {
        const user = await context.getUser(context.args[0]);
        if ( !user ) return context.replyT("Error", "commands:invalidMention");

        if ( user.id == context.message.author.id ) return context.replyT("Error", "commands:kick.selfKick");
        if ( user.id == context.message.channel.guild.ownerID ) return context.replyT("Error", "commands:kick.ownerKick");

        const guildMember = context.message.channel.guild.members.get(user.id);
        if ( !guildMember ) return context.replyT("Error", "commands:kick.invalidMember");

        const kickReason = !context?.args[1] ? context.locale("commands:kick.noReason") : context.args.slice(1);

        await context.client.kickGuildMember(context.message.guildID, user.id, kickReason);
        context.replyT("Success", "commands:kick.success");
    };

};