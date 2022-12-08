import { Graphics } from 'pixi.js';

import { WIDTH_YEAR } from 'map/modules/constants';

import { GENRE_HEIGHT, GENRE_TOP_PADDING } from 'map/components/Genre/constants';

interface PartTimelineProps {
    start: number;
    position: number;
}

const PartTimeline: (props: PartTimelineProps) => Graphics = ({ start, position }) => {
    const partTimeline = new Graphics();
    partTimeline.x = start + position * WIDTH_YEAR;
    partTimeline.y = GENRE_TOP_PADDING;
    partTimeline.beginFill(0x2f3539);
    partTimeline.drawRect(0, 0, WIDTH_YEAR, GENRE_HEIGHT);
    partTimeline.endFill();
    return partTimeline;
};

export default PartTimeline;
