import { Container, FederatedPointerEvent, Sprite, TextMetrics, TextStyle } from 'pixi.js';

import GenreEventType from 'src/modules/GenreEventType';
import MapEvent from 'src/modules/MapEvent';

import { FontFamily } from 'map/modules/fonts';
import { isCanvasTarget } from 'map/modules/listeners';

import { MAX_TEXT_WIDTH } from 'map/components/GenreEvent/constants';
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
    genreEventImage: Sprite;
    title: string;
    type: GenreEventType;
    articleId: number;
    link?: string;
}

const Info: (props: InfoProps) => Container = ({ genreEventImage, title, type, articleId, link }) => {
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
    titleAndIconContainer.interactive = true;
    titleAndIconContainer.cursor = 'pointer';
    titleAndIconContainer.on('click', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        if (link) {
            window.location.href = link;
            return;
        }
        const openArticleEvent = new CustomEvent(MapEvent.ArticleOpen, {
            detail: { articleId },
        });
        document.dispatchEvent(openArticleEvent);
    });
    titleAndIconContainer.on('pointerenter', (event: FederatedPointerEvent) => {
        if (!isCanvasTarget(event)) {
            return;
        }
        titleAndIconContainer.alpha = 0.7;
    });
    titleAndIconContainer.on('pointerleave', () => {
        titleAndIconContainer.alpha = 1;
    });

    // prepare child genre container
    const infoContainer = new Container();
    infoContainer.addChild(titleWrapper);
    infoContainer.addChild(titleAndIconContainer);

    return infoContainer;
};

export default Info;
