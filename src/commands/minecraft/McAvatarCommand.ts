import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import minecraft from "minecraft-user";

export default class McAvatarCommand extends Command {

    public name = "mcAvatar";
    public category = "minecraft";
    public aliases = ["minecraftAvatar"];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "Shows the avatar of a minecraft player, either by nickname or uuid.",
        "pt-BR": "Mostra o avatar de um player do minecraft, seja por nickname ou por uuid."
    };
    public examples = ["Herobrine", "c5ef3347-4593-4f39-8bb1-2eaa40dd986e"];

    public async run(context: CommandContext) {
        const minecraftPlayer = await minecraft.getUser(context.args[0]);
        if ( !minecraftPlayer ) return context.replyT("Error", "commands:minecraft.invalidPlayer");

        const embed = new EmbedBuilder();
        embed.setColor("MINECRAFT");
        embed.setImage(minecraftPlayer.avatar);
        context.send(embed.build());
    };

};