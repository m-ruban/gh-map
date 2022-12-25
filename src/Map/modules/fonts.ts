import { Assets } from 'pixi.js';

const FONT_BUNDLE = 'fonts';

export enum FontFamily {
    Montserrat = 'Montserrat, sans-serif',
    OpenSans = 'OpenSans, sans-serif',
}

Assets.addBundle(FONT_BUNDLE, {
    Montserrat: './fonts/montserrat.woff',
    OpenSans: './fonts/OpenSans.woff',
});

const fonts = Assets.loadBundle(FONT_BUNDLE);

export default fonts;
