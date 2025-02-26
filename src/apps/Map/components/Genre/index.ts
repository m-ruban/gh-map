import { Container, DisplayObject, FederatedPointerEvent } from 'pixi.js';

import store from 'src/models/store';
import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app from 'map/modules/app';
import { GENRE_TOP_PADDING, WIDTH_BORDER, WIDTH_YEAR } from 'map/modules/constants';
import { isCanvasTarget } from 'map/modules/listeners';

import Description from 'map/components/Genre/Description';
import GenreWrapper from 'map/components/Genre/GenreWrapper';
import PartTimeline from 'map/components/Genre/PartTimeline';
import GenreEventsLine from 'map/components/GenreEventsLine';
import GenreIcon from 'map/components/GenreIcon';
import GenreTitle, { alignmentIconAndTitle } from 'map/components/GenreTitle';
import InfoTip from 'map/components/InfoTip';

const Genre: () => DisplayObject = () => {
    const { genre } = store.getState();
    const {
        start,
        startKey,
        endKey,
        category_timeline_items_by_years: timelineItems,
        alt_image: path,
        short_name: name,
        seo: { keyword },
    } = genre;
    const startPointX = WIDTH_YEAR * startKey + WIDTH_BORDER / 2;

    // timeline on years
    const genreTimeline = new Container();
    const genreEventLines: Container[] = [];

    for (let position = startKey; position < endKey + 1; position++) {
        // prepare timeline data
        const currentYear = start + position - startKey;
        const timelineItem = timelineItems[currentYear];

        // prepare timeline part
        const partTimelineContainer = new Container();
        const partTimelineInfoContainer = new Container();

        // wrapper
        const partTimeline = PartTimeline({ position });
        partTimelineInfoContainer.addChild(partTimeline);

        if (timelineItem) {
            const { title, category_events: events } = timelineItem;

            // render description
            if (title) {
                const partTimelineDescription = Description({ text: title, partTimeline });
                partTimelineInfoContainer.addChild(partTimelineDescription);
            }

            // tip for description
            const { advice } = timelineItem;
            if (advice) {
                const tipX = (position + 1) * WIDTH_YEAR;
                const infoTip = InfoTip({ x: tipX, y: GENRE_TOP_PADDING, detail: { ...advice } });
                partTimelineInfoContainer.addChild(infoTip);
            }

            if (events.length > 0) {
                // events line
                const genreEventLine = GenreEventsLine({
                    x: partTimeline.x,
                    y: partTimeline.y + partTimeline.height,
                    events,
                    keyword,
                });
                partTimelineContainer.addChild(genreEventLine);
                genreEventLines.push(genreEventLine);
            }
        }

        partTimelineContainer.addChild(partTimelineInfoContainer);
        genreTimeline.addChild(partTimelineContainer);
    }

    const genreBody = new Container();
    const genrePolygon = GenreWrapper({ startPointX }); // hexagon
    genreBody.addChild(genrePolygon);

    GenreIcon({ x: startPointX, path }).then((genreIcon) => {
        const genreTitle = GenreTitle({ title: name, genreIcon });
        alignmentIconAndTitle(genreIcon, genreTitle);

        // prepare info container
        const genreInfo = new Container();
        genreInfo.addChild(genreIcon);
        genreInfo.addChild(genreTitle);
        genreInfo.x = (WIDTH_YEAR - genreInfo.width) / 2;
        genreInfo.y = (genrePolygon.height - genreInfo.height) / 2;

        // genre info hover and click
        genreInfo.interactive = true;
        genreInfo.cursor = 'pointer';
        genreInfo.on('pointerenter', (event: FederatedPointerEvent) => {
            if (!isCanvasTarget(event)) {
                return;
            }
            genreInfo.alpha = 0.7;
        });
        genreInfo.on('click', (event: FederatedPointerEvent) => {
            if (!isCanvasTarget(event)) {
                return;
            }
            const { genre } = store.getState();
            const detail = {
                description: genre.seo.descr,
                title: genre.short_name,
                link: `https://gamespirit.org/categories${genre.code}`,
                anchor: 'Далее',
            };
            dispatchCustomEvent(MapEvent.ShowDetail, { detail });
        });
        genreInfo.on('pointerleave', () => {
            genreInfo.alpha = 1;
        });

        // timeline and info
        genreBody.addChild(genreInfo);
    });

    // prepare genre container
    const genreContainer = new Container();
    genreContainer.addChild(genreTimeline);
    genreContainer.addChild(genreBody);

    // culling
    app.ticker.add(() => {
        const rightBorder = app.screen.width + Math.abs(app.stage.x);
        const leftBorder = Math.abs(app.stage.x);
        for (const genreEventLine of genreEventLines) {
            genreEventLine.visible =
                genreEventLine.x + genreEventLine.width > leftBorder && genreEventLine.x < rightBorder;
        }
    });

    return genreContainer;
};

export default Genre;
