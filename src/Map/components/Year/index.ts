import { Container, TextStyle } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, START_YEAR, WIDTH_BORDER, WIDTH_YEAR, YEAR_CORNER } from 'map/modules/constants';
import { subscribeScreenEvent } from 'map/modules/screen';

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
    const wrapper = Wrapper({ x: position * WIDTH_YEAR, y: app.view.height - HEIGHT_YEAR - WIDTH_BORDER / 2 });
    const title = Title({
        x: position * WIDTH_YEAR + WIDTH_YEAR / 2 + YEAR_CORNER / 2,
        y: app.view.height - HEIGHT_YEAR / 2,
        year: `${START_YEAR + position} г.`,
        style,
    });
    yearContainer.addChild(wrapper);
    yearContainer.addChild(title);

    subscribeScreenEvent(() => {
        wrapper.y = app.view.height - HEIGHT_YEAR - WIDTH_BORDER / 2;
        title.y = app.view.height - HEIGHT_YEAR / 2;
    });

    if (DUMMY_INFO_TIP_TEXT.includes(START_YEAR + position)) {
        const tipX = (position + 1) * WIDTH_YEAR + ICON_PADDING;
        const tipY = wrapper.y;
        const { infoTip, onChangeScale } = InfoTip({ x: tipX, y: tipY });
        yearContainer.addChild(infoTip);

        subscribeScreenEvent(() => {
            onChangeScale({ x: (position + 1) * WIDTH_YEAR + ICON_PADDING, y: wrapper.y });
        });
    }
    return yearContainer;
};

export default Year;
