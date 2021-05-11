import Command from "../command/Command";
import CommandContext from "../command/CommandContext";

import Emoji from "../../utils/Emoji";
import EmbedBuilder from "./EmbedBuilder";

export default class Helper {

    public static help(context: CommandContext, command: Command) {
        const embed = new EmbedBuilder();
        embed.setColor("UTIL");
        embed.setTitle(`${Emoji.get("Wumpus").mention} ${context.locale("basic:help.embedTitle", { commandName: command.name })}`);
        embed.setDescription(command.description[context.database.user.language]);
        if ( command?.examples != null || false ) {
            embed.addField(`⛸ ${context.locale("basic:help.fieldExampleTitle")}`, `${command.examples.map(v => `${context.database.guild.prefix}${command.name} ${v}`).join("\n")}`);
        };

        embed.addField(`👮‍♀️ ${context.locale("basic:help.fieldPermissionTitle")}`, 
        `→ ${command?.botPermission.length > 0 ? context.locale("basic:help.fieldPermissionBot", { permissions: command.botPermission.map(v => context.locale(`permissions:${v}`)).join(", ") }) : context.locale("basic:help.fieldPermissionBotNone")}
        → ${command?.userPermission.length > 0 ? context.locale("basic:help.fieldPermissionUser", { permissions: command.userPermission.map(v => context.locale(`permissions:${v}`)).join(", ") }) : context.locale("basic:help.fieldPermissionUserNone") }`);

        embed.addField(`🙉 ${context.locale("basic:help.fieldAliasesTitle")}`, `${command.aliases.map(v => `\`${v}\``).join(", ")}`);

        context.send(embed.build());
    };

};