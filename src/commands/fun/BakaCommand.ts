import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import NekoClient from "nekos.life";

const nekos = new NekoClient();

export default class BakaCommand extends Command {

    public name = "baka";
    public category = "fun";
    public aliases = [];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "He calls the aforementioned person baka.",
        "pt-BR": "Chama a pessoa mencionada de baka."
    };
    public examples = ["@Rafael", "818929343743918181"];

    public async run(context: CommandContext) {
        const user = await context.getUser(context.args[0]);
        if ( !user ) return context.reply("Error", "commands:invalidMention");

        const nekoImage = await nekos.sfw.baka();
        const embed = new EmbedBuilder();
        embed.setColor("FUN");
        embed.setDescription(`😮 ${context.locale("commands:baka", { user: context.message.author.mention, userMentioned: user.mention })}`);
        embed.setImage(nekoImage.url);
        context.send(embed.build());
    };

};