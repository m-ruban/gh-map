import { Graphics, Text, TextStyle } from 'pixi.js';

import { PADDING } from 'map/components/InfoTip/constants';

interface InfoTipTextProps {
    text: string;
    style: TextStyle;
    wrapper: Graphics;
}

const InfoTipText: (props: InfoTipTextProps) => Text = ({ text, style, wrapper }) => {
    const infoTipText = new Text(text, style);
    infoTipText.x = wrapper.x + PADDING;
    infoTipText.y = wrapper.y + PADDING;
    return infoTipText;
};

export default InfoTipText;
