import React from 'react';

import BottomActions from 'side-bar/components/BottomActions';
import Settings from 'side-bar/components/Settings';
import TopActions from 'side-bar/components/TopActions';

import 'gg-ukit/styles/fonts.less';
import 'gg-ukit/styles/defaults.less';
import 'side-bar/App.less';

const App = () => (
    <>
        <TopActions />
        <Settings />
        <BottomActions />
    </>
);

export default App;
