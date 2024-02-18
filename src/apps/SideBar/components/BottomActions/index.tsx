import React, { FC } from 'react';

import MenyIcon from 'side-bar/components/MenuIcon';
import MenuItem from 'side-bar/components/MenuItem';

import './bottom-actions.less';

const BottomActions: FC = () => (
    <div className="bottom-actions">
        <MenuItem name="gs">
            <a href="https://gamespirit.org/" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/gamespirit.svg" alt="GameSpirit.org Последние обзоры игр и гайды" name="gs" />
            </a>
        </MenuItem>
        <MenuItem name="boosty">
            <a href="https://boosty.to/gamespirit.org" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/boosty.svg" alt="Patreon" name="boosty" />
            </a>
        </MenuItem>
        <MenuItem name="zen">
            <a href="https://dzen.ru/godlike_goblin" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/zen.svg" alt="Yandex Dzen" name="zen" />
            </a>
        </MenuItem>
        <MenuItem name="steam">
            <a href="https://steamcommunity.com/groups/gamespirit-org" target="_blank" rel="noreferrer">
                <MenyIcon src="/icons/steam.svg" alt="steam" name="steam" />
            </a>
        </MenuItem>
    </div>
);

export default BottomActions;
