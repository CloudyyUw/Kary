import { Client as ErisClient } from "eris";
import { ClientOptions } from "eris";

import CommandRegistry from "./command/CommandRegistry";
import ListenerRegistry from "./listener/ListenerRegistry";

export default class Client extends ErisClient {

    constructor (token: string, options?: ClientOptions) {
        super(token, options);

        this.listenerRegistry = new ListenerRegistry(this);
    };

    public commandRegistry: CommandRegistry;
    public listenerRegistry: ListenerRegistry;

    public async start() {
        await super.connect();
        this.commandRegistry.loadPath("./src/commands");
        this.listenerRegistry.loadPath("./src/listeners");
    };

};