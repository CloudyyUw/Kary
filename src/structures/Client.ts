import { Client as ErisClient } from "eris";
import { ClientOptions } from "eris";

import LocaleStructure from "./util/LocaleStructure";

import CommandRegistry from "./command/CommandRegistry";
import ListenerRegistry from "./listener/ListenerRegistry";

export default class Client extends ErisClient {

    constructor (token: string, options?: ClientOptions) {
        super(token, options);

        this.localeStructure = new LocaleStructure();

        this.commandRegistry = new CommandRegistry(this);
        this.listenerRegistry = new ListenerRegistry(this);
    };

    public localeStructure: LocaleStructure;

    public commandRegistry: CommandRegistry;
    public listenerRegistry: ListenerRegistry;

    public async start() {
        await super.connect();
        await this.localeStructure.startLocales();
        await this.commandRegistry.loadPath("./src/commands");
        await this.listenerRegistry.loadPath("./src/listeners");
    };

};