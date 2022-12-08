import { Container, Sprite, TextMetrics, TextStyle } from 'pixi.js';

import { FontFamily } from 'map/modules/fonts';

import { MAX_TEXT_WIDTH } from 'map/components/GenreEvent/constants';
import GenreEventType from 'map/components/GenreEvent/GenreEventType';
import InfoIcon from 'map/components/GenreEvent/InfoIcon';
import TitleText from 'map/components/GenreEvent/TitleText';
import TitleWrapper from 'map/components/GenreEvent/TitleWrapper';

const titleStyle = new TextStyle({
    fontFamily: FontFamily.Montserrat,
    fontSize: 28,
    fill: 0xdedede,
    wordWrapWidth: MAX_TEXT_WIDTH,
    wordWrap: true,
    lineHeight: 40,
});

interface InfoProps {
    genreImage: Sprite;
    title: string;
    type: GenreEventType;
}

const Info: (props: InfoProps) => Container = ({ genreImage, title, type }) => {
    // prepare text metrics
    const metrics = TextMetrics.measureText(title.toUpperCase(), titleStyle);

    const titleWrapper = TitleWrapper({ genreImage, metrics });
    const infoIcon = InfoIcon({ titleWrapper, metrics, type });
    const titleText = TitleText({ infoIcon, title, titleWrapper, titleStyle });

    // prepare child genre container
    const infoContainer = new Container();
    infoContainer.addChild(titleWrapper);
    infoContainer.addChild(infoIcon);
    infoContainer.addChild(titleText);

    return infoContainer;
};

export default Info;
