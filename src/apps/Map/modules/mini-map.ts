import { Application, Container } from 'pixi.js';

import mobile from 'src/modules/mobile';

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
    root.appendChild(miniMap.view);
}

export const enableMiniMap = (miniMapContainer: Container): void => {
    miniMap.stage.interactive = true;
    miniMap.view.style.visibility = 'visible';
    // stretch the container to the entire canvas
    miniMapContainer.width = originSize.width;
    miniMapContainer.height = originSize.height;
};

export default miniMap;
