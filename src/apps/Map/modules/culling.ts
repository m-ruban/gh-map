import { Container } from 'pixi.js';

import app from 'map/modules/app';

export const culling = (containers: Container[]): void => {
    app.ticker.add(() => {
        const rightBorder = app.screen.width + Math.abs(app.stage.x);
        const leftBorder = Math.abs(app.stage.x);
        for (const container of containers) {
            container.visible = container.x + container.width > leftBorder && container.x < rightBorder;
        }
    });
};
