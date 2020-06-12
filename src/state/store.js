import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import homeReducer from './reducers/home';
import playerReducer from './reducers/player';
import searchReducer from './reducers/search';

const reducers = combineReducers({
  homeReducer,
  playerReducer,
  searchReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
