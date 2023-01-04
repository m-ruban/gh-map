import { FederatedPointerEvent, Sprite, Texture } from 'pixi.js';

import CustomGameEvent from 'map/modules/CustomGameEvent';
import { isCanvasTarget } from 'map/modules/listeners';

import { ICON_SIZE, PADDING } from 'map/components/InfoTip/constants';

interface InfoTipProps {
    x: number;
    y: number;
}

const InfoTip: (props: InfoTipProps) => Sprite = ({ x, y }) => {
    // trigger
    const infoTexture = Texture.from('/icons/info.svg');
    const trigger = new Sprite(infoTexture);
    trigger.x = x - ICON_SIZE - PADDING;
    trigger.y = y + PADDING;
    trigger.height = ICON_SIZE;
    trigger.width = ICON_SIZE;

    // render sheet by click
    trigger.interactive = true;
    trigger.cursor = 'pointer';
    trigger.on('click', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        const openTipEvent = new CustomEvent(CustomGameEvent.TipOpen, {
            detail: {
                id: 111,
            },
        });
        document.dispatchEvent(openTipEvent);
        trigger.alpha = 0.6;
    });
    trigger.on('pointerleave', () => {
        trigger.alpha = 1;
    });
    return trigger;
};

export default InfoTip;
