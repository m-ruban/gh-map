import { Container } from 'pixi.js';

import Genre from 'map/components/Genre';

const GenreDetail: () => Container = () => {
    const chartContainer = new Container();
    chartContainer.addChild(Genre());
    return chartContainer;
};

export default GenreDetail;
