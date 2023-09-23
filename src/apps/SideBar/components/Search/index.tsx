import React, { FC } from 'react';

import MenyIcon from 'side-bar/components/MenuIcon';
import MenuItem from 'side-bar/components/MenuItem';

const Search: FC = () => {
    return (
        <MenuItem>
            <MenyIcon src="/icons/search.svg" alt="Поиск" />
        </MenuItem>
    );
};

export default Search;
