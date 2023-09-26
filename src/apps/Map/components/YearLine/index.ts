import { Graphics } from 'pixi.js';

import { subscribeCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_TIMELINE, WIDTH_YEAR } from 'map/modules/constants';

interface YearProps {
    position: number;
}

const LINE_STYLE = { color: 0x404a53, width: WIDTH_TIMELINE };

const YearLine: (props: YearProps) => Graphics = ({ position }) => {
    const yearLine = new Graphics();
    const x = position * WIDTH_YEAR + WIDTH_TIMELINE;
    yearLine
        .lineStyle(LINE_STYLE)
        .moveTo(x, 0)
        .lineTo(x, app.view.height - HEIGHT_YEAR);

    subscribeCustomEvent(MapEvent.Resolution, () => {
        yearLine
            .clear()
            .lineStyle(LINE_STYLE)
            .moveTo(x, 0)
            .lineTo(x, app.view.height - HEIGHT_YEAR);
    });

    return yearLine;
};

export default YearLine;
