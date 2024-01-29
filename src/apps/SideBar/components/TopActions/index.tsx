import React, { FC } from 'react';

import Help from 'side-bar/components/Help';
import Info from 'side-bar/components/Info';
import Logo from 'side-bar/components/Logo';

import './top-actions.less';

export const TopActionsLogo: FC = () => (
    <div className="top-actions">
        <Logo />
    </div>
);

const TopActions: FC = () => (
    <div className="top-actions">
        <Logo />
        <Help />
        <Info />
    </div>
);

export default TopActions;
