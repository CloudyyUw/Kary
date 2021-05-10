import Listener from "../structures/listener/Listener";
import Logger from "../structures/util/Logger";

export default class ReadyListener extends Listener {

    public name: string = "ready";
    public run(client) {
        Logger.text(`Success in connecting with Discord.`);
    };

};