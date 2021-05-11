import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import minecraft from "minecraft-user";

export default class McAvatarCommand extends Command {

    public name = "mcAvatar";
    public category = "minecraft";
    public aliases = ["minecraftAvatar"];
    public botPermission = [];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "test ixgles",
        "pt-BR": "test portuxues"
    }
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