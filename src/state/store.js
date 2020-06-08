import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import homeReducer from './reducers/home';
import playerReducer from './reducers/player';

const reducers = combineReducers({
    homeReducer,
    playerReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;