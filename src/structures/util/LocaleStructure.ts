import i18next from "i18next";
import translationBackend from "i18next-node-fs-backend";

import { readdirSync } from "fs";

export default class LocaleStructure {

    constructor () {
        this.languages = ["en-US"];
        this.ns = ["basic", "permissions"];
    };

    private languages: string[];
    private ns: string[];

    async loadLocale(language) {
        let locale;
        function setFixedT(translate) {
            locale = translate;
        };
        setFixedT(i18next.getFixedT(language));
        return locale;
    };

    async startLocales() {
        i18next.use(translationBackend).init({
            ns: this.ns,
            preload: await readdirSync("./src/locales/"),
            fallbackLng: "en-US",
            backend: {
                loadPath: "./src/locales/{{lng}}/{{ns}}.json",
            },
            interpolation: {
                escapeValue: false,
            },
            returnEmptyString: false,
        });
    };

};