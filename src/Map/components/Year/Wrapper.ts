import { Graphics } from 'pixi.js';

import { HEIGHT_YEAR, WIDTH_BORDER, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';

interface WrapperProps {
    x: number;
}

const Wrapper: (props: WrapperProps) => Graphics = ({ x }) => {
    const wrapper = new Graphics();

    wrapper.x = x;
    wrapper.y = 0;
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
