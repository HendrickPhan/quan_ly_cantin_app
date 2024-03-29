import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;