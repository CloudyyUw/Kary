import Client from "../Client";

import Command from "./Command";
import Registry from "../registry/Registry";

export default class CommandRegistry extends Registry {

    constructor (client: Client) {
        super();

        this.client = client;
    };

    private client: Client;

    public findByName(name: string) {
        return this.modules.filter(m => m.name.toLowerCase() == name.toLowerCase())[0] ||
        this.modules.filter(m => m.aliases.map(str => str.toLowerCase()).includes(name.toLowerCase()))[0];
    };

};