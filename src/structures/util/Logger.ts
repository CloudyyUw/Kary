import chalk from "chalk";

export default class Logger {

    static text(message: string) {
        console.log(`${chalk.redBright(">")} ${chalk.whiteBright(message)}`);
    };

};