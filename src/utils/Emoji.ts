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

        wumpus: "<:DiscordWumpus:828664720021127208>",
        wumpus_police: "<:Wumpus_Police:828642397860134966>",
        wumpus_plus: "<:Wumpus_Plus:828648289166819389>",
        
        blob_shocked: "<:BlobShocked:826048817106255935>",
        blob_cookie: "<:BlobCookie:826048784902914068>",

        zero_two: "<:ZeroTwoUwu:842738925944832000>",
        sorry_sir: "<:Sorry:842739015727054862>",
        soldier_sir: "<:SoldierAnime:842738275759161374>",
        cat_drinking: "<:DrinkingCat:842739670080946196>",
        drinking: "<:Drinking:842739213627424789>",
        detective: "<:Detetive:842739516333621248>",
        sleep: "<:Sleep:842739354379485235>",
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