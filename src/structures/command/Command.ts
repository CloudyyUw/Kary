export default class Command {

    public name: string;
    public category: string;
    public aliases: string[];
    public userPermission: string[];
    public botPermission: string[];
    public onlyDevelopers: boolean;

    public minArgument: number;
    public description: { "en-US": string, "pt-BR": string };
    public examples: string[];

    public run(...args) {};

};