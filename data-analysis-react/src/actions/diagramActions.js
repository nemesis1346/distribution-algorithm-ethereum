import {
    GET_DIAGRAM_DATA_SUCCESS,
    ERROR_MIDDLEWARE,
  } from "../constants/types";
  import httpApi from "../api/httpApi";
  
  export const getDiagramData = isrc => {
    return dispatch => {
      httpApi.diagram
        .getDiagramData(isrc)
        .then(res => {
          console.log(res);
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
  