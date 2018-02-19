import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from 'app/reducers';
import { ActionMiddleware } from 'app/reducers/middleware';

const middlewares = [thunk, ActionMiddleware];
if (__DEV__) middlewares.push(createLogger({ logger: console }));

const store = createStore(
    reducers,
    applyMiddleware(...middlewares),
);

export default store;
