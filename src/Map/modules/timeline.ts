import { Container, TextStyle } from 'pixi.js';

import app from 'map/modules/app';
import { COUNT_YEARS } from 'map/modules/constants';
import fontPromise, { FontFamily } from 'map/modules/fonts';

import Year from 'map/components/Year';
import YearLine from 'map/components/YearLine';

// years
const yearsContainer = new Container();
const yearLinesContainer = new Container();
fontPromise.then(() => {
    const style = new TextStyle({
        fontFamily: FontFamily.Montserrat,
        fontSize: 64,
        fill: [0xffffff],
    });
    // year list
    for (let i = 0; i < COUNT_YEARS; i++) {
        yearsContainer.addChild(Year({ position: i, style }));
        yearLinesContainer.addChild(YearLine({ position: i }));
    }
});
app.stage.addChild(yearLinesContainer);
app.stage.addChild(yearsContainer);
