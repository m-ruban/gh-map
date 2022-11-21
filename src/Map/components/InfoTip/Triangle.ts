import { Graphics, Text } from 'pixi.js';

import { CORNER_INDENT, CORNER_WIDTH, PADDING } from 'map/components/InfoTip/constants';

interface TriangleProps {
    infoTipText: Text;
}

const Triangle: (props: TriangleProps) => Graphics = ({ infoTipText }) => {
    const triangle = new Graphics();
    triangle.x = infoTipText.x + infoTipText.width / 2 - CORNER_WIDTH / 2;
    triangle.y = infoTipText.y + infoTipText.height + PADDING;
    triangle.beginFill(0x383f47);
    triangle.drawPolygon([
        { x: 0, y: 0 },
        { x: CORNER_WIDTH, y: 0 },
        { x: CORNER_WIDTH / 2, y: CORNER_INDENT },
    ]);
    triangle.endFill();
    return triangle;
};

export default Triangle;
