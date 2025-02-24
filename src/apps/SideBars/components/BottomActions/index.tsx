import React, { FC } from 'react';

import MenyIcon from 'side-bars/components/MenuIcon';
import MenuItem from 'side-bars/components/MenuItem';

import './bottom-actions.less';

const BottomActions: FC = () => (
    <div className="bottom-actions">
        <MenuItem name="gs">
            <a href="https://gamespirit.org/" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/gamespirit.svg" alt="GameSpirit.org Последние обзоры игр и гайды" name="gs" />
            </a>
        </MenuItem>
    </div>
);

export default BottomActions;
