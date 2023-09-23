import { Container } from 'pixi.js';

import app from 'map/modules/app';
import { COUNT_YEARS, HEIGHT_YEAR, WIDTH_BORDER } from 'map/modules/constants';
import CustomGameEvent from 'map/modules/CustomGameEvent';
import { subscribeCustomEvent } from 'map/modules/events';

import Year from 'map/components/Year';
import YearLine from 'map/components/YearLine';

const Timeline: () => Container = () => {
    const yearsContainer = new Container();
    const yearLinesContainer = new Container();

    // year list
    for (let i = 0; i < COUNT_YEARS; i++) {
        yearsContainer.addChild(Year({ position: i }));
        yearLinesContainer.addChild(YearLine({ position: i }));
    }

    const timelineContainer = new Container();
    timelineContainer.addChild(yearLinesContainer);
    timelineContainer.addChild(yearsContainer);

    // callbacks
    const OnRenderOrUpdate = () => {
        yearsContainer.y = app.stage.y * -1 + app.view.height - HEIGHT_YEAR - WIDTH_BORDER / 2;
        yearLinesContainer.y = app.stage.y * -1;
    };
    subscribeCustomEvent(CustomGameEvent.Resolution, OnRenderOrUpdate);
    subscribeCustomEvent(CustomGameEvent.MapResize, OnRenderOrUpdate);
    subscribeCustomEvent(CustomGameEvent.CommonScroll, (event) => {
        const { vertical } = event.detail;
        if (!vertical) {
            return;
        }
        OnRenderOrUpdate();
    });

    // init
    OnRenderOrUpdate();

    return timelineContainer;
};

export default Timeline;
