import { setCategories } from 'src/models/categories';
import { setHistory } from 'src/models/history';
import store from 'src/models/store';

import GenreDetail from 'map/pages/GenreDetail';
import GenreList from 'map/pages/GenreList';

const apiUrl = 'http://dev.gamespirit.org';

// add route by event
const GENRE_REGEX = /^\/([a-zA-Z0-9\-\_]*)\/$/;
export const getRouteComponent = () => {
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
            const { categories, history } = page.data;
            store.dispatch(setCategories(categories));
            store.dispatch(setHistory(history));
        },
    };
};
