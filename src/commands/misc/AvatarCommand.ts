import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";

export default class AvatarCommand extends Command {

    public name = "avatar";
    public category = "misc";
    public aliases = [];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 0;
    public description = {
        "en-US": "Shows your avatar or shows another user's avatar.",
        "pt-BR": "Mostra seu avatar ou mostra o avatar de outro usuário."
    };
    public examples = [null, "818929343743918181"];

    public async run(context: CommandContext) {
        const user = await context.getUser(context.args[0], true);
        const embed = new EmbedBuilder();
        embed.setColor("MISC");
        embed.setDescription(`🖼 ${context.locale("commands:avatar.description", { avatarUrl: user.avatarURL })}`);
        embed.setImage(user.avatarURL.replace("?size=128", "?size=2048"));
        context.send(embed.build());
    };

};