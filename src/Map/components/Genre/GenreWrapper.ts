import { Graphics } from 'pixi.js';

import { GENRE_HEIGHT, GENRE_OFFSET, GENRE_WIDTH, WIDTH_YEAR } from 'map/modules/constants';

const GENRE_MARGIN = (WIDTH_YEAR - GENRE_WIDTH) / 2;
const GENRE_CORNER = 56;

interface GenreWrapperProps {
    start: number;
}

const GenreWrapper: (props: GenreWrapperProps) => Graphics = ({ start }) => {
    // hexagon
    const genrePolygon = new Graphics();
    genrePolygon.x = start + GENRE_MARGIN;
    genrePolygon.y = 0;
    genrePolygon.beginFill(0x404a53);
    genrePolygon.drawPolygon([
        { x: GENRE_OFFSET, y: GENRE_CORNER + GENRE_OFFSET },
        { x: GENRE_WIDTH / 2, y: 0 },
        { x: GENRE_WIDTH - GENRE_OFFSET, y: GENRE_CORNER + GENRE_OFFSET },
        { x: GENRE_WIDTH - GENRE_OFFSET, y: GENRE_HEIGHT + GENRE_CORNER - GENRE_OFFSET },
        { x: GENRE_WIDTH / 2, y: GENRE_HEIGHT + GENRE_CORNER * 2 },
        { x: GENRE_OFFSET, y: GENRE_HEIGHT + GENRE_CORNER - GENRE_OFFSET },
    ]);
    genrePolygon.endFill();
    return genrePolygon;
};

export default GenreWrapper;
