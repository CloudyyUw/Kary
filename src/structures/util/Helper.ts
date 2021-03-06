import Command from "../command/Command";
import CommandContext from "../command/CommandContext";

import Emoji from "../../utils/Emoji";
import EmbedBuilder from "./EmbedBuilder";

export default class Helper {

    public static help(context: CommandContext, command: Command, f?: any) {
        if ( f ) {
            const missingPermissions = f(context.message, context.client.user.id, ["embedLinks"], true);
            if ( missingPermissions.length > 0 ) return context.replyT("Error", "basic:help.error");  
        };

        const embed = new EmbedBuilder();
        embed.setColor("UTIL");
        embed.setTitle(`${Emoji.get("Wumpus").mention} ${context.locale("basic:help.embedTitle", { commandName: command.name })}`);
        embed.setDescription(command.description[context.database.user.language]);
        if ( command?.examples != null || false ) {
            embed.addField(`⛸ ${context.locale("basic:help.fieldExampleTitle")}`, `${command.examples.map(v => `${context.database.guild.prefix}${command.name}${v == null || false ? "" : ` ${v}` }`).join("\n")}`);
        };

        embed.addField(`👮‍♀️ ${context.locale("basic:help.fieldPermissionTitle")}`, 
        `→ ${command?.botPermission.length > 0 ? context.locale("basic:help.fieldPermissionBot", { permissions: command.botPermission.map(v => context.locale(`permissions:${v}`)).join(", ") }) : context.locale("basic:help.fieldPermissionBotNone")}
        → ${command?.userPermission.length > 0 ? context.locale("basic:help.fieldPermissionUser", { permissions: command.userPermission.map(v => context.locale(`permissions:${v}`)).join(", ") }) : context.locale("basic:help.fieldPermissionUserNone") }`);

        embed.addField(`🙉 ${context.locale("basic:help.fieldAliasesTitle")}`, `${command.aliases.length > 0 ? command.aliases.map(v => `\`${v}\``).join(", ") : context.locale("basic:help.fieldAliasesNone")}`);

        context.send(embed.build());
    };

};