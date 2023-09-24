import { Container } from 'pixi.js';

import Background from 'map/components/Background';
import GenreListView, { GenreListItem } from 'map/components/GenreListView';

import DummyGenre from 'map/pages/GenreList/DummyGenre';

const genreList: GenreListItem[] = [
    {
        id: 1,
        title: 'RPG',
        code: 'rpg',
        icon: '/icons/rpg.svg',
        start: 1,
        end: 5,
    },
    {
        id: 2,
        title: 'Action',
        code: 'action',
        icon: '/icons/action.svg',
        start: 2,
        end: 6,
    },
    {
        id: 3,
        title: 'Adventure game',
        code: 'adventure',
        icon: '/icons/adventure.svg',
        start: 3,
        end: 7,
    },
    {
        id: 4,
        title: 'Stealth',
        code: 'stealth',
        icon: '/icons/stealth.svg',
        start: 4,
        end: 8,
    },
    {
        id: 5,
        title: 'RPG',
        code: 'rpg',
        icon: '/icons/rpg.svg',
        start: 1,
        end: 5,
    },
    {
        id: 6,
        title: 'Adventure',
        code: 'adventure',
        icon: '/icons/adventure.svg',
        start: 3,
        end: 4,
    },
    {
        id: 7,
        title: 'Adventure',
        code: 'adventure',
        icon: '/icons/adventure.svg',
        start: 2,
        end: 7,
    },
];

const GenreList: () => Container = () => {
    const listContainer = new Container();

    listContainer.addChild(Background());

    genreList.forEach((genre, position) => {
        listContainer.addChild(GenreListView({ ...genre, position }));
    });

    // dummy genre for scroll correction
    listContainer.addChild(DummyGenre({ length: genreList.length }));

    return listContainer;
};

export default GenreList;
