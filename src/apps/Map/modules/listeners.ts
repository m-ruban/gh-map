import { FederatedEvent, IPointData } from 'pixi.js';

import debounce from 'src/modules/debounce';
import Direction from 'src/modules/Direction';
import { dispatchCustomEvent } from 'src/modules/events';
import { subscribeCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app, { originSize } from 'map/modules/app';
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

    // scroll map by external event
    const moveByArrow = (event: { detail: { direction: Direction } }) => {
        const distance = event.detail.direction === Direction.Left ? app.view.width : app.view.width * -1;
        let positionX = app.stage.x + distance;
        if (positionX > LEFT_SCROLL_BORDER) {
            positionX = LEFT_SCROLL_BORDER;
        }
        if (positionX < RIGHT_SCROLL_BORDER) {
            positionX = RIGHT_SCROLL_BORDER;
        }
        app.stage.x = positionX;
        const eventData = {
            detail: {
                vertical: false,
                deltaX: distance,
                deltaY: 0,
            },
        };
        dispatchCustomEvent(MapEvent.CommonScroll, eventData);
    };
    subscribeCustomEvent(MapEvent.MoveMapByArrow, moveByArrow);

    // disable scroll events on canvas
    const root = document.querySelector(APP_SELECTOR) as HTMLElement;
    root.addEventListener(
        'wheel',
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        },
        { passive: false }
    );

    // рисуем канвас размером size * RESOLUTION, в прямоугольнире размером size
    app.view.style.width = `${originSize.width}px`;
    app.view.style.height = `${originSize.height}px`;
    app.view.style.display = 'block';

    // на ресайзе надо пересчитать размеры и заэмить событие по карте
    window.addEventListener(
        'resize',
        debounce(() => {
            const root = document.querySelector(APP_SELECTOR) as HTMLElement;
            originSize.width = root.offsetWidth;
            originSize.height = root.offsetHeight;
            app.renderer.resize(originSize.width * RESOLUTION, originSize.height * RESOLUTION);
            app.view.style.width = `${originSize.width}px`;
            app.view.style.height = `${originSize.height}px`;
            dispatchCustomEvent(MapEvent.MapResize);
        }, 100)
    );
};

export default listeners;
