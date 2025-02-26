import { Graphics, Text, TextStyle } from 'pixi.js';

import { GENRE_HEIGHT, GENRE_TOP_PADDING, WIDTH_YEAR } from 'map/modules/constants';
import { FontFamily } from 'map/modules/fonts';

const DESCRIPTION_PADDING = 15;

const descriptionStyle = new TextStyle({
    fontFamily: FontFamily.Montserrat,
    fontSize: 26,
    fill: [0xffffff],
    wordWrapWidth: WIDTH_YEAR - DESCRIPTION_PADDING * 2,
    wordWrap: true,
    lineHeight: 45,
});

interface DescriptionProps {
    text: string;
    partTimeline: Graphics;
}

const Description: (props: DescriptionProps) => Text = ({ text, partTimeline }) => {
    const partTimelineDescription = new Text(text, descriptionStyle);
    partTimelineDescription.x = partTimeline.x + (WIDTH_YEAR - partTimelineDescription.width) / 2;
    partTimelineDescription.y = (GENRE_HEIGHT - partTimelineDescription.height) / 2 + GENRE_TOP_PADDING;
    partTimelineDescription.cacheAsBitmap = true;
    return partTimelineDescription;
};

export default Description;
