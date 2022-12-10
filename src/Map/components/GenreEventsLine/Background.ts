import { Container, Graphics } from 'pixi.js';

import { PADDING_WRAPPER } from 'map/components/GenreEvent/constants';

interface BackgroundProps {
    height: number;
    scrollableContainer: Container;
}

const Background: (props: BackgroundProps) => Graphics = ({ height, scrollableContainer }) => {
    // for not-jumping scrolling use mask
    const background = new Graphics();
    background.x = PADDING_WRAPPER;
    background.beginFill(0x1f2327);
    background.drawPolygon([
        { x: 0, y: 0 },
        { x: scrollableContainer.width, y: 0 },
        { x: scrollableContainer.width, y: height },
        { x: 0, y: height },
    ]);
    background.endFill();
    return background;
};

export default Background;
