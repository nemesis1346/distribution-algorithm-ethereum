import { combineReducers } from 'redux';
import diagramReducer from './diagramReducer';
import appReducer from './appReducer';
import modalReducer from './modalReducer';
//This is for comining all different reducers
export default combineReducers({
    diagramReducer,
    appReducer,
    modalReducer
});