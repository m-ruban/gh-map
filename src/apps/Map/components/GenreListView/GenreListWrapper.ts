import { Graphics } from 'pixi.js';

import { GENRE_HEIGHT, GENRE_TOP_PADDING, WIDTH_TIMELINE, WIDTH_YEAR } from 'map/modules/constants';

interface GenreListWrapperProps {
    start: number;
    end: number;
    position: number;
}

const GenreListWrapper: (props: GenreListWrapperProps) => Graphics = ({ start, end, position }) => {
    const genreListItemWrapper = new Graphics();
    genreListItemWrapper.x = start * WIDTH_YEAR;
    genreListItemWrapper.y = GENRE_TOP_PADDING + position * (GENRE_HEIGHT + GENRE_TOP_PADDING);
    genreListItemWrapper.beginFill(0x2f3539);
    genreListItemWrapper.drawRect(0, 0, WIDTH_YEAR * (end - start + 1) + WIDTH_TIMELINE, GENRE_HEIGHT);
    genreListItemWrapper.endFill();
    return genreListItemWrapper;
};

export default GenreListWrapper;
