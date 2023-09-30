import { Container } from 'pixi.js';

import Background from 'map/components/Background';
import Genre from 'map/components/Genre';

const GenreDetail: () => Container = () => {
    const chartContainer = new Container();
    // background
    chartContainer.addChild(Background());
    // render genre
    chartContainer.addChild(Genre());
    return chartContainer;
};

export default GenreDetail;
