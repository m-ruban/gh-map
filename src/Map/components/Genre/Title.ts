import { FederatedPointerEvent, Sprite, Text, TextStyle } from 'pixi.js';

import CustomGameEvent from 'map/modules/CustomGameEvent';
import { FontFamily } from 'map/modules/fonts';
import { isCanvasTarget } from 'map/modules/listeners';

import { GENRE_OFFSET, GENRE_WIDTH } from 'map/components/Genre/constants';

const TEXT_LEFT_PADDING = 15;
const GENRE_INFO_MARGIN = 20;
const GENRE_INFO_WIDTH = GENRE_WIDTH - GENRE_INFO_MARGIN * 2 - GENRE_OFFSET * 2;

const titleStyle = new TextStyle({
    fontFamily: FontFamily.Montserrat,
    fontSize: 50,
    fill: [0xffffff],
    wordWrapWidth: GENRE_INFO_WIDTH,
    wordWrap: true,
    lineHeight: 45,
});

interface TitleProps {
    id: number;
    title: string;
    genreIcon: Sprite;
}

const Title: (props: TitleProps) => Text = ({ title, genreIcon, id }) => {
    // title
    const genreTitle = new Text(title, titleStyle);
    genreTitle.x = genreIcon.x + TEXT_LEFT_PADDING + genreIcon.width;

    // title interactive
    genreTitle.interactive = true;
    genreTitle.cursor = 'pointer';
    genreTitle.on('pointerenter', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        genreTitle.alpha = 0.7;
    });
    genreTitle.on('click', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        const openGenreEvent = new CustomEvent(CustomGameEvent.GenreOpen, {
            detail: {
                id,
            },
        });
        document.dispatchEvent(openGenreEvent);
    });
    genreTitle.on('pointerleave', () => {
        genreTitle.alpha = 1;
    });
    return genreTitle;
};

export default Title;
