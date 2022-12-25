import React, { FC } from 'react';

import SearchIcon from 'gg-ukit/components/Icon/Search';
import MenuItem from 'side-bar/components/MenuItem';

const Search: FC = () => {
    return (
        <MenuItem>
            <SearchIcon color="#FFFFFF" scale={2} />
        </MenuItem>
    );
};

export default Search;
