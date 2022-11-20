import React from 'react';

import Logo from 'side-bar/components/Logo';
import Search from 'side-bar/components/Search';

import 'gg-ukit/styles/fonts.less';
import 'gg-ukit/styles/defaults.less';
import 'side-bar/App.less';

const App = () => (
    <div className="side-bar-content">
        <Logo />
        <Search />
    </div>
);

export default App;