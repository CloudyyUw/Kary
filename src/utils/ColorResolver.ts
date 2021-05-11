export default class ColorResolver {

    private static colors = {};

    public static resolve(color: string): boolean | number {
        if ( !this.colors[color.toUpperCase()] ) return false;
        return parseInt(this.colors[color.toUpperCase()].replace("#", ""), 16);
    };

};