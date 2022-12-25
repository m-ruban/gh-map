import React, { FC } from 'react';

import MenyIcon from 'side-bar/components/MenuIcon';
import MenuItem from 'side-bar/components/MenuItem';

const Help: FC = () => {
    return (
        <MenuItem>
            <MenyIcon src="/icons/help.svg" alt="help" />
        </MenuItem>
    );
};

export default Help;
