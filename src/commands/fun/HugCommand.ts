import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import NekoClient from "nekos.life";

const nekos = new NekoClient();

export default class HugCommand extends Command {

    public name = "hug";
    public category = "fun";
    public aliases = [];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "Hugged a poor, needy person.",
        "pt-BR": "Abraça uma pobre pessoa carente."
    };
    public examples = ["@Rafael", "818929343743918181"];

    public async run(context: CommandContext) {
        const user = await context.getUser(context.args[0]);
        if ( !user ) return context.replyT("Error", "commands:invalidMention");

        const nekoImage = await nekos.sfw.hug();
        const embed = new EmbedBuilder();
        embed.setColor("FUN");
        embed.setDescription(`👨‍🏭 **${context.locale("commands:hug", { user: context.message.author.mention, userMentioned: user.mention })}**`);
        embed.setImage(nekoImage.url);
        context.send(embed.build());
    };

};