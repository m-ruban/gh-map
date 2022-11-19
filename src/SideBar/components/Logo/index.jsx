import React from 'react';

import 'side-bar/components/Logo/logo.less';

const Logo = () => {
    return (
        <div>
            <a href="/">
                <img src="https://gamespirit.org/img/logo/golem.png" alt="GameSpirit.org logo" width="90" height="76" />
            </a>
            <div className="logo">gh-map</div>
        </div>
    );
};

export default Logo;
