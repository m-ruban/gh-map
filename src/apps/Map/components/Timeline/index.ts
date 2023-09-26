import { Container } from 'pixi.js';

import { History } from 'src/models/history';
import store from 'src/models/store';
import { subscribeCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_BORDER } from 'map/modules/constants';

import Year from 'map/components/Year';
import YearLine from 'map/components/YearLine';

const Timeline: () => Container = () => {
    const yearsContainer = new Container();
    const yearLinesContainer = new Container();
    const { history } = store.getState();

    // year list
    history.forEach((historyItem: History, position: number) => {
        yearsContainer.addChild(Year({ position, historyItem }));
        yearLinesContainer.addChild(YearLine({ position: position + 1 }));
    });

    const timelineContainer = new Container();
    timelineContainer.addChild(yearLinesContainer);
    timelineContainer.addChild(yearsContainer);

    // callbacks
    const OnRenderOrUpdate = () => {
        yearsContainer.y = app.stage.y * -1 + app.view.height - HEIGHT_YEAR - WIDTH_BORDER / 2;
        yearLinesContainer.y = app.stage.y * -1;
    };
    subscribeCustomEvent(MapEvent.Resolution, OnRenderOrUpdate);
    subscribeCustomEvent(MapEvent.MapResize, OnRenderOrUpdate);
    subscribeCustomEvent(MapEvent.CommonScroll, (event) => {
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
