import mobile from 'src/modules/mobile';

import app from 'map/modules/app';
import fetcher from 'map/modules/fetcher';
import fonts from 'map/modules/fonts';
import listeners from 'map/modules/listeners';
import { getRouteComponent } from 'map/modules/routes';

import Timeline from 'map/components/Timeline';

// init app after fonts
fonts.then(async () => {
    if (mobile()) {
        return;
    }
    // get route data
    const { RouteComponent, vertical, urls, setData } = getRouteComponent();
    const requests = urls.map((url) => fetcher.get(url));
    // send api requests
    const responses = await Promise.all(requests);
    // set data to store
    setData(responses);
    // render canvas app
    app.stage.addChild(RouteComponent());
    app.stage.addChild(Timeline());
    listeners(vertical);
});

// pixi debug
globalThis.__PIXI_APP__ = app;
