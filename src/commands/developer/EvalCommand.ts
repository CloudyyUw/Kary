import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import util from "util";

export default class EvalCommand extends Command {

    public name = "eval";
    public category = "developer";
    public aliases = [];
    public botPermission = [];
    public userPermission = [];
    public onlyDevelopers = true;

    public minArgument = 1;
    public description = {
        "en-US": "Do anything in my code that my developer asks for.",
        "pt-BR": "Executa no meu código alguma coisa que meu desenvolvedor pedir."
    };
    public examples = ["console.log(\"Hello world!\")", "return 1"];

    public async run(context: CommandContext) {
        try {
            let evaled = await eval(context.args[0]);
            evaled = util.inspect(evaled, { depth: 1 });
            evaled = evaled.replace(new RegExp(context.client.user.id, "g"), "");

            if ( evaled.length > 1800 ) evaled = `${evaled.slice(0, 1797)}...`;
            evaled = `\`\`\`js\n ${evaled}\`\`\``;

            context.send(evaled);  
        } catch (err) {
            err = `\`\`\`js\n ${err}\`\`\``;
            context.send(err);
        };
    };

};