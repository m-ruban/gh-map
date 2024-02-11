import { Container, FederatedWheelEvent } from 'pixi.js';

import { CategoryEvent } from 'src/models/genre';

import GenreEventView from 'map/components/GenreEvent';
import { PADDING_WRAPPER } from 'map/components/GenreEvent/constants';
import Background from 'map/components/GenreEventsLine/Background';
import ScrollTriangle, { Position } from 'map/components/GenreEventsLine/ScrollTriangle';

interface GenreEventsLineProps {
    x: number;
    y: number;
    events: CategoryEvent[];
    keyword: string;
}

interface GenreEventResponse {
    id: number;
    genreEvent: Container;
}

const GenreEventsLine: (props: GenreEventsLineProps) => Container = ({ x, y, events, keyword }) => {
    // configure container
    const genreEventLineContainer = new Container();
    genreEventLineContainer.x = x;
    genreEventLineContainer.y = y + PADDING_WRAPPER;

    // configure scrollable container (inside in basic container)
    const genreEventLineScrollableContainer = new Container();
    genreEventLineScrollableContainer.x = 0;
    genreEventLineScrollableContainer.y = 0;

    const genreEventResponses: GenreEventResponse[] = [];
    const eventViewRequests: Promise<void>[] = [];
    events.forEach(({ id, image, title, type, article_id: articleId, link }) => {
        eventViewRequests.push(
            GenreEventView({ image, title, type, articleId, link, keyword }).then((genreEvent) => {
                genreEventResponses.push({ id, genreEvent });
            })
        );
    });

    Promise.all(eventViewRequests).then(() => {
        let prevGenreEventHeight = 0;
        genreEventResponses
            .sort((a, b) => a.id - b.id)
            .forEach((genreEventResponse) => {
                const { genreEvent } = genreEventResponse;
                // render genre event
                genreEventResponse.genreEvent.y = prevGenreEventHeight;
                genreEventLineScrollableContainer.addChild(genreEvent);
                // save height for next items
                prevGenreEventHeight = genreEvent.height + genreEvent.y + PADDING_WRAPPER;
            });

        // for not-jumping scrolling use mask
        const background = Background({
            parentContainer: genreEventLineContainer,
            scrollableContainer: genreEventLineScrollableContainer,
        });
        const bottomTriangle = ScrollTriangle({ parent: background, position: Position.Bottom });
        const topTriangle = ScrollTriangle({ parent: background, position: Position.Top });

        // prepare parent genre container
        genreEventLineScrollableContainer.mask = background;
        genreEventLineContainer.addChild(background);
        genreEventLineContainer.addChild(genreEventLineScrollableContainer);
        genreEventLineContainer.addChild(topTriangle);
        genreEventLineContainer.addChild(bottomTriangle);

        // configure scroll limits
        const topScrollBorder = 0;
        const bottomScrollBorder = (genreEventLineScrollableContainer.height - background.height) * -1;
        const showAnyScrollTriangle = genreEventLineScrollableContainer.height > genreEventLineContainer.height;
        bottomTriangle.visible = showAnyScrollTriangle;

        // scroll events
        genreEventLineContainer.interactive = true;
        genreEventLineContainer.on('wheel', (event: FederatedWheelEvent) => {
            if (!showAnyScrollTriangle) {
                return;
            }
            const newY = genreEventLineScrollableContainer.y + event.deltaY * -1;
            // to top
            if (newY > topScrollBorder) {
                genreEventLineScrollableContainer.y = 0;
                topTriangle.visible = false;
                return;
            }
            // to bottom or top
            if (newY > bottomScrollBorder) {
                // check borders and show scroll triangles
                if (showAnyScrollTriangle) {
                    topTriangle.visible = newY !== 0;
                    bottomTriangle.visible = newY !== bottomScrollBorder;
                }
                genreEventLineScrollableContainer.y = newY;
                return;
            }
            // bottom border
            bottomTriangle.visible = false;
            genreEventLineScrollableContainer.y = bottomScrollBorder;
        });
    });

    return genreEventLineContainer;
};

export default GenreEventsLine;
