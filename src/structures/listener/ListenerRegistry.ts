import Client from "../Client";

import Listener from "./Listener";
import Registry from "../registry/Registry";

export default class ListenerRegistry extends Registry {

    constructor (client: Client) {
        super();

        this.client = client;
        
        this.events.on("added", (module: Listener) => {
            this.client.on(module.name, (...args) => module.run(this.client, ...args));
        });
    };

    private client: Client;

};