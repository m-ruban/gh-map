import { Container, TextStyle } from 'pixi.js';

import { COUNT_YEARS } from 'map/modules/constants';
import { FontFamily } from 'map/modules/fonts';

import Year from 'map/components/Year';
import YearLine from 'map/components/YearLine';

const Timeline: () => Container = () => {
    const yearsContainer = new Container();
    const yearLinesContainer = new Container();

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

    const timelineContainer = new Container();
    timelineContainer.addChild(yearLinesContainer);
    timelineContainer.addChild(yearsContainer);

    return timelineContainer;
};

export default Timeline;
