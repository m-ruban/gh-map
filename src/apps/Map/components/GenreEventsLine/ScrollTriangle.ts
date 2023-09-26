import { Container, Graphics, IPointData } from 'pixi.js';

import { subscribeCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

export enum Position {
    Top = 'top',
    Bottom = 'bottom',
}

interface ScrollTriangleProps {
    parent: Graphics;
    position: Position;
}

const TRIANGLE_HEIGHT = 15;
const TRIANGLE_MARGIN = 10;

const getTrianglePoints: (direction: Position, width: number) => IPointData[] = (position, width) => {
    if (position === Position.Bottom) {
        return [
            { x: 0, y: 0 },
            { x: width / 2, y: 0 },
            { x: width / 4, y: TRIANGLE_HEIGHT },
        ];
    }
    return [
        { x: 0, y: TRIANGLE_HEIGHT },
        { x: width / 4, y: 0 },
        { x: width / 2, y: TRIANGLE_HEIGHT },
    ];
};

const ScrollTriangle: (props: ScrollTriangleProps) => Container = ({ parent, position }) => {
    const scrollTriangle = new Graphics();
    scrollTriangle.x = parent.x + (parent.width - parent.width / 2) / 2;
    scrollTriangle.y =
        position === Position.Bottom
            ? parent.y + parent.height + TRIANGLE_MARGIN
            : parent.y - TRIANGLE_HEIGHT - TRIANGLE_MARGIN;
    scrollTriangle.beginFill(0x2f3539);
    scrollTriangle.drawPolygon(getTrianglePoints(position, parent.width));
    scrollTriangle.endFill();
    scrollTriangle.visible = false;

    if (position === Position.Bottom) {
        subscribeCustomEvent(MapEvent.Resolution, () => {
            scrollTriangle.y = parent.y + parent.height + TRIANGLE_MARGIN;
        });
    }

    return scrollTriangle;
};

export default ScrollTriangle;
