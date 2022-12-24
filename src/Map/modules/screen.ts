const EVENT_NAME = 'resolution';

export const dispatchScreenEvent: () => void = () => {
    document.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const subscribeScreenEvent: (listener: () => void) => void = (listener) => {
    document.addEventListener(EVENT_NAME, listener);
};
