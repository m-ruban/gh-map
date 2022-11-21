import { Container, Sprite, TextMetrics, TextStyle } from 'pixi.js';

import app from 'map/modules/app';
import fontPromise, { FontFamily } from 'map/modules/fonts';

import { MAX_TEXT_WIDTH, PADDING } from 'map/components/InfoTip/constants';
import InfoTipText from 'map/components/InfoTip/InfoTipText';
import Triangle from 'map/components/InfoTip/Triangle';
import Trigger from 'map/components/InfoTip/Trigger';
import Wrapper from 'map/components/InfoTip/Wrapper';

const DUMMY_TEXT =
    'Где-то влияние, великого отца ужасов, ощущается меньше, как в сериях Amnesia и Layers of Fear. А где-то можно найти лишь лавкрафтовские крохи, например, в первом. Но, если рассматривать конкретно жанр игровых ужасов, то получается довольно мемная картинка. Где-то Лавкрафта видно целиком, например, в Sinking City или в Call of Cthulhu.';

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

interface InfoTipProps {
    x: number;
    y: number;
}

const InfoTip: (props: InfoTipProps) => Sprite = ({ x, y }) => {
    // trigger
    const infoTip = Trigger({ x, y });

    // tip container
    const infoTipContainer = new Container();
    infoTipContainer.visible = false;

    fontPromise.then(() => {
        // calc text metrics
        const metrics = TextMetrics.measureText(DUMMY_TEXT, style);

        // info tip body
        const textWrapper = Wrapper({ infoTip, metrics });
        const infoTipText = InfoTipText({ text: DUMMY_TEXT, style, wrapper: textWrapper });
        const triangle = Triangle({ infoTipText });

        // prepare container
        infoTipContainer.addChild(textWrapper);
        infoTipContainer.addChild(infoTipText);
        infoTipContainer.addChild(triangle);
    });

    // show by hover
    infoTip.interactive = true;
    infoTip.cursor = 'pointer';
    infoTip.on('pointerenter', () => {
        infoTipContainer.visible = true;
        infoTip.alpha = 0.6;
    });
    infoTip.on('pointerleave', () => {
        infoTipContainer.visible = false;
        infoTip.alpha = 1;
    });

    // use app container for to give higher order
    app.stage.addChild(infoTipContainer);
    return infoTip;
};

export default InfoTip;
