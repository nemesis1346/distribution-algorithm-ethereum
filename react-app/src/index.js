import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import LocalStorage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


//Store Configuration
const persistConfig = {
    key: 'root',
    storage: LocalStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);


ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
</Provider>, document.getElementById('root'));
