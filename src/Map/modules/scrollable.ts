import { FederatedPointerEvent } from 'pixi.js';

import app from 'map/modules/app';
import { COUNT_YEARS, WIDTH_YEAR } from 'map/modules/constants';

app.stage.interactive = true;

const LEFT_SCROLL_BORDER: number = 0;
const RIGHT_SCROLL_BORDER: number = (WIDTH_YEAR * COUNT_YEARS - app.view.width) * -1;
let prev: number | undefined;
const onMove = (event: FederatedPointerEvent) => {
    if (prev) {
        let position = app.stage.x + event.global.x - prev;
        if (position > LEFT_SCROLL_BORDER) {
            position = LEFT_SCROLL_BORDER;
        }
        if (position < RIGHT_SCROLL_BORDER) {
            position = RIGHT_SCROLL_BORDER;
        }
        app.stage.x = position;
    }
    prev = event.global.x;
};

const onUpOrLeave: () => void = () => {
    prev = undefined;
    app.stage.off('pointermove', onMove);
};

app.stage.on('pointerdown', () => {
    app.stage.on('pointermove', onMove);
});
app.stage.on('pointerup', onUpOrLeave);
app.stage.on('pointerleave', onUpOrLeave);
