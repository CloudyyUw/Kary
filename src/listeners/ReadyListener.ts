import Listener from "../structures/listener/Listener";
import Client from "../structures/Client";
import Logger from "../structures/util/Logger";

export default class ReadyListener extends Listener {

    public name: string = "ready";
    public run(client: Client) {
        const clientOwner = client.users.get("818929343743918181");
        Logger.text(`Success in connecting with Discord.`);
        client.editStatus("online", { name: `Thanks ${clientOwner.username}#${clientOwner.discriminator}, for making me exist`, type: 3 });
    };

};