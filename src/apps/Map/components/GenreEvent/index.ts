import { Container } from 'pixi.js';

import { PADDING_WRAPPER } from 'map/components/GenreEvent/constants';
import GenreEventType from 'map/components/GenreEvent/GenreEventType';
import Image from 'map/components/GenreEvent/Image';
import Info from 'map/components/GenreEvent/Info';

export interface GenreEvent {
    img: string;
    title: string;
    type: GenreEventType;
}

const GenreEventComponent: (props: GenreEvent) => Container = ({ img, title, type }) => {
    // genre event image
    const genreImage = Image({ img });
    // text
    const genreInfo = Info({ genreImage, title, type });

    // prepare child genre container
    const genreEventContainer = new Container();
    genreEventContainer.addChild(genreImage);
    genreEventContainer.addChild(genreInfo);
    genreEventContainer.x = PADDING_WRAPPER;

    return genreEventContainer;
};

export default GenreEventComponent;
