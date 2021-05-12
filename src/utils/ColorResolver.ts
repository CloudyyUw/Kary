export default class ColorResolver {

    private static colors = {
        MANAGEMENT: "#69FB98",
        MINECRAFT: "#8FEC8F",
        UTIL: "#71A3F6"
    };

    public static resolve(color: string): boolean | number {
        if ( !this.colors[color.toUpperCase()] ) return parseInt(color.replace("#", ""), 16);
        return parseInt(this.colors[color.toUpperCase()].replace("#", ""), 16);
    };

};