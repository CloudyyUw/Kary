import Listener from "../structures/listener/Listener";
import Client from "../structures/Client";
import Logger from "../structures/util/Logger";

export default class ReadyListener extends Listener {

    public name: string = "ready";
    public run(client: Client) {
        Logger.text(`Success in connecting with Discord.`);
    };

};