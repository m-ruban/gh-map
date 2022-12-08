import { Graphics, Sprite, Text, TextStyle } from 'pixi.js';

import { PADDING_INFO } from 'map/components/GenreEvent/constants';

interface InfoProps {
    infoIcon: Sprite;
    title: string;
    titleWrapper: Graphics;
    titleStyle: TextStyle;
}

const TitleText: (props: InfoProps) => Text = ({ infoIcon, title, titleWrapper, titleStyle }) => {
    const titleText = new Text(title.toUpperCase(), titleStyle);
    titleText.x = infoIcon.x + infoIcon.width + PADDING_INFO;
    titleText.y = titleWrapper.y + PADDING_INFO;
    titleText.interactive = true;
    titleText.cursor = 'pointer';
    titleText.on('pointerenter', () => {
        titleText.alpha = 0.7;
    });
    titleText.on('pointerleave', () => {
        titleText.alpha = 1;
    });
    return titleText;
};

export default TitleText;
