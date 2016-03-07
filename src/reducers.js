import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  routing: (x = {}) => x,
});

export default rootReducer;
