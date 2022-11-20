import { Container, TextStyle } from 'pixi.js';

import app from 'map/modules/app';
import { COUNT_YEARS } from 'map/modules/constants';
import fontPromise, { FONT_MONTSERRAT_FAMILY } from 'map/modules/fonts';

import Year from 'map/components/Year';

// years
const yearsContainer = new Container();
fontPromise.then(() => {
    const textStyle = new TextStyle({
        fontFamily: FONT_MONTSERRAT_FAMILY,
        fontSize: 96,
        fill: [0xffffff],
    });
    // year list
    for (let i = 0; i < COUNT_YEARS; i++) {
        const year = Year({ position: i, textStyle });
        yearsContainer.addChild(year);
    }
});
app.stage.addChild(yearsContainer);
