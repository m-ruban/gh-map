import { Application } from 'pixi.js';

import { RESOLUTION } from 'map/modules/constants';

// app
const app = new Application({
    background: '#1F2327',
    width: window.innerWidth * RESOLUTION,
    height: window.innerHeight * RESOLUTION,
    resolution: 1,
    antialias: true,
    useContextAlpha: false,
    hello: true,
});
const map = document.querySelector('#map');
map.appendChild(app.view);

// lol
const canvas = map.querySelector('canvas');
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;

export default app;
