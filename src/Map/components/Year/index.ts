import { Container, TextStyle } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, START_YEAR, WIDTH_BORDER, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';

import InfoTip from 'map/components/InfoTip';
import Title from 'map/components/Year/Title';
import Wrapper from 'map/components/Year/Wrapper';

const DUMMY_INFO_TIP_TEXT: number[] = [1999, 2001];

interface YearProps {
    position: number;
    style: TextStyle;
}

const ICON_PADDING = 10;

const Year: (props: YearProps) => Container = ({ position, style }) => {
    const yearContainer = new Container();
    yearContainer.addChild(Wrapper({ x: position * WIDTH_YEAR, y: app.view.height - HEIGHT_YEAR - WIDTH_BORDER / 2 }));
    yearContainer.addChild(
        Title({
            x: position * WIDTH_YEAR + WIDTH_YEAR / 2 + YEAR_CORNER / 2,
            y: app.view.height - HEIGHT_YEAR / 2,
            year: `${START_YEAR + position} г.`,
            style,
        })
    );

    if (DUMMY_INFO_TIP_TEXT.includes(START_YEAR + position)) {
        const tipX = (position + 1) * WIDTH_YEAR + ICON_PADDING;
        const tipY = app.view.height - HEIGHT_YEAR - ICON_PADDING;
        yearContainer.addChild(InfoTip({ x: tipX, y: tipY }));
    }
    return yearContainer;
};

export default Year;
