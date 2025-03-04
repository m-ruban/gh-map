import React, { ReactElement } from 'react';

import Frame from 'side-bars/components/Frame';

import './mini-map.less';

const MiniMap = (): ReactElement => {
    return (
        <div className="mini-map-container">
            <Frame title="Mini-map" height={70}>
                <div id="mini-map" />
            </Frame>
        </div>
    );
};

export default MiniMap;
