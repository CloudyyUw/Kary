import Command from "../../structures/command/Command";
import CommandContext from "../../structures/command/CommandContext";

import Client from "../../structures/Client";
import EmbedBuilder from "../../structures/util/EmbedBuilder";
import Helper from "../../structures/util/Helper";

export default class HelpCommand extends Command {

    private filterByCategory(categoryName: string, client: Client) {
        const category = {
            ary: client.commandRegistry.modules.filter(m => m.category.toLowerCase() == categoryName.toLowerCase()).map(v => v.name),
            name: categoryName,
        };
        return category;
    };

    public name = "help";
    public category = "util";
    public aliases = ["commands"];
    public botPermission = ["embedLinks"];
    public userPermission = [];
    public onlyDevelopers = false;

    public minArgument = 0;
    public description = {
        "en-US": "Show all my commands, or show information about a command.",
        "pt-BR": "Mostra todos os meus comandos, ou mostra uma informação de um comando."
    };
    public examples = [null, "mcAvatar"];

    public run(context: CommandContext) {
        const command = context?.args[0] ? context.client.commandRegistry.findByName(context.args[0]) : false;

        if ( command ) {
            return Helper.help(context, command);
        };

        const categoryOrder = [
            this.filterByCategory("Minecraft", context.client),
            this.filterByCategory("Util", context.client)
        ];

        categoryOrder.sort((a, b) => {
            if ( a.ary.length > b.ary.length ) return -1;
            if ( a.ary.length < b.ary.length ) return 1;
        });
        
        const embed = new EmbedBuilder();
        embed.setColor("UTIL");
        
        for ( const category of categoryOrder ) {
            embed.addField(`${context.locale(`commands:help.field${category.name}Title`)} (${category.ary.length})`, category.ary.map(v => `\`${v}\``).join(", "));
        };

        context.send(embed.build());
    };

};