import { Text, TextStyle } from 'pixi.js';

import { FontFamily } from 'map/modules/fonts';

interface TitleProps {
    x: number;
    y: number;
    year: string;
}

const style = new TextStyle({
    fontFamily: FontFamily.Montserrat,
    fontSize: 40,
    fill: [0xffffff],
});

const Title: (props: TitleProps) => Text = ({ x, y, year }) => {
    const title = new Text(year, style);
    title.x = x;
    title.y = y;
    title.anchor.set(0.5);
    title.cacheAsBitmap = true;
    return title;
};

export default Title;
