import { Graphics } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_YEAR } from 'map/modules/constants';
import CustomGameEvent from 'map/modules/CustomGameEvent';
import { subscribeCustomEvent } from 'map/modules/events';

interface YearProps {
    position: number;
    test?: boolean;
}

const WIDTH_BORDER = 2;
const LINE_STYLE = { color: 0x404a53, width: WIDTH_BORDER };

const YearLine: (props: YearProps) => Graphics = ({ position }) => {
    const yearLine = new Graphics();
    const x = position * WIDTH_YEAR + WIDTH_BORDER;
    yearLine
        .lineStyle(LINE_STYLE)
        .moveTo(x, 0)
        .lineTo(x, app.view.height - HEIGHT_YEAR);

    subscribeCustomEvent(CustomGameEvent.Resolution, () => {
        yearLine
            .clear()
            .lineStyle(LINE_STYLE)
            .moveTo(x, 0)
            .lineTo(x, app.view.height - HEIGHT_YEAR);
    });

    return yearLine;
};

export default YearLine;
