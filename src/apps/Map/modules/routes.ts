import { Container } from 'pixi.js';

import { setGenres } from 'src/models/genres';
import { setHistory } from 'src/models/history';
import store from 'src/models/store';

import GenreDetail from 'map/pages/GenreDetail';
import GenreList from 'map/pages/GenreList';

const apiUrl = 'http://dev.gamespirit.org';

interface RouteComponentResult {
    RouteComponent: () => Container;
    vertical: boolean;
    urls: string[];
    setData: (response: unknown) => void;
}

// add route by event
const GENRE_REGEX = /^\/([a-zA-Z0-9\-\_]*)\/$/;
export const getRouteComponent: () => RouteComponentResult = () => {
    if (GENRE_REGEX.exec(window.location.pathname)) {
        return {
            RouteComponent: GenreDetail,
            vertical: false,
            urls: [],
            setData: () => null,
        };
    }
    return {
        RouteComponent: GenreList,
        vertical: true,
        urls: [`${apiUrl}/api/v1/map/`],
        setData: ([page]) => {
            // set data to store
            const { categories: genres, history } = page.data;
            store.dispatch(setGenres(genres));
            store.dispatch(setHistory(history));
        },
    };
};
