import { Container, Sprite, TextMetrics, TextStyle } from 'pixi.js';

import { FontFamily } from 'map/modules/fonts';

import { MAX_TEXT_WIDTH, PADDING } from 'map/components/InfoTip/constants';
import InfoTipPosition from 'map/components/InfoTip/InfoTipPosition';
import InfoTipText from 'map/components/InfoTip/InfoTipText';
import TextWrapper from 'map/components/InfoTip/TextWrapper';
import Triangle from 'map/components/InfoTip/Triangle';

const style = new TextStyle({
    fontFamily: FontFamily.OpenSans,
    fontSize: 28,
    fill: 0xdedede,
    align: 'left',
    wordWrapWidth: MAX_TEXT_WIDTH,
    wordWrap: true,
    padding: PADDING,
    lineHeight: 40,
});

interface InfoTipContentProps {
    infoTip: Sprite;
    position?: InfoTipPosition;
    text: string;
}

const InfoTipContent: (props: InfoTipContentProps) => Container = ({ infoTip, position, text }) => {
    // tip container
    const infoTipContainer = new Container();

    // calc text metrics
    const metrics = TextMetrics.measureText(text, style);

    // info tip body
    const textWrapper = TextWrapper({ infoTip, metrics, position });
    const infoTipText = InfoTipText({ text: text, style, wrapper: textWrapper });
    const triangle = Triangle({ infoTipText, position });

    // prepare container
    infoTipContainer.addChild(textWrapper);
    infoTipContainer.addChild(infoTipText);
    infoTipContainer.addChild(triangle);

    return infoTipContainer;
};

export default InfoTipContent;
