import { Graphics } from 'pixi.js';

import { GENRE_HEIGHT, GENRE_TOP_PADDING, WIDTH_YEAR } from 'map/modules/constants';

interface PartTimelineProps {
    position: number;
}

const PartTimeline: (props: PartTimelineProps) => Graphics = ({ position }) => {
    const partTimeline = new Graphics();
    partTimeline.x = position * WIDTH_YEAR;
    partTimeline.y = GENRE_TOP_PADDING;
    partTimeline.beginFill(0x2f3539);
    partTimeline.drawRect(0, 0, WIDTH_YEAR, GENRE_HEIGHT);
    partTimeline.endFill();
    partTimeline.cacheAsBitmap = true;
    return partTimeline;
};

export default PartTimeline;
