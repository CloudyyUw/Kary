import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import NekoClient from "nekos.life";

const nekos = new NekoClient();

export default class DogCommand extends Command {

    public name = "dog";
    public category = "fun";
    public aliases = [];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 0;
    public description = {
        "en-US": "Shows your future dog.",
        "pt-BR": "Mostra o seu futuro cachorrinho."
    };
    public examples = [null, "Rafael"];

    public async run(context: CommandContext) {
        const nekoImage = await nekos.sfw.woof();
        const embed = new EmbedBuilder();
        embed.setColor("FUN");
        embed.setTitle(`🐶 ${context.locale("commands:dog.embedTitle", { user: context.args[0] != null ? context.args[0] : context.message.author.username })}`);
        embed.setImage(nekoImage.url);
        context.send(embed.build());
    };

};