import { Container } from 'pixi.js';

import Background from 'map/components/Background';
import Genre from 'map/components/Genre';

const START_YEAR_POSITION = 1;
const END_YEAR_POSITION = 7;

const GenreDetail: () => Container = () => {
    const chartContainer = new Container();
    // background
    chartContainer.addChild(Background());
    // render genre
    chartContainer.addChild(Genre({ startYear: START_YEAR_POSITION, endYear: END_YEAR_POSITION }));
    return chartContainer;
};

export default GenreDetail;
