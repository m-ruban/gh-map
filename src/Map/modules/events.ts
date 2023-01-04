import CustomGameEvent from 'map/modules/CustomGameEvent';

type EventData = {
    detail: Record<string, string | boolean | number>;
};

export const dispatchCustomEvent: (eventName: CustomGameEvent, eventData?: EventData) => void = (
    eventName,
    eventData
) => {
    document.dispatchEvent(new CustomEvent(eventName, eventData));
};

export const subscribeCustomEvent: (eventName: CustomGameEvent, listener: (event: CustomEvent) => void) => void = (
    eventName,
    listener
) => {
    document.addEventListener(eventName, listener);
};
