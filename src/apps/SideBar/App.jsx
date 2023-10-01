import React from 'react';

import mobile from 'src/modules/mobile';

import ArticleView from 'side-bar/components/ArticleView';
import BottomActions from 'side-bar/components/BottomActions';
import GenreView from 'side-bar/components/GenreView';
import MobileAlert from 'side-bar/components/MobileAlert';
import TipView from 'side-bar/components/TipView';
import TopActions, { TopActionsLogo } from 'side-bar/components/TopActions';

import 'gg-ukit/styles/fonts.less';
import 'gg-ukit/styles/defaults.less';
import './App.less';

const App = () => {
    if (mobile()) {
        return (
            <>
                <TopActionsLogo />
                <MobileAlert />
            </>
        );
    }
    return (
        <>
            <TopActions />
            <BottomActions />
            <GenreView />
            <TipView />
            <ArticleView />
        </>
    );
};

export default App;
