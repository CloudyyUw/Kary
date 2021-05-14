import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";

export default class InviteCommand extends Command {

    public name = "invite";
    public category = "misc";
    public aliases = [];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 0;
    public description = {
        "en-US": "Show my invitation for you to add me on your server.",
        "pt-BR": "Mostra meu convite para você me adicionar em seu servidor."
    };
    public examples = [null];

    public run(context: CommandContext) {
        const embed = new EmbedBuilder();
        embed.setColor("MISC");
        embed.setTitle(context.locale("commands:invite.title"));
        embed.setDescription(context.locale("commands:invite.description", {
            user: context.message.author.mention,
            clientUser: context.client.user.username,
            inviteAdministrator: process.env.INVITE_ADMINISTRATOR,
            inviteRecommended: process.env.INVITE_RECOMMENDED,
        }));
        context.send(embed.build());
    };

};