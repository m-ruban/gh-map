import { Container, DisplayObject } from 'pixi.js';

import { WIDTH_BORDER, WIDTH_YEAR } from 'map/modules/constants';

import { GENRE_TOP_PADDING } from 'map/components/Genre/constants';
import Description from 'map/components/Genre/Description';
import GenreWrapper from 'map/components/Genre/GenreWrapper';
import Icon from 'map/components/Genre/Icon';
import PartTimeline from 'map/components/Genre/PartTimeline';
import Title from 'map/components/Genre/Title';
import GenreEventsLine from 'map/components/GenreEventsLine';
import InfoTip from 'map/components/InfoTip';
import InfoTipPosition from 'map/components/InfoTip/InfoTipPosition';

interface GenreProps {
    startYear: number;
    endYear: number;
}

const DUMMY_ID = 11;
const DUMMY_TITLE = 'RPG';
const DUMMY_TEXTS = {
    '1': 'Становление основ жанра',
    '3': 'Первая 3D RPG игра в истории',
};

const Genre: (props: GenreProps) => DisplayObject = ({ startYear, endYear }) => {
    const start = WIDTH_YEAR * startYear + WIDTH_BORDER / 2;

    // timeline on years
    const genreTimeline = new Container();

    for (let position = startYear - 1; position < endYear; position++) {
        // prepare timeline part
        const partTimelineContainer = new Container();
        const partTimelineInfoContainer = new Container();

        // wrapper
        const partTimeline = PartTimeline({ start, position });
        partTimelineInfoContainer.addChild(partTimeline);

        // description
        if (DUMMY_TEXTS[position]) {
            // render description
            const partTimelineDescription = Description({ text: DUMMY_TEXTS[position], partTimeline });
            partTimelineInfoContainer.addChild(partTimelineDescription);

            // tip for description
            const tipX = start + (position + 1) * WIDTH_YEAR;
            const { infoTip } = InfoTip({ x: tipX, y: GENRE_TOP_PADDING, position: InfoTipPosition.Bottom });
            partTimelineInfoContainer.addChild(infoTip);

            // events line
            const genreEventLine = GenreEventsLine({
                x: partTimeline.x,
                y: partTimeline.y + partTimeline.height,
            });
            partTimelineContainer.addChild(genreEventLine);
        }

        partTimelineContainer.addChild(partTimelineInfoContainer);
        genreTimeline.addChild(partTimelineContainer);
    }

    const genrePolygon = GenreWrapper({ start }); // hexagon
    const genreIcon = Icon({ start, path: './icons/rpg.svg' });
    const genreTitle = Title({ title: DUMMY_TITLE, genreIcon, id: DUMMY_ID });

    // vertical alignment between title/icon
    if (genreTitle.height > genreIcon.height) {
        genreIcon.y = (genreTitle.height - genreIcon.height) / 2;
    } else {
        genreTitle.y = (genreIcon.height - genreTitle.height) / 2;
    }

    // prepare info container
    const genreInfo = new Container();
    genreInfo.addChild(genreIcon);
    genreInfo.addChild(genreTitle);
    genreInfo.x = (WIDTH_YEAR - genreInfo.width) / 2;
    genreInfo.y = (genrePolygon.height - genreInfo.height) / 2;

    // timeline and info
    const genre = new Container();
    genre.addChild(genrePolygon);
    genre.addChild(genreInfo);

    // prepare genre container
    const genreContainer = new Container();
    genreContainer.addChild(genreTimeline);
    genreContainer.addChild(genre);

    return genreContainer;
};

export default Genre;
