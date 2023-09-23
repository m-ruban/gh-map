import React, { FC } from 'react';

import MenyIcon from 'side-bar/components/MenuIcon';
import MenuItem from 'side-bar/components/MenuItem';

import './bottom-actions.less';

const BottomActions: FC = () => (
    <div className="bottom-actions">
        <MenuItem>
            <a href="https://gamespirit.org/" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/gamespirit.svg" alt="GameSpirit.org Последние обзоры игр и гайды" />
            </a>
        </MenuItem>
        <MenuItem>
            <a href="https://steamcommunity.com/groups/gamespirit-org" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/steam.svg" alt="steam" />
            </a>
        </MenuItem>
        <MenuItem>
            <a href="https://dzen.ru/godlike_goblin" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/zen.svg" alt="Yandex Dzen" />
            </a>
        </MenuItem>
        <MenuItem>
            <a href="https://www.patreon.com/gamespirit" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/patreon.svg" alt="Patreon" />
            </a>
        </MenuItem>
    </div>
);

export default BottomActions;
