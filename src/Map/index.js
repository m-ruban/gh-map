import * as PIXI from 'pixi.js';

import app from 'map/modules/app';
import fonts from 'map/modules/fonts';
import listeners from 'map/modules/listeners';

import MainChart from 'map/components/MainChart';
import Timeline from 'map/components/Timeline';

// init app after fonts
fonts.then(() => {
    app.stage.addChild(MainChart());
    app.stage.addChild(Timeline());
    listeners();
});

// pixi debug
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
