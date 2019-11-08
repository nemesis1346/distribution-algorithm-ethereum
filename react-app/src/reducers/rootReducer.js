import { combineReducers } from 'redux';
import diagramReducer from './diagramReducer';
import appReducer from './appReducer';
import modalReducer from './modalReducer';
import createAgreementPageReducer from './createAgreementPageReducer';
import createTraderPageReducer from './createTraderPageReducer';
import createAssetPageReducer from './createAssetPageReducer';

//This is for comining all different reducers
export default combineReducers({
    diagramReducer,
    appReducer,
    modalReducer,
    createAgreementPageReducer,
    createTraderPageReducer,
    createAssetPageReducer
});