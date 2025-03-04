import { Graphics } from 'pixi.js';

import { subscribeCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app from 'map/modules/app';
import { RATIO } from 'map/modules/mini-constants';
import miniMap, { originSize } from 'map/modules/mini-map';

interface SelectionProps {
    mapWidth: number;
}

const WIDTH_BORDER = 2;
const LINE_STYLE = { color: 0x404a53, width: WIDTH_BORDER };

const Selection = ({ mapWidth }: SelectionProps): Graphics => {
    // const selectionContainer = new Container();
    const mapStageWidth = app.stage.width;
    const mapViewWidth = app.view.width;
    const ratioViewStage = mapViewWidth / mapStageWidth;
    // ширина selection = ширине вью относительно stage в map
    const selectionWidth = miniMap.view.width * ratioViewStage;
    // учтитываем, что миникарта вписана в контейнер
    const ratioOriginView = originSize.width / mapWidth;
    const border = miniMap.view.width - selectionWidth;

    const selection = new Graphics();
    selection.lineStyle(LINE_STYLE);
    // selection.beginFill(0x404a53);
    selection.drawPolygon([
        { x: WIDTH_BORDER / 2, y: WIDTH_BORDER / 2 },
        { x: selectionWidth - WIDTH_BORDER / 2, y: WIDTH_BORDER / 2 },
        { x: selectionWidth - WIDTH_BORDER / 2, y: miniMap.view.height - WIDTH_BORDER / 2 },
        { x: WIDTH_BORDER / 2, y: miniMap.view.height - WIDTH_BORDER / 2 },
    ]);
    selection.endFill();
    selection.cacheAsBitmap = true;

    subscribeCustomEvent(MapEvent.CommonScroll, () => {
        // учитываем пропорции, в которых нарисована карта (RATIO)
        // утитываем ширину, на которую карта растянута/сжата (ratioOriginView)
        const newX = -app.stage.x * RATIO * ratioOriginView;
        if (newX > border) {
            return;
        }
        selection.x = newX;
    });

    return selection;
};

export default Selection;
