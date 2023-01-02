import { Container } from 'pixi.js';

import Genre from 'map/components/Genre';

import Ground from 'map/pages/GenreDetail/Ground';

const START_YEAR_POSITION = 1;
const END_YEAR_POSITION = 7;

const GenreDetail: () => Container = () => {
    // background
    const chartContainer = new Container();
    chartContainer.addChild(Ground());
    // render genre
    chartContainer.addChild(Genre({ startYear: START_YEAR_POSITION, endYear: END_YEAR_POSITION }));
    return chartContainer;
};

export default GenreDetail;
