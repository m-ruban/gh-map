import { Container, Graphics } from 'pixi.js';

import { GENRE_HEIGHT, GENRE_TOP_PADDING, WIDTH_TIMELINE, WIDTH_YEAR } from 'map/modules/constants';
import { culling } from 'map/modules/culling';

interface GenreListWrapperProps {
    start: number;
    end: number;
    positionY: number;
}

const GenreListWrapper: (props: GenreListWrapperProps) => Container = ({ start, end, positionY }) => {
    const genreListItemWrapper = new Container();
    const genreListItems: Container[] = [];
    const genreListItemPositionY = GENRE_TOP_PADDING + positionY * (GENRE_HEIGHT + GENRE_TOP_PADDING);
    for (let position = 1; position <= end - start + 1; position++) {
        const genreListItem = new Graphics();
        genreListItem.x = (start + position - 1) * WIDTH_YEAR;
        genreListItem.y = genreListItemPositionY;
        genreListItem.beginFill(0x2f3539);
        genreListItem.drawRect(0, 0, WIDTH_YEAR + WIDTH_TIMELINE, GENRE_HEIGHT);
        genreListItem.endFill();
        genreListItemWrapper.addChild(genreListItem);
        genreListItems.push(genreListItem);
    }

    culling(genreListItems);

    return genreListItemWrapper;
};

export default GenreListWrapper;
