import { Container, FederatedWheelEvent } from 'pixi.js';

import app from 'map/modules/app';
import { HEIGHT_YEAR, WIDTH_BORDER } from 'map/modules/constants';

import GenreEventComponent, { GenreEvent } from 'map/components/GenreEvent';
import { PADDING_WRAPPER } from 'map/components/GenreEvent/constants';
import GenreEventType from 'map/components/GenreEvent/GenreEventType';
import Background from 'map/components/GenreEventsLine/Background';

interface GenreEventsLineProps {
    x: number;
    y: number;
    genreEvents?: GenreEvent[];
}

const DUMMY_EVENTS = [
    {
        img: './1.jpg',
        title: 'Door Kickers: Action Squad',
        type: GenreEventType.Game,
    },
    {
        img: './2.jpg',
        title: 'Sony PlayStation 2',
        type: GenreEventType.Platform,
    },
    {
        img: './3.jpg',
        title: 'Submarine Titans',
        type: GenreEventType.Other,
    },
];

const GenreEventsLine: (props: GenreEventsLineProps) => Container = ({ x, y, genreEvents = [...DUMMY_EVENTS] }) => {
    // configure container
    const genreEventLineContainer = new Container();
    genreEventLineContainer.x = x;
    genreEventLineContainer.y = y + PADDING_WRAPPER;

    // configure scrollable container (inside in basic container)
    const genreEventLineScrollableContainer = new Container();
    genreEventLineScrollableContainer.x = 0;
    genreEventLineScrollableContainer.y = 0;

    let prevGenreEventHeight = 0;
    genreEvents.forEach(({ img, title, type }) => {
        // generate genre event
        const genreEvent = GenreEventComponent({ img, title, type });
        genreEvent.y = prevGenreEventHeight;
        genreEventLineScrollableContainer.addChild(genreEvent);

        // save height for next items
        prevGenreEventHeight = genreEvent.height + genreEvent.y + PADDING_WRAPPER;
    });

    // for not-jumping scrolling use mask
    const possibleHeight = app.view.height - (HEIGHT_YEAR + WIDTH_BORDER) - genreEventLineContainer.y - PADDING_WRAPPER;
    const background = Background({ scrollableContainer: genreEventLineScrollableContainer, height: possibleHeight });

    // prepare parent genre container
    genreEventLineScrollableContainer.mask = background;
    genreEventLineContainer.addChild(background);
    genreEventLineContainer.addChild(genreEventLineScrollableContainer);

    // configure scroll limits
    const bottomScrollBorder = (genreEventLineScrollableContainer.height - possibleHeight) * -1;
    const topScrollBorder = 0;

    // scroll events
    genreEventLineContainer.interactive = true;
    genreEventLineContainer.on('wheel', (event: FederatedWheelEvent) => {
        const newY = genreEventLineScrollableContainer.y + event.deltaY * -1;
        // to top
        if (newY > topScrollBorder) {
            genreEventLineScrollableContainer.y = 0;
            return;
        }
        // to bottom
        if (newY > bottomScrollBorder) {
            genreEventLineScrollableContainer.y = newY;
            return;
        }
        // bottom border
        genreEventLineScrollableContainer.y = bottomScrollBorder;
    });

    return genreEventLineContainer;
};

export default GenreEventsLine;
