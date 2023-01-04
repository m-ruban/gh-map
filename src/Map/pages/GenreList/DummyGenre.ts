import { Container, Graphics } from 'pixi.js';

import { GENRE_HEIGHT, GENRE_TOP_PADDING, WIDTH_TIMELINE, WIDTH_YEAR } from 'map/modules/constants';

const DummyGenre: (props: { length: number }) => Container = ({ length }) => {
    const dummyGenreContainer = new Container();

    const dummyGenre = new Graphics();
    dummyGenre.x = WIDTH_YEAR;
    dummyGenre.y = GENRE_TOP_PADDING + length * (GENRE_HEIGHT + GENRE_TOP_PADDING);
    dummyGenre.beginFill(0x1f2327);
    dummyGenre.drawRect(0, 0, WIDTH_YEAR + WIDTH_TIMELINE, GENRE_HEIGHT);
    dummyGenre.endFill();

    dummyGenreContainer.addChild(dummyGenre);

    return dummyGenreContainer;
};

export default DummyGenre;
