import { Application, Container, FederatedPointerEvent, Rectangle } from 'pixi.js';

import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';
import mobile from 'src/modules/mobile';

import { isCanvasTarget } from 'map/modules/listeners';

let miniMap: Application<HTMLCanvasElement>;
const root = document.querySelector('#mini-map') as HTMLElement;
export const originSize: { width: number; height: number } = { width: 0, height: 0 };

if (!mobile()) {
    originSize.width = root.offsetWidth;
    originSize.height = root.offsetHeight;
    miniMap = new Application({
        background: '#1F2327',
        width: originSize.width,
        height: originSize.height,
        resolution: 1,
        useContextAlpha: true,
        antialias: false,
    });
    miniMap.stage.hitArea = new Rectangle(0, 0, miniMap.renderer.width, miniMap.renderer.height);
    root.appendChild(miniMap.view);
}

export const enableMiniMapAndAddListeners = (miniMapContainer: Container): void => {
    miniMap.view.style.visibility = 'visible';
    // stretch the container to the entire canvas
    miniMapContainer.width = originSize.width;
    miniMapContainer.height = originSize.height;

    miniMap.stage.interactive = true;
    miniMap.stage.on('pointerdown', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        dispatchCustomEvent(MapEvent.ClickOnMimiMap, { detail: { event } });
    });
};

export default miniMap;
