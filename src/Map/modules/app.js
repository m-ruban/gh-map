import { Application } from 'pixi.js';

import { RESOLUTION } from 'map/modules/constants';
import debounce from 'map/modules/debounce';

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

// disable scroll events on canvas
map.addEventListener(
    'wheel',
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    },
    { passive: false }
);

// lol
const canvas = map.querySelector('canvas');
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;

// resize
window.addEventListener(
    'resize',
    debounce(() => {
        app.renderer.resize(window.innerWidth * RESOLUTION, window.innerHeight * RESOLUTION);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    }, 100)
);

export default app;
