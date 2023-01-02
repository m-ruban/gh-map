import { FederatedEvent, FederatedPointerEvent } from 'pixi.js';

import app from 'map/modules/app';
import { APP_SELECTOR, COUNT_YEARS, RESOLUTION, WIDTH_YEAR } from 'map/modules/constants';
import CustomGameEvent from 'map/modules/CustomGameEvent';
import debounce from 'map/modules/debounce';
import { subscribeCustomEvent } from 'map/modules/events';

export const isCanvasTarget = (event: FederatedEvent): boolean => {
    const target = event.nativeEvent.target as HTMLElement;
    return target.tagName === 'CANVAS';
};

const listeners: () => void = () => {
    app.stage.interactive = true;

    // borders
    const LEFT_SCROLL_BORDER = 0;
    let RIGHT_SCROLL_BORDER: number = (WIDTH_YEAR * COUNT_YEARS - app.view.width) * -1;

    // callbacks
    let prev: number | undefined;
    const onMove = (event: FederatedPointerEvent) => {
        if (prev) {
            let position = app.stage.x + event.global.x - prev;
            if (position > LEFT_SCROLL_BORDER) {
                position = LEFT_SCROLL_BORDER;
            }
            if (position < RIGHT_SCROLL_BORDER) {
                position = RIGHT_SCROLL_BORDER;
            }
            app.stage.x = position;
        }
        prev = event.global.x;
    };
    const onUpOrLeave: () => void = () => {
        prev = undefined;
        app.stage.off('pointermove', onMove);
    };

    // scroll listeners
    app.stage.on('pointerdown', () => {
        app.stage.on('pointermove', onMove);
    });
    app.stage.on('pointerup', onUpOrLeave);
    app.stage.on('pointerleave', onUpOrLeave);

    // recalc border
    const onResize = debounce(() => {
        RIGHT_SCROLL_BORDER = (WIDTH_YEAR * COUNT_YEARS - app.view.width) * -1;
    }, 200);
    window.addEventListener('resize', onResize);

    subscribeCustomEvent(CustomGameEvent.Resolution, () => {
        RIGHT_SCROLL_BORDER = (WIDTH_YEAR * COUNT_YEARS - app.view.width) * -1;
    });

    // disable scroll events on canvas
    const map = document.querySelector(APP_SELECTOR);
    // map.appendChild(app.view);
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
    const canvas = document.querySelector(APP_SELECTOR).querySelector('canvas');
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
};

export default listeners;
