import { configureStore } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { reducers, RootStore } from 'src/models/reducers';

const createStore = () => {
    return configureStore({
        reducer: reducers,
    });
};

let store: ReturnType<typeof configureStore<RootStore>>;

if (!store) {
    store = createStore();
}

export default store;
