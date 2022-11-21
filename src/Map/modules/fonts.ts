import { Assets } from 'pixi.js';

const FONT_BUNDLE: string = 'fonts';

export enum FontFamily {
    Montserrat = 'Montserrat, sans-serif',
    OpenSans = 'OpenSans, sans-serif',
}

Assets.addBundle(FONT_BUNDLE, {
    Montserrat: 'montserrat.woff',
    OpenSans: 'OpenSans.woff',
});

const fontPromise = Assets.loadBundle(FONT_BUNDLE);

export default fontPromise;
