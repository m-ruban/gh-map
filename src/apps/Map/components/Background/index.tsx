import { Graphics } from 'pixi.js';

import app from 'map/modules/app';
import { COUNT_YEARS, HEIGHT_YEAR, WIDTH_BORDER, WIDTH_YEAR } from 'map/modules/constants';
import CustomGameEvent from 'map/modules/CustomGameEvent';
import { subscribeCustomEvent } from 'map/modules/events';

const Background: () => Graphics = () => {
    const ground = new Graphics();
    const coordinates = () => [
        { x: 0, y: 0 },
        { x: WIDTH_YEAR * COUNT_YEARS, y: 0 },
        { x: WIDTH_YEAR * COUNT_YEARS, y: app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) },
        { x: 0, y: app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) },
    ];
    ground.beginFill(0x1f2327).drawPolygon(coordinates()).endFill();

    subscribeCustomEvent(CustomGameEvent.CommonScroll, (event) => {
        const { vertical } = event.detail;
        if (!vertical) {
            return;
        }
        ground.y = app.stage.y * -1;
    });
    subscribeCustomEvent(CustomGameEvent.Resolution, () => {
        ground.clear().beginFill(0x1f2327).drawPolygon(coordinates()).endFill();
    });

    return ground;
};

export default Background;
