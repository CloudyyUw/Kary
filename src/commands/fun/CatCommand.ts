import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import NekoClient from "nekos.life";

const nekos = new NekoClient();

export default class CatCommand extends Command {

    public name = "cat";
    public category = "fun";
    public aliases = [];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 0;
    public description = {
        "en-US": "Shows your future cat.",
        "pt-BR": "Mostra o seu futuro gatinho."
    };
    public examples = [null, "Julie"];

    public async run(context: CommandContext) {
        const nekoImage = await nekos.sfw.meow();
        const embed = new EmbedBuilder();
        embed.setColor("FUN");
        embed.setDescription(`😺 **${context.locale("commands:cat", { user: context.args[0] !== null ? context.args[0] : context.message.author.username })}**`);
        embed.setImage(nekoImage.url);
        context.send(embed.build());
    };

};