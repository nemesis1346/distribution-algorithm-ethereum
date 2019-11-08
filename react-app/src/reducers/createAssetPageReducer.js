import { GET_DIAGRAM_DATA_SUCCESS, ERROR_MIDDLEWARE } from '../constants/types';
//This is for comining all different reducers
const initState = {
    diagramData: []
}

const createAssetPageReducer = (state = initState, action = {}) => {

    switch (action.type) {
        case GET_DIAGRAM_DATA_SUCCESS:
            return {
                ...state,
                diagramData: action.diagramData
            }
        default:
            return state;
    }
}

export default createAssetPageReducer;