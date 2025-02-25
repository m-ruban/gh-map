import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from 'src/models/reducers';
import Direction from 'src/modules/Direction';
import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import Frame from 'side-bars/components/Frame';
import Loader from 'side-bars/components/Loader';

import './map-container.less';

const LeftArrowIcon = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 9L15 0.339745L15 17.6603L0 9Z" fill="#404A53" />
        </svg>
    );
};

const RightArrowIcon = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#404A53" />
        </svg>
    );
};

const MapContainer = (): ReactElement => {
    const genreTitle = useSelector((state: RootStore) => state.genre?.short_name);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const handleLoadedMap = () => {
            setLoading(false);
            document.removeEventListener(MapEvent.MapLoaded, handleLoadedMap);
        };
        document.addEventListener(MapEvent.MapLoaded, handleLoadedMap);
        import('src/apps/Map');
    }, []);

    return (
        <Frame
            title={loading ? 'Loading...' : genreTitle || 'Game History Map'}
            secondaryAction={
                <button
                    className="map-button"
                    type="button"
                    onClick={() => {
                        const event = { detail: { direction: Direction.Left } };
                        dispatchCustomEvent(MapEvent.MoveMapByArrow, event);
                    }}
                >
                    <LeftArrowIcon />
                </button>
            }
            primaryAction={
                <button
                    className="map-button"
                    type="button"
                    onClick={() => {
                        const event = { detail: { direction: Direction.Right } };
                        dispatchCustomEvent(MapEvent.MoveMapByArrow, event);
                    }}
                >
                    <RightArrowIcon />
                </button>
            }
        >
            {loading && (
                <div className="loader-container">
                    <Loader />
                </div>
            )}
            <div id="map" />
        </Frame>
    );
};

export default MapContainer;
