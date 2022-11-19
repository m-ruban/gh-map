import { Text } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, START_YEAR, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';

const Title = ({ position, textStyle }) => {
    const title = new Text(START_YEAR + position, textStyle);
    title.x = position * WIDTH_YEAR + WIDTH_YEAR / 2 + YEAR_CORNER / 2;
    title.y = app.view.height - HEIGHT_YEAR / 2;
    title.anchor.set(0.5);
    return title;
};

export default Title;
