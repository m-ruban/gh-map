import { Container, Graphics } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_BORDER } from 'map/modules/constants';
import { subscribeScreenEvent } from 'map/modules/screen';

import { PADDING_WRAPPER } from 'map/components/GenreEvent/constants';

interface BackgroundProps {
    parentContainer: Container;
    scrollableContainer: Container;
}

const Background: (props: BackgroundProps) => Graphics = ({ parentContainer, scrollableContainer }) => {
    const height = app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) - parentContainer.y - PADDING_WRAPPER;
    const background = new Graphics();
    background.x = PADDING_WRAPPER;
    background
        .beginFill(0x1f2327)
        .drawPolygon([
            { x: 0, y: 0 },
            { x: scrollableContainer.width, y: 0 },
            { x: scrollableContainer.width, y: height },
            { x: 0, y: height },
        ])
        .endFill();

    subscribeScreenEvent(() => {
        const height = app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) - parentContainer.y - PADDING_WRAPPER;
        background
            .clear()
            .beginFill(0x1f2327)
            .drawPolygon([
                { x: 0, y: 0 },
                { x: scrollableContainer.width, y: 0 },
                { x: scrollableContainer.width, y: height },
                { x: 0, y: height },
            ])
            .endFill();
    });

    return background;
};

export default Background;
