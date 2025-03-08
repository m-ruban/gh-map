import { Container, FederatedPointerEvent, Sprite, TextMetrics, TextStyle } from 'pixi.js';

import { dispatchCustomEvent } from 'src/modules/events';
import GenreEventType from 'src/modules/GenreEventType';
import MapEvent from 'src/modules/MapEvent';

import { alphaAnimation } from 'map/modules/animations';
import { FontFamily } from 'map/modules/fonts';
import { isCanvasTarget } from 'map/modules/listeners';

import { MAX_TEXT_WIDTH } from 'map/components/GenreEvent/constants';
import InfoIcon from 'map/components/GenreEvent/InfoIcon';
import TitleText from 'map/components/GenreEvent/TitleText';
import TitleWrapper from 'map/components/GenreEvent/TitleWrapper';

const titleStyle = new TextStyle({
    fontFamily: FontFamily.Montserrat,
    fontSize: 22,
    fill: 0xdedede,
    wordWrapWidth: MAX_TEXT_WIDTH,
    wordWrap: true,
    lineHeight: 30,
});

interface InfoProps {
    genreEventImage: Sprite;
    title: string;
    type: GenreEventType;
    articleId: number;
    link?: string;
    description?: string;
    images: string[];
}

const Info: (props: InfoProps) => Container = ({
    genreEventImage,
    title,
    type,
    articleId,
    link,
    description,
    images,
}) => {
    // prepare text metrics
    const metrics = TextMetrics.measureText(title.toUpperCase(), titleStyle);

    // generate blocks
    const titleWrapper = TitleWrapper({ genreEventImage, metrics });
    const infoIcon = InfoIcon({ titleWrapper, metrics, type });
    const titleText = TitleText({ infoIcon, title, titleWrapper, titleStyle });

    // genre info
    const titleAndIconContainer = new Container();
    titleAndIconContainer.addChild(titleText);
    titleAndIconContainer.addChild(infoIcon);

    // click and hover
    alphaAnimation(titleAndIconContainer);
    titleAndIconContainer.on('click', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        // redirect
        if (link) {
            window.open(link, '_blank');
            return;
        }
        // open article in iframe
        if (articleId) {
            dispatchCustomEvent(MapEvent.ShowDetail, { detail: { title, articleId } });
            return;
        }
        // short info
        if (description) {
            dispatchCustomEvent(MapEvent.ShowDetail, { detail: { title, description, images } });
        }
    });

    // prepare child genre container
    const infoContainer = new Container();
    infoContainer.addChild(titleWrapper);
    infoContainer.addChild(titleAndIconContainer);

    return infoContainer;
};

export default Info;
