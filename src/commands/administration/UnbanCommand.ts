import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

export default class UnbanCommand extends Command {

    public name = "unban";
    public category = "administration";
    public aliases = [];
    public botPermission = ["banMembers"];
    public userPermission = ["banMembers"];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "Unban a user who has been banned from the server.",
        "pt-BR": "Desbane um usuário que foi banido do servidor."
    };
    public examples = ["@Rafael", "818929343743918181"];

    public async run(context: CommandContext) {
        const guildBans = await context.message.channel.guild.getBans();
        const userBanned = guildBans.find(ban => ban.user.id == context.args[0].replace(/[<@!>]/g, ""))?.user;

        if ( !userBanned ) return context.replyT("Error", "commands:unban.noBanned");
        
        await context.message.channel.guild.unbanMember(userBanned.id, "¯\_(ツ)_/¯");
        context.replyT("Success", "commands:unban.success");
    };

};