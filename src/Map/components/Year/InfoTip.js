import { Sprite, Texture } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_YEAR } from 'map/modules/constants';

const InfoTip = ({ position }) => {
    const infoTexture = Texture.from('./info.svg');
    const infoTip = new Sprite(infoTexture);
    infoTip.x = (position + 1) * WIDTH_YEAR - 50;
    infoTip.y = app.view.height - HEIGHT_YEAR + 25 / 2;
    infoTip.height = 50;
    infoTip.width = 50;
    infoTip.interactive = true;
    infoTip.cursor = 'pointer';
    infoTip.on('pointerenter', () => {
        infoTip.alpha = 0.7;
    });
    infoTip.on('pointerleave', () => {
        infoTip.alpha = 1;
    });
    return infoTip;
};

export default InfoTip;
