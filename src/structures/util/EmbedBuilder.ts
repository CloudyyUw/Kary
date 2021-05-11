import ColorResolver from "../../utils/ColorResolver";

interface embedField {
    name: string;
    value: string;
    inline?: boolean;
};

export default class EmbedBuilder {

    constructor () {
        this.fields = [];
        this.author = undefined;
        this.description = undefined;
        this.color = undefined;
        this.file = undefined;
        this.footer = undefined;
        this.image = undefined;
        this.timestamp = undefined;
        this.title = undefined;
        this.thumbnail = undefined;
        this.url = undefined;
    };

    private fields: any[];
    private author: any;
    private description: any;
    private color: any;
    private file: any;
    private footer: any;
    private image: any;
    private timestamp: any;
    private title: any;
    private thumbnail: any;
    private url: any;

    public addField(name: string, value: string, inline?: boolean) {
        this.fields.push({
            name: name.toString().substring(0, 256),
            value: value.toString().substring(0, 1024),
            inline: !inline ? false : inline,
        });
        return this;
    };

    public addFields(...args: embedField[]) {
        args.forEach(field => {
            this.addField(field.name, field.value, field.inline);
        });
        return this;
    };

    public addBlankField(inline?: boolean) {
        this.addField("\u200B", "\u200B", inline);
        return this;
    };

    public setAuthor(name: string, iconUrl: string, url?: string) {
        this.author = {
            name: name,
            icon_url: iconUrl,
            url: url,
        };
        return this;
    };

    public setDescription(description: string) {
        this.description = description.toString().substring(0, 2048);
        return this;
    };

    public setColor(color: string) {
        this.color = ColorResolver.resolve(color);
        return this;
    };

    public setFooter(text: string, iconUrl: string) {
        this.footer = {
            text: text.toString().substring(0, 2048),
            icon_url: iconUrl,
        };
        return this;
    };

    public setImage(image: any, height?: any, width?: any) {
        this.image = { url: image };

        if ( height ) this.image.height = height;
        if ( width ) this.image.width = width;

        return this;
    };

    public setTimestamp(timestamp?: Date) {
        this.timestamp = !timestamp ? new Date() : timestamp;
        return this;
    };

    public setTitle(title: string) {
        this.title = title;
        return this;
    };

    public setThumbnail(url: string) {
        this.thumbnail = { url };
        return this;
    };

    public setUrl(url: string) {
        this.url = url;
        return this;
    };

    public build(content?: any) {
        return { content, embed: {
            fields: this.fields,
            author: this.author,
            description: this.description,
            color: this.color,
            file: this.file,
            footer: this.footer,
            image: this.image,
            timestamp: this.timestamp,
            title: this.title,
            thumbnail: this.thumbnail,
            url: this.url,
        } };
    };

};