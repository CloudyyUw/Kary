import EventEmitter from "events";

import { readdirSync, lstatSync } from "fs";
import { resolve } from "path";

export default class Registry {

    constructor () {
        this.modules = [];
        this.events = new EventEmitter(); 
    };

    public modules: any[];
    public events: EventEmitter;

    public add(module: any): boolean {
        if ( this.has(module?.name) ) return false;
        this.modules.push(module);
        this.events.emit("added", (module));
        return true;
    };

    public remove(name: string): boolean {
        if ( !this.has(name) ) return false;
        delete this.modules[this.get(name)];
        this.events.emit("removed", (name));
        return true;
    };

    public get(name: string): any {
        return this.findByProperty("name", name);
    };

    public has(name: string): boolean {
        if ( !this.findByProperty("name", name) ) return false;
        else return true;
    };

    public loadPath(path: string, ...args): void {
        let files = [];
        path = resolve(__dirname, "../../..", path);

        readdirSync(resolve(path)).map(d => {
            if ( lstatSync(resolve(path, d)).isFile() ) {
                files.push(require(resolve(path, d)));
            } else {
                readdirSync(resolve(path)).map(n => {
                    files.push(require(resolve(path, d, n)));
                });
            };
        });

        files.map(Module => {
            const module = new Module.default(...args);
            this.add(module);
        });
    };

    private findByProperty(property: string, value: any): any {
        return this.modules.filter(module => module[property] == value)[0];
    };

};