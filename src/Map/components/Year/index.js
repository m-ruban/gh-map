import { Container } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, START_YEAR, WIDTH_BORDER, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';

import InfoTip from 'map/components/InfoTip';
import Title from 'map/components/Year/Title';
import Wrapper from 'map/components/Year/Wrapper';

const DUMMY_INFO_TIP = [1999, 2001];

const Year = ({ position, textStyle }) => {
    const yearContainer = new Container();
    yearContainer.addChild(Wrapper({ x: position * WIDTH_YEAR, y: app.view.height - HEIGHT_YEAR - WIDTH_BORDER }));
    yearContainer.addChild(
        Title({
            x: position * WIDTH_YEAR + WIDTH_YEAR / 2 + YEAR_CORNER / 2,
            y: app.view.height - HEIGHT_YEAR / 2,
            year: START_YEAR + position,
            textStyle,
        })
    );

    if (DUMMY_INFO_TIP.includes(START_YEAR + position)) {
        yearContainer.addChild(InfoTip({ x: (position + 1) * WIDTH_YEAR, y: app.view.height - HEIGHT_YEAR }));
    }
    return yearContainer;
};

export default Year;
