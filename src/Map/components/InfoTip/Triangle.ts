import { Graphics, IPointData, Text } from 'pixi.js';

import { CORNER_INDENT, CORNER_WIDTH, PADDING } from 'map/components/InfoTip/constants';
import InfoTipPosition from 'map/components/InfoTip/InfoTipPosition';

interface TriangleProps {
    infoTipText: Text;
    position: InfoTipPosition;
}

const getYOffset: (tipTextHeight: number, position: InfoTipPosition) => number = (tipTextHeight, position) => {
    if (position === InfoTipPosition.Bottom) {
        return (PADDING + CORNER_INDENT) * -1;
    }
    return tipTextHeight + PADDING;
};

const getTrianglePoints: (position: InfoTipPosition) => IPointData[] = (position) => {
    if (position === InfoTipPosition.Bottom) {
        return [
            { x: 0, y: CORNER_INDENT },
            { x: CORNER_WIDTH / 2, y: 0 },
            { x: CORNER_WIDTH, y: CORNER_INDENT },
        ];
    }
    return [
        { x: 0, y: 0 },
        { x: CORNER_WIDTH, y: 0 },
        { x: CORNER_WIDTH / 2, y: CORNER_INDENT },
    ];
};

const Triangle: (props: TriangleProps) => Graphics = ({ infoTipText, position }) => {
    const triangle = new Graphics();
    triangle.x = infoTipText.x + infoTipText.width / 2 - CORNER_WIDTH / 2;
    triangle.y = infoTipText.y + getYOffset(infoTipText.height, position);
    triangle.beginFill(0x383f47);
    triangle.drawPolygon(getTrianglePoints(position));
    triangle.endFill();
    return triangle;
};

export default Triangle;
