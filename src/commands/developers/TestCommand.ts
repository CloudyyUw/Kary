import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

export default class TestCommand extends Command {

    public name = "Test";
    public category = "Developers";
    public aliases = [];
    public botPermission = [];
    public userPermission = [];
    public onlyDevelopers = true;

    public run(context: CommandContext) {};

};