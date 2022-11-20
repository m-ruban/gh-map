import { Container, DisplayObject, Graphics } from 'pixi.js';

import app from 'map/modules/app';
import { COUNT_YEARS, HEIGHT_YEAR, WIDTH_BORDER, WIDTH_YEAR } from 'map/modules/constants';

const MainChart: () => DisplayObject = () => {
    const map = new Graphics();
    map.beginFill(0x1f2327);
    map.drawPolygon([
        { x: 0, y: 0 },
        { x: WIDTH_YEAR * COUNT_YEARS, y: 0 },
        { x: WIDTH_YEAR * COUNT_YEARS, y: app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) },
        { x: 0, y: app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) },
    ]);
    map.endFill();

    const container = new Container();
    container.addChild(map);
    return container;
};

export default MainChart;
