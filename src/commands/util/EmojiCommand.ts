import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import axios from "axios";

export default class EmojiCommand extends Command {

    public name = "emoji";
    public category = "util";
    public aliases = [];
    public botPermission = ["attachFiles"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 1;
    public description = {
        "en-US": "It shows an emoji in a bigger way that was mentioned by the user.",
        "pt-BR": "Mostra um emoji de forma maior que foi mencionado pelo usuário."
    };
    public examples = ["<:BlobCookie:826048784902914068>", "blob_cookie"];

    public async run(context: CommandContext) {
        const emoji = await context.getEmoji(context.args[0]);
        if ( !emoji ) return context.replyT("Error", "commands:emoji.invalid");
        
        const emojiBuffer = await axios.get(emoji.url, { responseType: "arraybuffer" }).then(result => result.data);
        context.send("", {}, { name: `${emoji.name}.${emoji.animated ? "gif" : "png"}`, file: emojiBuffer });
    };

};