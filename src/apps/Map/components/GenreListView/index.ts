import { Container } from 'pixi.js';

import { GenreShortItem } from 'src/models/genres';

import GenreIcon from 'map/components/GenreIcon';
import GenreListInfo from 'map/components/GenreListView/GenreListInfo';
import GenreListWrapper from 'map/components/GenreListView/GenreListWrapper';
import GenreTitle, { alignmentIconAndTitle } from 'map/components/GenreTitle';

interface Props {
    genre: GenreShortItem;
    position: number;
}

const GenreListView: (props: Props) => Container = ({ genre, position }) => {
    const {
        seo: { keyword: code },
        alt_image: icon,
        startKey: start,
        endKey: end,
        short_name: title,
    } = genre;
    const genreListItemContainer = new Container();

    // prepare genre content
    const genreWrapper = GenreListWrapper({ start, end, position });
    genreWrapper.cacheAsBitmap = true;

    // load icon fron server
    GenreIcon({ x: 0, path: icon }).then((genreIcon) => {
        const genreTitle = GenreTitle({
            title,
            genreIcon,
        });
        // set sprite and update positions
        alignmentIconAndTitle(genreIcon, genreTitle);
        const genreInfo = GenreListInfo({ genreIcon, genreTitle, genreWrapper, start, code });
        genreListItemContainer.addChild(genreInfo);
    });

    // prepare info container
    genreListItemContainer.addChild(genreWrapper);
    return genreListItemContainer;
};

export default GenreListView;
