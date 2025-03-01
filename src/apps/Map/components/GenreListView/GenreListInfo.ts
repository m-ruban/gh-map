import { Container, FederatedPointerEvent, Sprite, Text } from 'pixi.js';

import { subscribeCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import { alphaAnimation } from 'map/modules/animations';
import app from 'map/modules/app';
import { GENRE_HEIGHT, GENRE_TOP_PADDING, WIDTH_YEAR } from 'map/modules/constants';
import { isCanvasTarget } from 'map/modules/listeners';

interface GenreListInfoProps {
    genreIcon: Sprite;
    genreTitle: Text;
    start: number;
    end: number;
    code: string;
    positionY: number;
}

const GenreListInfo: (props: GenreListInfoProps) => Container = ({
    genreIcon,
    genreTitle,
    start,
    end,
    code,
    positionY,
}) => {
    const topPaddingBefore = positionY * (GENRE_HEIGHT + GENRE_TOP_PADDING);
    const leftPaddingBefore = start * WIDTH_YEAR;
    const genreInfo = new Container();
    genreInfo.addChild(genreIcon);
    genreInfo.addChild(genreTitle);
    genreInfo.x = leftPaddingBefore + (WIDTH_YEAR - genreInfo.width) / 2;
    genreInfo.y = GENRE_TOP_PADDING + (GENRE_HEIGHT - genreInfo.height) / 2 + topPaddingBefore;

    // move title and icon
    const genreWrapperWidth = (end - start + 1) * WIDTH_YEAR;
    const rightBorder = start * WIDTH_YEAR + genreWrapperWidth;
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

    // genre info hover and click
    alphaAnimation(genreInfo);
    genreInfo.on('click', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        window.location.href = `/${code}/`;
    });

    return genreInfo;
};

export default GenreListInfo;
