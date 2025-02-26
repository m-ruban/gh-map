import { Container, FederatedPointerEvent, Graphics, Sprite, Text } from 'pixi.js';

import { subscribeCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app from 'map/modules/app';
import { WIDTH_YEAR } from 'map/modules/constants';
import { isCanvasTarget } from 'map/modules/listeners';

interface GenreListInfoProps {
    genreWrapper: Graphics;
    genreIcon: Sprite;
    genreTitle: Text;
    start: number;
    code: string;
}

const GenreListInfo: (props: GenreListInfoProps) => Container = ({
    genreWrapper,
    genreIcon,
    genreTitle,
    start,
    code,
}) => {
    const genreInfo = new Container();
    genreInfo.addChild(genreIcon);
    genreInfo.addChild(genreTitle);
    genreInfo.x = start * WIDTH_YEAR + (WIDTH_YEAR - genreInfo.width) / 2;
    genreInfo.y = genreWrapper.y + (genreWrapper.height - genreInfo.height) / 2;

    // genre info hover and click
    genreInfo.interactive = true;
    genreInfo.cursor = 'pointer';
    genreInfo.on('pointerenter', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        genreInfo.alpha = 0.7;
    });
    genreInfo.on('click', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        window.location.href = `/${code}/`;
    });
    genreInfo.on('pointerleave', () => {
        genreInfo.alpha = 1;
    });

    // move title and icon
    const rightBorder = genreWrapper.x + genreWrapper.width;
    const leftBorder = genreInfo.x;
    subscribeCustomEvent(MapEvent.CommonScroll, (event) => {
        if (event.detail.deltaX < 0) {
            // right move
            if (Math.abs(app.stage.x) > genreInfo.x) {
                const newX = -1 * app.stage.x;
                // right border
                if (rightBorder < newX + genreInfo.width) {
                    return;
                }
                genreInfo.x = newX;
            }
            return;
        } else {
            // left move
            const offset = genreInfo.x - Math.abs(app.stage.x);
            const newX = genreInfo.x - offset;
            // left border check
            if (leftBorder > newX) {
                genreInfo.x = leftBorder;
                return;
            }
            if (newX + genreInfo.width > genreInfo.x + genreInfo.width) {
                return;
            }
            genreInfo.x = newX;
        }
    });

    return genreInfo;
};

export default GenreListInfo;
