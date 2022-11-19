import { Graphics } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_BORDER, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';

const Wrapper = ({ position }) => {
    const wrapper = new Graphics();
    wrapper.x = position * WIDTH_YEAR;
    wrapper.y = app.view.height - HEIGHT_YEAR - WIDTH_BORDER;
    wrapper.lineStyle({ color: 0x404a53, width: WIDTH_BORDER });
    wrapper.beginFill(0x262a2f);
    wrapper.drawPolygon([
        { x: 0, y: 0 },
        { x: WIDTH_YEAR, y: 0 },
        { x: WIDTH_YEAR + YEAR_CORNER, y: HEIGHT_YEAR / 2 },
        { x: WIDTH_YEAR, y: HEIGHT_YEAR },
        { x: 0, y: HEIGHT_YEAR },
        { x: YEAR_CORNER, y: HEIGHT_YEAR / 2 },
    ]);
    wrapper.endFill();
    return wrapper;
};

export default Wrapper;
