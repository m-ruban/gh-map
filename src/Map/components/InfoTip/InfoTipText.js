import { Text } from 'pixi.js';

import { PADDING } from 'map/components/InfoTip/constants';

const InfoTipText = ({ text, textStyle, wrapper }) => {
    const infoTipText = new Text(text, textStyle);
    infoTipText.x = wrapper.x + PADDING;
    infoTipText.y = wrapper.y + PADDING;
    return infoTipText;
};

export default InfoTipText;
