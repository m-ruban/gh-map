import { Container } from 'pixi.js';

import { History } from 'src/models/history';

import { HEIGHT_YEAR, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';

import InfoTip from 'map/components/InfoTip';
import Title from 'map/components/Year/Title';
import Wrapper from 'map/components/Year/Wrapper';

interface YearProps {
    position: number;
    historyItem: History;
}

const ICON_PADDING = 10;

const Year: (props: YearProps) => Container = ({ position, historyItem }) => {
    // render year container
    const yearContainer = new Container();
    const wrapper = Wrapper({ x: position * WIDTH_YEAR });
    const title = Title({
        x: position * WIDTH_YEAR + WIDTH_YEAR / 2 + YEAR_CORNER / 2,
        y: HEIGHT_YEAR / 2,
        year: `${historyItem.title} г.`,
    });
    yearContainer.addChild(wrapper);
    yearContainer.addChild(title);

    // add advice conditionally
    if (historyItem.advice) {
        const { advice } = historyItem;
        const tipX = (position + 1) * WIDTH_YEAR + ICON_PADDING;
        const tipY = 0;
        const infoTip = InfoTip({ x: tipX, y: tipY, detail: { ...advice } });
        yearContainer.addChild(infoTip);
    }
    return yearContainer;
};

export default Year;
