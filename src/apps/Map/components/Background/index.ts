import { Graphics } from 'pixi.js';

import store from 'src/models/store';
import { subscribeCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_BORDER, WIDTH_YEAR } from 'map/modules/constants';

const Background: () => Graphics = () => {
    const ground = new Graphics();
    const { history } = store.getState();
    const coordinates = () => [
        { x: 0, y: 0 },
        { x: WIDTH_YEAR * history.length, y: 0 },
        { x: WIDTH_YEAR * history.length, y: app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) },
        { x: 0, y: app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) },
    ];
    ground.beginFill(0x1f2327).drawPolygon(coordinates()).endFill();

    subscribeCustomEvent(MapEvent.CommonScroll, (event) => {
        const { vertical } = event.detail;
        if (!vertical) {
            return;
        }
        ground.y = app.stage.y * -1;
    });
    subscribeCustomEvent(MapEvent.Resolution, () => {
        ground.clear().beginFill(0x1f2327).drawPolygon(coordinates()).endFill();
    });

    return ground;
};

export default Background;
