import React from 'react';

import mobile from 'src/modules/mobile';

import ArticleView from 'side-bars/components/ArticleView';
import BottomActions from 'side-bars/components/BottomActions';
import MapContainer from 'side-bars/components/MapContainer';
import MiniMap from 'side-bars/components/MiniMap';
import MobileAlert from 'side-bars/components/MobileAlert';
import TopActions, { TopActionsLogo } from 'side-bars/components/TopActions';

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
        <div className="history-map">
            <div className="left-side-bar">
                <TopActions />
                <BottomActions />
            </div>
            <div className="map-container">
                <MapContainer />
            </div>
            <div className="right-side-bar">
                <MiniMap />
                <ArticleView />
            </div>
        </div>
    );
};

export default App;
