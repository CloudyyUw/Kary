import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import NekoClient from "nekos.life";

const nekos = new NekoClient();

export default class CatCommand extends Command {

    public name = "feed";
    public category = "fun";
    public aliases = ["eat"];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;
    
    public minArgument = 1;
    public description = {
        "en-US": "Feeds a user.",
        "pt-BR": "Alimenta um usuário."
    };
    public examples = ["@Rafael", "818929343743918181"];

    public async run(context: CommandContext) {
        const user = await context.getUser(context.args[0]);
        if ( !user ) return context.replyT("Error", "commands:invalidMention");

        const nekoImage = await nekos.sfw.feed();
        const embed = new EmbedBuilder();
        embed.setColor("FUN");
        embed.setDescription(`🍔 **${context.locale("commands:feed", { user: context.message.author.mention, userMentioned: user.mention })}**`);
        embed.setImage(nekoImage.url);
        context.send(embed.build());
    };

};