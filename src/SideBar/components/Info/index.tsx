import React, { FC } from 'react';

import MenyIcon from 'side-bar/components/MenuIcon';
import MenuItem from 'side-bar/components/MenuItem';

const Info: FC = () => {
    return (
        <MenuItem>
            <MenyIcon src="/icons/info.svg" alt="info" />
        </MenuItem>
    );
};

export default Info;
