import React, { FC } from 'react';

import './logo.less';

const Logo: FC = () => {
    return (
        <div className="logo-wrapper">
            <a href="/">
                <img src="/firemap.svg" alt="GameSpirit.org logo" width="66" height="56" />
            </a>
            <div className="logo">GG.Map</div>
        </div>
    );
};

export default Logo;
