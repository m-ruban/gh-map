import { Container } from 'pixi.js';

import { START_YEAR } from 'map/modules/constants';

import InfoTip from 'map/components/Year/InfoTip';
import Title from 'map/components/Year/Title';
import Wrapper from 'map/components/Year/Wrapper';

const DUMMY_INFO_TIP = [1999, 2000];

const Year = ({ position, textStyle }) => {
    const yearContainer = new Container();
    yearContainer.addChild(Wrapper({ position }));
    yearContainer.addChild(Title({ position, textStyle }));

    if (DUMMY_INFO_TIP.includes(START_YEAR + position)) {
        yearContainer.addChild(InfoTip({ position }));
    }
    return yearContainer;
};

export default Year;
