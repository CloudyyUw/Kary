import Client from "../Client";

export default class CommandContext {

    constructor (client: Client, message: any, args: string[], locale: any) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.locale = locale;
    };

    public client: Client;
    public message: any;
    public args: string[];
    public locale: any;

};