import { Container, Graphics } from 'pixi.js';

import { HEIGHT_YEAR, WIDTH_YEAR } from 'map/modules/mini-constants';

interface GenreItemProps {
    startKey: number;
    endKey: number;
    position: number;
}

const GenreItem = ({ startKey, endKey, position }: GenreItemProps): Container => {
    const genreItem = new Graphics();
    genreItem.beginFill(0x2f3539);
    genreItem.x = startKey * WIDTH_YEAR;
    genreItem.y = position * HEIGHT_YEAR + HEIGHT_YEAR;
    genreItem.drawPolygon([
        { x: 0, y: 0 },
        { x: WIDTH_YEAR * (endKey - startKey + 1), y: 0 },
        { x: WIDTH_YEAR * (endKey - startKey + 1), y: HEIGHT_YEAR },
        { x: 0, y: HEIGHT_YEAR },
    ]);
    genreItem.endFill();
    genreItem.cacheAsBitmap = true;
    return genreItem;
};

export default GenreItem;
