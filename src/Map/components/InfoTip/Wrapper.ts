import { Graphics, Sprite, TextMetrics } from 'pixi.js';

import { CORNER_INDENT, PADDING } from 'map/components/InfoTip/constants';

interface WrapperProps {
    infoTip: Sprite;
    metrics: TextMetrics;
}

const Wrapper: (props: WrapperProps) => Graphics = ({ infoTip, metrics }) => {
    const infoTipWrapper = new Graphics();

    infoTipWrapper.x = infoTip.x - (metrics.width / 2 - infoTip.width / 2) - PADDING;
    infoTipWrapper.y = infoTip.y - metrics.height - CORNER_INDENT - PADDING * 2;
    infoTipWrapper.beginFill(0x383f47);
    infoTipWrapper.drawRoundedRect(0, 0, metrics.width + PADDING * 2, metrics.height + PADDING * 2, 8);
    infoTipWrapper.endFill();

    return infoTipWrapper;
};

export default Wrapper;
