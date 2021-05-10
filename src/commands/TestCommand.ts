import Command from "../structures/command/Command";
import CommandContext from "../structures/command/CommandContext";

export default class TestCommand extends Command {

    public name = "test";
    public aliases = ["testar"];

    public run(content: CommandContext) {
        content.replyT("success", "permissions:banMembers");
    };

};