import { Sprite, Texture } from 'pixi.js';

import { ICON_SIZE } from 'map/components/InfoTip/constants';

interface TriggerProps {
    x: number;
    y: number;
}

const Trigger: (props: TriggerProps) => Sprite = ({ x, y }) => {
    const infoTexture = Texture.from('./info.svg');
    const triggerIcon = new Sprite(infoTexture);
    triggerIcon.x = x - ICON_SIZE;
    triggerIcon.y = y + ICON_SIZE / 4;
    triggerIcon.height = ICON_SIZE;
    triggerIcon.width = ICON_SIZE;
    return triggerIcon;
};

export default Trigger;
