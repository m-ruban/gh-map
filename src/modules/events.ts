import { ReactNode } from 'react';

import MapEvent from 'src/modules/MapEvent';

type EventData = {
    detail: Record<string, string | boolean | number | ReactNode | unknown>;
};

export const dispatchCustomEvent: (eventName: MapEvent, eventData?: EventData) => void = (eventName, eventData) => {
    document.dispatchEvent(new CustomEvent(eventName, eventData));
};

export const subscribeCustomEvent: (eventName: MapEvent, listener: (event: CustomEvent) => void) => void = (
    eventName,
    listener
) => {
    document.addEventListener(eventName, listener);
};
