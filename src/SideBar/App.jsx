import React from 'react';

import BottomActions from 'side-bar/components/BottomActions';
import GenreView from 'side-bar/components/GenreView';
import Settings from 'side-bar/components/Settings';
import TipView from 'side-bar/components/TipView';
import TopActions from 'side-bar/components/TopActions';

import 'gg-ukit/styles/fonts.less';
import 'gg-ukit/styles/defaults.less';
import 'side-bar/App.less';

const App = () => (
    <>
        <TopActions />
        <Settings />
        <BottomActions />
        <GenreView />
        <TipView />
    </>
);

export default App;
