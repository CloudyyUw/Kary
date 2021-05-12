import Client from "../Client";
import Emoji from "../../utils/Emoji";

import { User } from "eris";

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
            content: `${Emoji.get(e)?.mention ? Emoji.get(e).mention : e} **|** ${this.message.author.mention} ${content}`,
            messageReferenceID: this.message.id,
            options,
            file,
        });
    };

    public async replyT(e: string, key: string, data?: any, options?, file?) {
        return await this.message.channel.createMessage({
            content: `${Emoji.get(e)?.mention != null ? Emoji.get(e).mention : e} **|** ${this.message.author.mention} ${this.locale(key, data)}`,
            messageReferenceID: this.message.id,
            options,
            file,
        });
    };

    public async getUser(userId: string, hasAuthor: boolean = false) {
        if ( !userId || userId == null ) {
            if ( hasAuthor == true ) return this.message.author;
            else return false;
        };

        try {
            const user = await this.client.getRESTUser(userId.replace(/[<@!>]/g, ""));
            return user;
        } catch {
            if ( hasAuthor == true ) return this.message.author;
            else return false;
        };

    };

};