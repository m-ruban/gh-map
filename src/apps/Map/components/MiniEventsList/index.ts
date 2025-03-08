import { Container, Graphics } from 'pixi.js';

import { CategoryEvent } from 'src/models/genre';

import { HEIGHT_YEAR, WIDTH_YEAR } from 'map/modules/mini-constants';

interface MiniEventsListProps {
    events: CategoryEvent[];
    position: number;
}

const MiniEventsList: (props: MiniEventsListProps) => Container = ({ events, position }) => {
    const eventsContainer = new Container();
    events.forEach((_, eventPosition) => {
        const eventItem = new Graphics();
        eventItem.beginFill(0x2f3539);
        eventItem.x = position * WIDTH_YEAR;
        eventItem.y = (eventPosition + 1) * HEIGHT_YEAR + HEIGHT_YEAR;
        eventItem.drawPolygon([
            { x: 0, y: 0 },
            { x: WIDTH_YEAR, y: 0 },
            { x: WIDTH_YEAR, y: HEIGHT_YEAR },
            { x: 0, y: HEIGHT_YEAR },
        ]);
        eventItem.endFill();
        eventsContainer.addChild(eventItem);
    });
    eventsContainer.cacheAsBitmap = true;
    return eventsContainer;
};

export default MiniEventsList;
