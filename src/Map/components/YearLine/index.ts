import { Graphics } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_BORDER, WIDTH_YEAR } from 'map/modules/constants';

interface YearProps {
    position: number;
}

const YearLine: (props: YearProps) => Graphics = ({ position }) => {
    const yearLine = new Graphics();
    const width = WIDTH_BORDER / 2;
    yearLine.lineStyle({ color: 0x404a53, width });
    yearLine.moveTo(position * WIDTH_YEAR + width, 0);
    yearLine.lineTo(position * WIDTH_YEAR + width, app.view.height - HEIGHT_YEAR - WIDTH_BORDER);
    return yearLine;
};

export default YearLine;
