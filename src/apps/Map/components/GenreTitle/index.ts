import { Sprite, Text, TextStyle } from 'pixi.js';

import { GENRE_OFFSET, GENRE_WIDTH } from 'map/modules/constants';
import { FontFamily } from 'map/modules/fonts';

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

interface GenreTitleProps {
    title: string;
    genreIcon: Sprite;
}

// vertical alignment between title/icon
export const alignmentIconAndTitle: (genreIcon: Sprite, genreTitle: Text) => void = (genreIcon, genreTitle) => {
    if (genreTitle.height > genreIcon.height) {
        genreIcon.y = (genreTitle.height - genreIcon.height) / 2;
    } else {
        genreTitle.y = (genreIcon.height - genreTitle.height) / 2;
    }
};

const GenreTitle: (props: GenreTitleProps) => Text = ({ title, genreIcon }) => {
    // title
    const genreTitle = new Text(title, titleStyle);
    genreTitle.x = genreIcon.x + TEXT_LEFT_PADDING + genreIcon.width;
    return genreTitle;
};

export default GenreTitle;
