export default class ColorResolver {

    private static colors = {
        MANAGEMENT: "#69FB98",
        MINECRAFT: "#8FEC8F"
    };

    public static resolve(color: string): boolean | number {
        if ( !this.colors[color.toUpperCase()] ) return false;
        return parseInt(this.colors[color.toUpperCase()].replace("#", ""), 16);
    };

};