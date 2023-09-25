import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import app from 'map/modules/app';
import { RESOLUTION } from 'map/modules/constants';

import SearchAdd from 'gg-ukit/components/Icon/SearchAdd';
import SearchSubtract from 'gg-ukit/components/Icon/SearchSubtract';
import SmartHome from 'gg-ukit/components/Icon/SmartHome';

import './settings.less';

const SCALE_STEP = 0.2;
const LEFT_BORDER = 2;
const RIGHT_BORDER = 3;

let resolution = RESOLUTION;

const zoomIn = () => {
    const newResolution = resolution + SCALE_STEP * -1;
    if (newResolution < LEFT_BORDER) {
        return;
    }
    zoom(newResolution);
};

const zoomOut = () => {
    const newResolution = resolution + SCALE_STEP;
    if (newResolution > RIGHT_BORDER) {
        return;
    }
    zoom(newResolution);
};

const zoom = (newResolution: number) => {
    resolution = newResolution;
    app.renderer.resize(window.innerWidth * resolution, window.innerHeight * resolution);
    dispatchCustomEvent(MapEvent.Resolution);
};

const Settings: FC = () => {
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === '-') {
                zoomOut();
            }
            if (event.key === '+') {
                zoomIn();
            }
        });
    }, []);

    return ReactDOM.createPortal(
        <div className="settings">
            <div
                className="settings-item"
                onClick={() => {
                    app.stage.x = 0;
                }}
            >
                <SmartHome color="#FFFFFF" scale={1} />
            </div>
            <div className="settings-item" onClick={zoomIn}>
                <SearchAdd color="#FFFFFF" scale={1} />
            </div>
            <div className="settings-item" onClick={zoomOut}>
                <SearchSubtract color="#FFFFFF" scale={1} />
            </div>
        </div>,
        document.body
    );
};

export default Settings;
