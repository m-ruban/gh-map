import { gsap } from 'gsap';
import { Container, FederatedPointerEvent } from 'pixi.js';

import { isCanvasTarget } from 'map/modules/listeners';

export const alphaAnimation = (trigger: Container): void => {
    trigger.interactive = true;
    trigger.cursor = 'pointer';
    trigger.on('pointerover', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        gsap.to(trigger, { alpha: 0.7, duration: 0.3, ease: 'power1.out' });
    });
    trigger.on('pointerout', () => {
        gsap.to(trigger, { alpha: 1, duration: 0.3, ease: 'power1.out' });
    });
};
