import { Container } from 'pixi.js';

import { HEIGHT_YEAR, START_YEAR, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';

import InfoTip from 'map/components/InfoTip';
import Title from 'map/components/Year/Title';
import Wrapper from 'map/components/Year/Wrapper';

const DUMMY_INFO_TIP_TEXT: number[] = [1999, 2001];

interface YearProps {
    position: number;
}

const ICON_PADDING = 10;

const Year: (props: YearProps) => Container = ({ position }) => {
    const yearContainer = new Container();
    const wrapper = Wrapper({ x: position * WIDTH_YEAR });
    const title = Title({
        x: position * WIDTH_YEAR + WIDTH_YEAR / 2 + YEAR_CORNER / 2,
        y: HEIGHT_YEAR / 2,
        year: `${START_YEAR + position} г.`,
    });
    yearContainer.addChild(wrapper);
    yearContainer.addChild(title);

    if (DUMMY_INFO_TIP_TEXT.includes(START_YEAR + position)) {
        const tipX = (position + 1) * WIDTH_YEAR + ICON_PADDING;
        const tipY = 0;
        const infoTip = InfoTip({ x: tipX, y: tipY });
        yearContainer.addChild(infoTip);
    }
    return yearContainer;
};

export default Year;
