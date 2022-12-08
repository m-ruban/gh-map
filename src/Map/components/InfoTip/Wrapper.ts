import { Graphics, Sprite, TextMetrics } from 'pixi.js';

import { CORNER_INDENT, PADDING } from 'map/components/InfoTip/constants';
import InfoTipPosition from 'map/components/InfoTip/InfoTipPosition';

interface WrapperProps {
    infoTip: Sprite;
    metrics: TextMetrics;
    position: InfoTipPosition;
}

const getYOffset: (tipHeight: number, textHeight: number, position: InfoTipPosition) => number = (
    tipHeight,
    textHeight,
    position
) => {
    if (position === InfoTipPosition.Bottom) {
        return tipHeight + CORNER_INDENT;
    }
    return (textHeight + CORNER_INDENT + PADDING * 2) * -1;
};

const Wrapper: (props: WrapperProps) => Graphics = ({ infoTip, metrics, position }) => {
    const infoTipWrapper = new Graphics();
    infoTipWrapper.x = infoTip.x - (metrics.width / 2 - infoTip.width / 2) - PADDING;
    infoTipWrapper.y = infoTip.y + getYOffset(infoTip.height, metrics.height, position);
    infoTipWrapper.beginFill(0x383f47);
    infoTipWrapper.drawRoundedRect(0, 0, metrics.width + PADDING * 2, metrics.height + PADDING * 2, 8);
    infoTipWrapper.endFill();

    return infoTipWrapper;
};

export default Wrapper;
