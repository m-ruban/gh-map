import { configureStore } from '@reduxjs/toolkit';

import { reducers } from 'src/models/reducers';

const createStore = () => {
    return configureStore({
        reducer: reducers,
    });
};

let store;

if (!store) {
    store = createStore();
}

export default store;
