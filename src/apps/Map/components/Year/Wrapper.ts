import { Graphics } from 'pixi.js';

import { HEIGHT_YEAR, WIDTH_BORDER, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';

interface WrapperProps {
    x: number;
}

const LINE_STYLE = { color: 0x404a53, width: WIDTH_BORDER };

const Wrapper: (props: WrapperProps) => Graphics = ({ x }) => {
    const wrapper = new Graphics();

    wrapper.x = x;
    wrapper.y = 0;
    wrapper.lineStyle(LINE_STYLE);
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
    wrapper.cacheAsBitmap = true;
    return wrapper;
};

export default Wrapper;
