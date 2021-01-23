//importovanje svih reducers i njihovo "kombinovanje"
import logReducer from './isLog';
import categoryRed from './categoryRed';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    logReducer,
    categoryRed
});

export default allReducers;