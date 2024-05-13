import reducer from './reducer';
import {combineReducers} from 'redux';
const reducers = combineReducers({
    themeReducer: reducer
});
export default reducers;