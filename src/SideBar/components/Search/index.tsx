import React, { FC } from 'react';

import SearchIcon from 'gg-ukit/components/Icon/Search';

import 'side-bar/components/Search/search.less';

const Search: FC = () => {
    return (
        <div className="search">
            <SearchIcon color="#FFFFFF" scale={1} />
        </div>
    );
};

export default Search;
