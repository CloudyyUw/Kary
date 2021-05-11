import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import EmbedBuilder from "../../structures/util/EmbedBuilder";
import minecraft from "minecraft-user";

export default class McHeadCommand extends Command {

    public name = "mcHead";
    public category = "minecraft";
    public aliases = ["minecraftHead"];
    public botPermission = [];
    public userPermission = [];
    public onlyDevelopers = false;

    public async run(context: CommandContext) {
        const minecraftPlayer = !context.args[0] ? false : await minecraft.getUser(context.args[0]);
        if ( !minecraftPlayer ) return context.replyT("Error", "commands:minecraft.invalidPlayer");

        const embed = new EmbedBuilder();
        embed.setColor("MINECRAFT");
        embed.setImage(minecraftPlayer.head);
        context.send(embed.build());
    };

};