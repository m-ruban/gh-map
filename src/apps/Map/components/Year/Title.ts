import { Text, TextStyle } from 'pixi.js';

import { FontFamily } from 'map/modules/fonts';

interface TitleProps {
    x: number;
    y: number;
    year: string;
}

const Title: (props: TitleProps) => Text = ({ x, y, year }) => {
    const style = new TextStyle({
        fontFamily: FontFamily.Montserrat,
        fontSize: 64,
        fill: [0xffffff],
    });

    const title = new Text(year, style);
    title.x = x;
    title.y = y;
    title.anchor.set(0.5);
    return title;
};

export default Title;
