import { Graphics, Sprite, TextMetrics } from 'pixi.js';

import { PADDING_INFO } from 'map/components/GenreEvent/constants';

interface TitleWrapperProps {
    genreImage: Sprite;
    metrics: TextMetrics;
}

const TitleWrapper: (props: TitleWrapperProps) => Graphics = ({ genreImage, metrics }) => {
    const titleWrapper = new Graphics();
    titleWrapper.x = 0;
    titleWrapper.y = genreImage.y + genreImage.height;
    titleWrapper.beginFill(0x2f3539);
    titleWrapper.drawRect(0, 0, genreImage.width, metrics.height + PADDING_INFO * 2);
    titleWrapper.endFill();
    return titleWrapper;
};

export default TitleWrapper;
