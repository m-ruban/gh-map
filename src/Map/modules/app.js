import { Application } from 'pixi.js';

import mobile from 'root/mobile';

import { APP_SELECTOR, RESOLUTION } from 'map/modules/constants';

let app;

if (!mobile()) {
    // app
    app = new Application({
        background: '#1F2327',
        width: window.innerWidth * RESOLUTION,
        height: window.innerHeight * RESOLUTION,
        resolution: 1,
        antialias: true,
        useContextAlpha: false,
        hello: true,
    });
    document.querySelector(APP_SELECTOR).appendChild(app.view);
}

export default app;
