import Client from "../Client";
import Emoji from "../../utils/Emoji";

import axios from "axios";

export default class CommandContext {

    constructor (client: Client, message: any, args: string[], locale: any, database: { user: any, guild: any }) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.locale = locale;
        this.database = database;
    };

    public client: Client;
    public message: any;
    public args: string[];
    public locale: any;
    public database: { user: any, guild: any };

    public async send(content: any, options?: any, file?: any) {
        if ( typeof content == "object" ) {
            return await this.message.channel.createMessage(Object.assign(content, {
                messageReferenceID: this.message.id,
            }, options), file);
        };

        return await this.message.channel.createMessage(Object.assign({ content: content }, {
            messageReferenceID: this.message.id,
        }, options), file);
    };

    public async reply(e: string, content: string, options?, file?) {
        return await this.message.channel.createMessage({
            content: `${Emoji.get(e)?.mention !== null ? Emoji.get(e).mention : e} **|** ${this.message.author.mention} ${content}`,
            messageReferenceID: this.message.id,
            options,
            file,
        });
    };

    public async replyT(e: string, key: string, data?: any, options?, file?) {
        const reference = options?.reference === null ? false : options?.reference;
        const messageOptions = {
            content: `${Emoji.get(e)?.mention !== null ? Emoji.get(e).mention : e} **|** ${this.message.author.mention} ${this.locale(key, data)}`,
            options,
            file,
            messageReferenceID: this.message.id,
        };

        if ( reference == false ) delete messageOptions.messageReferenceID;

        return await this.message.channel.createMessage(messageOptions);
    };

    public async getUser(userId: string, hasAuthor: boolean = false) {
        if ( !userId || userId == null ) {
            if ( hasAuthor == true ) return this.message.author;
            else return false;
        };

        try {
            const user = await this.client.getRESTUser(userId.replace(/[<@!>]/g, ""));
            return user;
        } catch (err) {
            if ( hasAuthor == true ) return this.message.author;
            else return false;
        };
    };

    public async getEmoji(emojiName: string) {
        if ( !emojiName || emojiName == null ) return false;

        if ( !emojiName.includes(":") ) {
            const emoji = this.message.channel.guild.emojis.find(emojis => emojis.name.toLowerCase().includes(emojiName.toLowerCase())) || this.message.channel.guild.emojis.find(emojis => emojis.id == emojiName);
            if ( emoji ) return {
                name: emoji.name,
                id: emoji.id,
                animated: emoji.animated,
                mention: `${emoji.animated ? '<a:' : '<:'}${emoji.name}:${emoji.id}>`,
                reaction: `${emoji.name}:${emoji.id}`,
                url: `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}?v=1`,
            };

            const baseUrl = "https://twemoji.maxcdn.com/2/72x72/";
            try {
                if ( await axios.get(`${baseUrl}/${this.toUnicode(emojiName).join("-")}.png`) ) {
                    return {
                        name: emojiName,
                        id: this.toUnicode(emojiName).join("-").toString(),
                        animated: false,
                        mention: emojiName,
                        reaction: emojiName,
                        url: `${baseUrl}/${this.toUnicode(emojiName).join("-")}.png`
                    };
                };
            } catch(err) {
                return false;
            };
        };

        const emoji = emojiName.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
        if ( !emoji || ( emoji[2] && !emoji[3] ) ) return false;

        return {
            name: emoji[2],
            id: emoji[3],
            animated: Boolean(emoji[1]),
            mention: `${emoji[1] ? "<a:" : "<:"}${emoji[2]}:${emoji[3]}>`,
            reaction: `${emoji[2]}:${emoji[3]}`,
            url: `https://cdn.discordapp.com/emojis/${emoji[3]}.${emoji[1] ? "gif" : "png"}?v=1`,
        };
    };

    private toUnicode(str: string) {
        const texts = [];
        for ( const codePoint of str ) {
          texts.push(codePoint.codePointAt(0).toString(16));
        };
        return texts;
    };

};