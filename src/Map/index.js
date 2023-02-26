import * as PIXI from 'pixi.js';

import mobile from 'root/mobile';

import app from 'map/modules/app';
import fonts from 'map/modules/fonts';
import listeners from 'map/modules/listeners';

import Timeline from 'map/components/Timeline';

import GenreDetail from 'map/pages/GenreDetail';
import GenreList from 'map/pages/GenreList';

// add route by event
const GENRE_REGEX = /^\/([a-zA-Z0-9\-\_]*)\/$/;
const getComponentRoute = () => {
    if (GENRE_REGEX.exec(window.location.pathname)) {
        return GenreDetail;
    }
    return GenreList;
};

// init app after fonts
fonts.then(() => {
    if (mobile()) {
        return;
    }
    const RouteComponent = getComponentRoute();
    app.stage.addChild(RouteComponent());
    app.stage.addChild(Timeline());
    listeners(RouteComponent === GenreList);
});

// pixi debug
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
