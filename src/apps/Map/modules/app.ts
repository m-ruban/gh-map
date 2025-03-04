import { Application } from 'pixi.js';

import mobile from 'src/modules/mobile';

import { APP_SELECTOR, RESOLUTION } from 'map/modules/constants';

let app: Application<HTMLCanvasElement>;
export const originSize: { width: number; height: number } = { width: 0, height: 0 };

if (!mobile()) {
    const root = document.querySelector(APP_SELECTOR) as HTMLElement;
    originSize.width = root.offsetWidth;
    originSize.height = root.offsetHeight;
    app = new Application({
        background: '#1F2327',
        width: root.offsetWidth * RESOLUTION,
        height: root.offsetHeight * RESOLUTION,
        resolution: 1,
        useContextAlpha: true,
        antialias: false,
    });
    root.appendChild(app.view);
}

export default app;
