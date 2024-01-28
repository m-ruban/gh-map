import { Container } from 'pixi.js';

import store from 'src/models/store';

import GenreListView from 'map/components/GenreListView';

import DummyGenre from 'map/pages/GenreList/DummyGenre';

const GenreList: () => Container = () => {
    const listContainer = new Container();
    const { genres } = store.getState();
    genres.forEach((genre, position) => {
        listContainer.addChild(GenreListView({ genre, position }));
    });

    // dummy genre for scroll correction
    listContainer.addChild(DummyGenre({ length: genres.length }));

    return listContainer;
};

export default GenreList;
