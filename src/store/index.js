import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import homeReducer from './home/reducer';
import playerReducer from './player/reducer';
import searchReducer from './search/reducer';

const reducers = combineReducers({
  homeReducer,
  playerReducer,
  searchReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
