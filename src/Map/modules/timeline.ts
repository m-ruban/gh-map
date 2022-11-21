import { Container, TextStyle } from 'pixi.js';

import app from 'map/modules/app';
import { COUNT_YEARS } from 'map/modules/constants';
import fontPromise, { FontFamily } from 'map/modules/fonts';

import Year from 'map/components/Year';

// years
const yearsContainer = new Container();
fontPromise.then(() => {
    const style = new TextStyle({
        fontFamily: FontFamily.Montserrat,
        fontSize: 96,
        fill: [0xffffff],
    });
    // year list
    for (let i = 0; i < COUNT_YEARS; i++) {
        const year = Year({ position: i, style });
        yearsContainer.addChild(year);
    }
});
app.stage.addChild(yearsContainer);
