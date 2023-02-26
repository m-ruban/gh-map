import { Container } from 'pixi.js';

import GenreIcon from 'map/components/GenreIcon';
import GenreListInfo from 'map/components/GenreListView/GenreListInfo';
import GenreListWrapper from 'map/components/GenreListView/GenreListWrapper';
import GenreTitle, { alignmentIconAndTitle } from 'map/components/GenreTitle';

export interface GenreListItem {
    id: number;
    title: string;
    code: string;
    icon: string;
    start: number;
    end: number;
}

interface GenreListViewProps extends GenreListItem {
    position: number;
}

const GenreListView: (props: GenreListViewProps) => Container = ({ title, code, icon, start, end, position }) => {
    const genreListItemContainer = new Container();

    // prepare genre content
    const genreWrapper = GenreListWrapper({ start, end, position });

    const genreIcon = GenreIcon({ x: 0, path: icon });
    const genreTitle = GenreTitle({
        title,
        genreIcon,
    });
    alignmentIconAndTitle(genreIcon, genreTitle);

    // prepare info container
    const genreInfo = GenreListInfo({ genreIcon, genreTitle, genreWrapper, start, code });

    genreListItemContainer.addChild(genreWrapper);
    genreListItemContainer.addChild(genreInfo);
    return genreListItemContainer;
};

export default GenreListView;
