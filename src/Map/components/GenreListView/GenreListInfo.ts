import { Container, Graphics, Sprite, Text } from 'pixi.js';

import app from 'map/modules/app';
import { SIDEBAR_WIDTH, WIDTH_YEAR } from 'map/modules/constants';
import CustomGameEvent from 'map/modules/CustomGameEvent';
import { subscribeCustomEvent } from 'map/modules/events';

interface GenreListInfoProps {
    genreWrapper: Graphics;
    genreIcon: Sprite;
    genreTitle: Text;
    start: number;
}

const GenreListInfo: (props: GenreListInfoProps) => Container = ({ genreWrapper, genreIcon, genreTitle, start }) => {
    const genreInfo = new Container();
    genreInfo.addChild(genreIcon);
    genreInfo.addChild(genreTitle);
    genreInfo.x = start * WIDTH_YEAR + (WIDTH_YEAR - genreInfo.width) / 2;
    genreInfo.y = genreWrapper.y + (genreWrapper.height - genreInfo.height) / 2;

    const rightBorder = genreWrapper.x + genreWrapper.width;
    const leftBorder = genreInfo.x;
    subscribeCustomEvent(CustomGameEvent.CommonScroll, (event) => {
        if (event.detail.deltaX < 0) {
            // right move
            // need remember about sidebar
            if (Math.abs(app.stage.x - SIDEBAR_WIDTH) > genreInfo.x) {
                const newX = SIDEBAR_WIDTH - app.stage.x;
                // right border
                if (rightBorder < newX + genreInfo.width) {
                    return;
                }
                genreInfo.x = newX;
            }
            return;
        } else {
            // left move
            const offset = genreInfo.x - Math.abs(app.stage.x - SIDEBAR_WIDTH);
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
