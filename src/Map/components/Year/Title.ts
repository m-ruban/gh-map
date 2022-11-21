import { Text, TextStyle } from 'pixi.js';

interface TitleProps {
    x: number;
    y: number;
    year: string;
    style: TextStyle;
}

const Title: (props: TitleProps) => Text = ({ x, y, year, style }) => {
    const title = new Text(year, style);
    title.x = x;
    title.y = y;
    title.anchor.set(0.5);
    return title;
};

export default Title;
