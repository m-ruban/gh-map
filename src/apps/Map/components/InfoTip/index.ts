import { gsap } from 'gsap';
import { FederatedPointerEvent, Sprite, Texture } from 'pixi.js';

import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import { alphaAnimation } from 'map/modules/animations';
import { isCanvasTarget } from 'map/modules/listeners';

import { ICON_SIZE, PADDING } from 'map/components/InfoTip/constants';

interface InfoTipProps {
    x: number;
    y: number;
    detail?: Record<string, string | number>;
}

const InfoTip: (props: InfoTipProps) => Sprite = ({ x, y, detail }) => {
    // trigger
    const infoTexture = Texture.from('/icons/info.svg');
    const trigger = new Sprite(infoTexture);
    trigger.anchor.set(0.5);
    trigger.x = x - ICON_SIZE - PADDING + ICON_SIZE / 2;
    trigger.y = y + PADDING + ICON_SIZE / 2;
    trigger.height = ICON_SIZE;
    trigger.width = ICON_SIZE;

    // render sheet by click
    alphaAnimation(trigger);
    trigger.on('pointerdown', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        dispatchCustomEvent(MapEvent.ShowDetail, { detail });
        gsap.to(trigger.scale, { x: 0.57, y: 0.57, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' });
    });
    return trigger;
};

export default InfoTip;
