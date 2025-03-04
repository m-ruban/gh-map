import { Container } from 'pixi.js';

import { setGenre } from 'src/models/genre';
import { setGenres } from 'src/models/genres';
import { setHistory } from 'src/models/history';
import store from 'src/models/store';

import GenreDetail from 'map/pages/GenreDetail';
import GenreDetailMiniMap from 'map/pages/GenreDetail/map';
import GenreList from 'map/pages/GenreList';
import GenreListMiniMap from 'map/pages/GenreList/map';

interface RouteComponentResult {
    RouteComponent: () => Container;
    MiniMapComponent: () => Container;
    vertical: boolean;
    urls: string[];
    setData: (response: unknown) => void;
}

const apiRoot = () => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.TEST_API_ROOT;
    }
    return process.env.API_ROOT;
};

// add route by event
const GENRE_REGEX = /^\/([a-zA-Z0-9\-\_]*)\/$/;
const isGenrePage = () => GENRE_REGEX.exec(window.location.pathname);

export const getRouteComponent: () => RouteComponentResult = () => {
    if (isGenrePage()) {
        const path = window.location.pathname.replaceAll('/', '');
        return {
            RouteComponent: GenreDetail,
            MiniMapComponent: GenreDetailMiniMap,
            vertical: false,
            urls: [`${apiRoot()}/api/v1/map/${path}/`],
            setData: ([page]) => {
                const { category: genre, history } = page.data;
                store.dispatch(setHistory(history));
                store.dispatch(setGenre(genre));
            },
        };
    }
    return {
        RouteComponent: GenreList,
        MiniMapComponent: GenreListMiniMap,
        vertical: true,
        urls: [`${apiRoot()}/api/v1/map/`],
        setData: ([page]) => {
            const { categories: genres, history } = page.data;
            store.dispatch(setGenres(genres));
            store.dispatch(setHistory(history));
        },
    };
};
