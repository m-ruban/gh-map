import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';
import mobile from 'src/modules/mobile';

import app from 'map/modules/app';
import fetcher from 'map/modules/fetcher';
import fonts from 'map/modules/fonts';
import { enableMapAndAddListeners } from 'map/modules/listeners';
import miniMap, { enableMiniMapAndAddListeners } from 'map/modules/mini-map';
import { getRouteComponent } from 'map/modules/routes';

import Selection from 'map/components/Selection';
import Timeline from 'map/components/Timeline';

// init app after fonts
fonts.then(async () => {
    if (mobile()) {
        return;
    }
    // get route data
    const { RouteComponent, vertical, urls, setData, MiniMapComponent } = getRouteComponent();
    const requests = urls.map((url) => fetcher.get(url));
    // send api requests
    setData(await Promise.all(requests));
    // render canvas app
    app.stage.addChild(RouteComponent());
    app.stage.addChild(Timeline());
    // add listeners for general scene
    enableMapAndAddListeners(vertical);
    dispatchCustomEvent(MapEvent.MapLoaded, { detail: { app } });
    // generate mini map
    const miniMapContainer = MiniMapComponent();
    miniMap.stage.addChild(miniMapContainer);
    miniMap.stage.addChild(Selection({ mapWidth: miniMapContainer.width }));
    enableMiniMapAndAddListeners(miniMapContainer);
});

// pixi debug
globalThis.__PIXI_APP__ = process.env.NODE_ENV === 'development' ? app : null;
