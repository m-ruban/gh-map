import { Sprite } from 'pixi.js';

import app from 'map/modules/app';

import InfoTipContent from 'map/components/InfoTip/InfoTipContent';
import InfoTipPosition from 'map/components/InfoTip/InfoTipPosition';
import Trigger from 'map/components/InfoTip/Trigger';

const DUMMY_TEXT =
    'Где-то влияние, великого отца ужасов, ощущается меньше, как в сериях Amnesia и Layers of Fear. А где-то можно найти лишь лавкрафтовские крохи, например, в первом. Но, если рассматривать конкретно жанр игровых ужасов, то получается довольно мемная картинка. Где-то Лавкрафта видно целиком, например, в Sinking City или в Call of Cthulhu.';

interface InfoTipProps {
    x: number;
    y: number;
    position?: InfoTipPosition;
}

const InfoTip: (props: InfoTipProps) => Sprite = ({ x, y, position = InfoTipPosition.Top }) => {
    // trigger
    const infoTip = Trigger({ x, y });

    // render content by hover
    let infoTipContent;
    infoTip.interactive = true;
    infoTip.cursor = 'pointer';
    infoTip.on('pointerenter', () => {
        infoTipContent = InfoTipContent({ infoTip, position, text: DUMMY_TEXT });
        // use app container for to give higher order
        app.stage.addChild(infoTipContent);
        infoTip.alpha = 0.6;
    });
    infoTip.on('pointerleave', () => {
        if (infoTipContent) {
            infoTipContent.destroy();
        }
        infoTip.alpha = 1;
    });
    return infoTip;
};

export default InfoTip;
