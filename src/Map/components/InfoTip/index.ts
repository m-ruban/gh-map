import { IPointData, Sprite, Texture } from 'pixi.js';

import app from 'map/modules/app';

import { ICON_SIZE, PADDING } from 'map/components/InfoTip/constants';
import InfoTipContent from 'map/components/InfoTip/InfoTipContent';
import InfoTipPosition from 'map/components/InfoTip/InfoTipPosition';

const DUMMY_TEXT =
    'Где-то влияние, великого отца ужасов, ощущается меньше, как в сериях Amnesia и Layers of Fear. А где-то можно найти лишь лавкрафтовские крохи, например, в первом. Но, если рассматривать конкретно жанр игровых ужасов, то получается довольно мемная картинка. Где-то Лавкрафта видно целиком, например, в Sinking City или в Call of Cthulhu.';

interface InfoTipProps {
    x: number;
    y: number;
    position?: InfoTipPosition;
}

interface InfoTipResult {
    infoTip: Sprite;
    onChangeScale: ({ x, y }: IPointData) => void;
}

const InfoTip: (props: InfoTipProps) => InfoTipResult = ({ x, y, position = InfoTipPosition.Top }) => {
    // trigger
    const infoTexture = Texture.from('./icons/info.svg');
    const trigger = new Sprite(infoTexture);
    trigger.x = x - ICON_SIZE - PADDING;
    trigger.y = y + PADDING;
    trigger.height = ICON_SIZE;
    trigger.width = ICON_SIZE;

    const onChangeScale = ({ x, y }: IPointData) => {
        trigger.x = x - ICON_SIZE - PADDING;
        trigger.y = y + PADDING;
    };

    // render content by hover
    let infoTipContent;
    trigger.interactive = true;
    trigger.cursor = 'pointer';
    trigger.on('pointerenter', () => {
        infoTipContent = InfoTipContent({ trigger, position, text: DUMMY_TEXT });
        // use app container for to give higher order
        app.stage.addChild(infoTipContent);
        trigger.alpha = 0.6;
    });
    trigger.on('pointerleave', () => {
        if (infoTipContent) {
            infoTipContent.destroy();
        }
        trigger.alpha = 1;
    });
    return { infoTip: trigger, onChangeScale };
};

export default InfoTip;
