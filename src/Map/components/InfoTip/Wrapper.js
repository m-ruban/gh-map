import { Graphics } from 'pixi.js';

import { CORNER_INDENT, PADDING } from 'map/components/InfoTip/constants';

const Wrapper = ({ infoTip, textMetrics }) => {
    const infoTipWrapper = new Graphics();

    infoTipWrapper.x = infoTip.x - (textMetrics.width / 2 - infoTip.width / 2) - PADDING;
    infoTipWrapper.y = infoTip.y - textMetrics.height - CORNER_INDENT - PADDING * 2;
    infoTipWrapper.beginFill(0x383f47);
    infoTipWrapper.drawRoundedRect(0, 0, textMetrics.width + PADDING * 2, textMetrics.height + PADDING * 2, 8);
    infoTipWrapper.endFill();

    return infoTipWrapper;
};

export default Wrapper;
