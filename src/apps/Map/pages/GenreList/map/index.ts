import { Container } from 'pixi.js';

import MiniYears from 'src/apps/Map/components/MiniYears';
import store from 'src/models/store';

import GenreItem from 'map/pages/GenreList/map/GenreItem';

const GenreListMiniMap: () => Container = () => {
    const genreListMiniMap = new Container();
    const { history, genres } = store.getState(); // genres

    // year line
    genreListMiniMap.addChild(MiniYears({ len: history.length - 1 }));

    // genre list
    genres.forEach((genre, position) => {
        const { startKey, endKey } = genre;
        genreListMiniMap.addChild(GenreItem({ startKey, endKey, position }));
    });

    return genreListMiniMap;
};

export default GenreListMiniMap;
