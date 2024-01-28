import { FederatedEvent, IPointData } from 'pixi.js';

import debounce from 'src/modules/debounce';
import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app from 'map/modules/app';
import { APP_SELECTOR, RESOLUTION } from 'map/modules/constants';

export const isCanvasTarget = (event: FederatedEvent): boolean => {
    const target = event.nativeEvent.target as HTMLElement;
    return target.tagName === 'CANVAS';
};

const listeners: (vertical: boolean) => void = (vertical: boolean) => {
    // should fire event
    app.stage.interactive = true;

    // borders
    const LEFT_SCROLL_BORDER = 0;
    const TOP_SCROLL_BORDER = 0;
    let RIGHT_SCROLL_BORDER: number = (app.stage.width - app.view.width) * -1;
    let BOTTOM_SCROLL_BORDER: number = (app.stage.height - app.view.height) * -1;
    let prevPoint: IPointData | undefined;

    // callbacks
    const onMove = (event: PointerEvent) => {
        if (prevPoint) {
            let positionX = app.stage.x + event.x - prevPoint.x;
            if (positionX > LEFT_SCROLL_BORDER) {
                positionX = LEFT_SCROLL_BORDER;
            }
            if (positionX < RIGHT_SCROLL_BORDER) {
                positionX = RIGHT_SCROLL_BORDER;
            }
            app.stage.x = positionX;
            if (vertical) {
                let positionY = app.stage.y + event.y - prevPoint.y;
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
                    deltaX: event.x - prevPoint.x,
                    deltaY: event.y - prevPoint.y,
                },
            };
            dispatchCustomEvent(MapEvent.CommonScroll, eventData);
        }
        prevPoint = { x: event.x, y: event.y };
        app.view.style.cursor = vertical ? 'move' : 'ew-resize';
    };

    const onUpOrLeave: () => void = () => {
        prevPoint = undefined;
        app.view.style.cursor = 'auto';
        app.view.removeEventListener('pointermove', onMove);
    };

    // scroll listeners
    app.view.addEventListener('pointerdown', () => {
        app.view.addEventListener('pointermove', onMove);
    });
    app.view.addEventListener('pointerup', onUpOrLeave);
    app.view.addEventListener('pointerleave', onUpOrLeave);

    // recalc border on resize or scale
    const onResize = debounce(() => {
        RIGHT_SCROLL_BORDER = (app.stage.width - app.view.width) * -1;
        BOTTOM_SCROLL_BORDER = (app.stage.height - app.view.height) * -1;
    }, 200);
    window.addEventListener('resize', onResize);

    // disable scroll events on canvas
    document.querySelector(APP_SELECTOR).addEventListener(
        'wheel',
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        },
        { passive: false }
    );

    // some container fix
    app.view.style.width = `${window.innerWidth}px`;
    app.view.style.height = `${window.innerHeight}px`;

    // resize
    window.addEventListener(
        'resize',
        debounce(() => {
            app.renderer.resize(window.innerWidth * RESOLUTION, window.innerHeight * RESOLUTION);
            app.view.style.width = `${window.innerWidth}px`;
            app.view.style.height = `${window.innerHeight}px`;
            dispatchCustomEvent(MapEvent.MapResize);
        }, 100)
    );
};

export default listeners;
