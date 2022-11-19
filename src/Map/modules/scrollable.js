import app from 'map/modules/app';
import { COUNT_YEARS, WIDTH_YEAR } from 'map/modules/constants';

app.stage.interactive = true;

const LEFT_SCROLL_BORDER = 0;
const RIGHT_SCROLL_BORDER = (WIDTH_YEAR * COUNT_YEARS - app.view.width) * -1;
let prev;
const onMove = (event) => {
    if (prev) {
        let position = app.stage.x + event.data.global.x - prev;
        if (position > LEFT_SCROLL_BORDER) {
            position = LEFT_SCROLL_BORDER;
        }
        if (position < RIGHT_SCROLL_BORDER) {
            position = RIGHT_SCROLL_BORDER;
        }
        app.stage.x = position;
    }
    prev = event.data.global.x;
};

const onUpOrLeave = () => {
    prev = undefined;
    app.stage.off('pointermove', onMove);
};

app.stage.on('pointerdown', () => {
    app.stage.on('pointermove', onMove);
});
app.stage.on('pointerup', onUpOrLeave);
app.stage.on('pointerleave', onUpOrLeave);
