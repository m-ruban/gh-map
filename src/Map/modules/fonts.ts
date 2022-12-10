import { Assets } from 'pixi.js';

const FONT_BUNDLE = 'fonts';

export enum FontFamily {
    Montserrat = 'Montserrat, sans-serif',
    OpenSans = 'OpenSans, sans-serif',
}

Assets.addBundle(FONT_BUNDLE, {
    Montserrat: 'montserrat.woff',
    OpenSans: 'OpenSans.woff',
});

const fonts = Assets.loadBundle(FONT_BUNDLE);

export default fonts;
