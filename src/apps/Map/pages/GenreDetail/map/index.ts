import { Container } from 'pixi.js';

import store from 'src/models/store';

import MiniEventsList from 'map/components/MiniEventsList';
import MiniGenreItem from 'map/components/MiniGenreItem';
import MiniYears from 'map/components/MiniYears';

const GenreDetailMiniMap: () => Container = () => {
    const genreListMiniMap = new Container();
    const { history, genre } = store.getState(); // genres

    // year line
    genreListMiniMap.addChild(MiniYears({ len: history.length - 1 }));

    // genre data
    const { start, startKey, endKey, category_timeline_items_by_years: timelineItems } = genre;
    genreListMiniMap.addChild(MiniGenreItem({ startKey, endKey, position: 0 }));

    // render events lust
    for (let position = startKey; position < endKey + 1; position++) {
        const timelineItem = timelineItems[start + position - startKey];
        if (!timelineItem) {
            continue;
        }
        const { category_events: events } = timelineItem;
        if (events.length > 0) {
            genreListMiniMap.addChild(MiniEventsList({ events, position }));
        }
    }

    return genreListMiniMap;
};

export default GenreDetailMiniMap;
