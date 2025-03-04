import { Container, Graphics } from 'pixi.js';

import { HEIGHT_YEAR, WIDTH_YEAR } from 'map/modules/mini-constants';

interface MiniYearsProps {
    len: number;
}

const MiniYears: (props: MiniYearsProps) => Container = ({ len }) => {
    const miniYears = new Container();

    // year line
    const year = new Graphics();
    year.beginFill(0x2f3539);
    year.drawPolygon([
        { x: 0, y: 0 },
        { x: WIDTH_YEAR * len, y: 0 },
        { x: WIDTH_YEAR * len, y: HEIGHT_YEAR },
        { x: 0, y: HEIGHT_YEAR },
    ]);
    year.endFill();
    year.cacheAsBitmap = true;

    miniYears.addChild(year);
    return miniYears;
};

export default MiniYears;
