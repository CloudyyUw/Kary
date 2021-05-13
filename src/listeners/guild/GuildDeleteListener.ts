import Listener from "../../structures/listener/Listener";
import Client from "../../structures/Client";

import database from "quick.db";

export default class GuildDeleteListener extends Listener {

    public name = "guildDelete";
    public run(client: Client, guild: any) {
        database.delete(`guildData.${guild.id}`);
    };

};