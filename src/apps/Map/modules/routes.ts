import { Container } from 'pixi.js';

import { setGenre } from 'src/models/genre';
import { setGenres } from 'src/models/genres';
import { setHistory } from 'src/models/history';
import store from 'src/models/store';

import GenreDetail from 'map/pages/GenreDetail';
import GenreList from 'map/pages/GenreList';

interface RouteComponentResult {
    RouteComponent: () => Container;
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
export const getRouteComponent: () => RouteComponentResult = () => {
    if (GENRE_REGEX.exec(window.location.pathname)) {
        const path = window.location.pathname.replaceAll('/', '');
        return {
            RouteComponent: GenreDetail,
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
        vertical: true,
        urls: [`${apiRoot()}/api/v1/map/`],
        setData: ([page]) => {
            // set data to store
            const { categories: genres, history } = page.data;
            store.dispatch(setGenres(genres));
            store.dispatch(setHistory(history));
        },
    };
};
