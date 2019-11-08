import { GET_DIAGRAM_DATA_SUCCESS, ERROR_MIDDLEWARE } from "../constants/types";
import httpApi from "../api/httpApi";
import { parseResponse } from "../utils/Utils";

export const createAsset = traderModel => {
  return dispatch => {
    httpApi.assets
      .createAsset(isrc)
      .then(res => {
        dispatch(getDiagramDataSuccess(finalResult));
      })
      .catch(err => {
        console.log(err);
        dispatch(handleError(err.message));
      });
  };
};


const getDiagramDataSuccess = diagramData => {
  return {
    type: GET_DIAGRAM_DATA_SUCCESS,
    diagramData: diagramData
  };
};

const handleError = message => {
  return {
    type: ERROR_MIDDLEWARE,
    message: message
  };
};
