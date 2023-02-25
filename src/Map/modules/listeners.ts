import { FederatedEvent, FederatedPointerEvent, IPointData } from 'pixi.js';

import app from 'map/modules/app';
import { APP_SELECTOR, RESOLUTION } from 'map/modules/constants';
import CustomGameEvent from 'map/modules/CustomGameEvent';
import debounce from 'map/modules/debounce';
import { dispatchCustomEvent, subscribeCustomEvent } from 'map/modules/events';

export const isCanvasTarget = (event: FederatedEvent): boolean => {
    const target = event.nativeEvent.target as HTMLElement;
    return target.tagName === 'CANVAS';
};

const listeners: (vertical: boolean) => void = (vertical: boolean) => {
    app.stage.interactive = true;

    // borders
    const LEFT_SCROLL_BORDER = 0;
    const TOP_SCROLL_BORDER = 0;
    let RIGHT_SCROLL_BORDER: number = (app.stage.width - app.view.width) * -1;
    let BOTTOM_SCROLL_BORDER: number = (app.stage.height - app.view.height) * -1;
    let prevPoint: IPointData | undefined;

    // callbacks
    const onMove = (event: FederatedPointerEvent) => {
        const point = event.global;
        if (prevPoint) {
            let positionX = app.stage.x + point.x - prevPoint.x;
            if (positionX > LEFT_SCROLL_BORDER) {
                positionX = LEFT_SCROLL_BORDER;
            }
            if (positionX < RIGHT_SCROLL_BORDER) {
                positionX = RIGHT_SCROLL_BORDER;
            }
            app.stage.x = positionX;
            if (vertical) {
                let positionY = app.stage.y + point.y - prevPoint.y;
                if (positionY > TOP_SCROLL_BORDER) {
                    positionY = TOP_SCROLL_BORDER;
                }
                if (positionY < BOTTOM_SCROLL_BORDER) {
                    positionY = BOTTOM_SCROLL_BORDER;
                }
                app.stage.y = positionY;
            }
            const eventData = {
                detail: {
                    vertical,
                    deltaX: point.x - prevPoint.x,
                    deltaY: point.y - prevPoint.y,
                },
            };
            dispatchCustomEvent(CustomGameEvent.CommonScroll, eventData);
        }
        prevPoint = { x: point.x, y: point.y };
        app.stage.cursor = vertical ? 'move' : 'ew-resize';
    };
    const onUpOrLeave: () => void = () => {
        prevPoint = undefined;
        app.stage.cursor = 'auto';
        app.stage.off('pointermove', onMove);
    };

    // scroll listeners
    app.stage.on('pointerdown', () => {
        app.stage.on('pointermove', onMove);
    });
    app.stage.on('pointerup', onUpOrLeave);
    app.stage.on('pointerleave', onUpOrLeave);

    // recalc border on resize or scale
    const onResize = debounce(() => {
        RIGHT_SCROLL_BORDER = (app.stage.width - app.view.width) * -1;
        BOTTOM_SCROLL_BORDER = (app.stage.height - app.view.height) * -1;
    }, 200);
    window.addEventListener('resize', onResize);

    subscribeCustomEvent(CustomGameEvent.Resolution, () => {
        RIGHT_SCROLL_BORDER = (app.stage.width - app.view.width) * -1;
        BOTTOM_SCROLL_BORDER = (app.stage.height - app.view.height) * -1;
    });

    // disable scroll events on canvas
    const map = document.querySelector(APP_SELECTOR);
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
            dispatchCustomEvent(CustomGameEvent.MapResize);
        }, 100)
    );
};

export default listeners;
