import React, { FC } from 'react';

import 'side-bar/components/Logo/logo.less';

const Logo: FC = () => {
    return (
        <div>
            <a href="/">
                <img src="https://gamespirit.org/img/logo/golem.png" alt="GameSpirit.org logo" width="66" height="56" />
            </a>
            <div className="logo">ghmap</div>
        </div>
    );
};

export default Logo;
