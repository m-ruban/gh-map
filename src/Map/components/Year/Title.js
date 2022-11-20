import { Text } from 'pixi.js';

const Title = ({ x, y, year, textStyle }) => {
    const title = new Text(year, textStyle);
    title.x = x;
    title.y = y;
    title.anchor.set(0.5);
    return title;
};

export default Title;
