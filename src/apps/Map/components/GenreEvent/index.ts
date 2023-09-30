import { Container } from 'pixi.js';

import GenreEventType from 'src/modules/GenreEventType';
import { getEventPath } from 'src/modules/image';

import { PADDING_WRAPPER } from 'map/components/GenreEvent/constants';
import Image from 'map/components/GenreEvent/Image';
import Info from 'map/components/GenreEvent/Info';

export interface GenreEvent {
    image: string;
    title: string;
    type: GenreEventType;
    keyword: string;
    articleId?: number;
    link?: string;
}

const GenreEventView: (props: GenreEvent) => Promise<Container> = async ({
    image,
    title,
    type,
    articleId,
    link,
    keyword,
}) => {
    const genreEventContainer = new Container();
    genreEventContainer.x = PADDING_WRAPPER;
    // genre event image
    const genreEventImage = await Image({ image: getEventPath(keyword, image) });
    // event title
    const genreInfo = Info({ genreEventImage, title, type, articleId, link });
    // prepare child genre container
    genreEventContainer.addChild(genreEventImage);
    genreEventContainer.addChild(genreInfo);
    return genreEventContainer;
};

export default GenreEventView;
