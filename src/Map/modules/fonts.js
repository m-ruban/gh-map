import { Assets } from 'pixi.js';

const FONT_BUNDLE = 'fonts';
export const FONT_MONTSERRAT_FAMILY = 'Montserrat, sans-serif';

Assets.addBundle(FONT_BUNDLE, {
    Montserrat: 'montserrat.woff',
    OpenSans: 'OpenSans.woff',
});

const fontPromise = Assets.loadBundle(FONT_BUNDLE);

export default fontPromise;
