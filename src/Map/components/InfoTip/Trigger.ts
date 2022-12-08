import { Sprite, Texture } from 'pixi.js';

import { ICON_SIZE, PADDING } from 'map/components/InfoTip/constants';

interface TriggerProps {
    x: number;
    y: number;
}

const Trigger: (props: TriggerProps) => Sprite = ({ x, y }) => {
    const infoTexture = Texture.from('./info.svg');
    const triggerIcon = new Sprite(infoTexture);
    triggerIcon.x = x - ICON_SIZE - PADDING;
    triggerIcon.y = y + PADDING;
    triggerIcon.height = ICON_SIZE;
    triggerIcon.width = ICON_SIZE;
    return triggerIcon;
};

export default Trigger;
