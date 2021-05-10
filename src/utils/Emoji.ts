interface emojiInterface {
    name: string;
    id: string;
    animated: boolean;
    mention: string;
    reaction: string;
    url: string;
};

export default class Emoji {

    private static emojis = {
        success: "<:Success:841431409271898132>",
        error: "<:Error:831127155425148949>",
    };

    public static get(name: string): emojiInterface {
        if ( !this.emojis[name.toLowerCase()] ) return;
        const emoji = this.emojis[name.toLowerCase()].match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);

        return {
            name: emoji[2],
            id: emoji[3],
            animated: Boolean(emoji[1]),
            mention: `${emoji[1] ? "<a:" : "<:"}${emoji[2]}:${emoji[3]}>`,
            reaction: `${emoji[2]}:${emoji[3]}`,
            url: `https://cdn.discordapp.com/emojis/${emoji[3]}.${emoji[1] ? "gif" : "png"}?v=1`,
        };
    };

};