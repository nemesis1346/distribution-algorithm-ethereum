import { CREATE_ASSET_SUCCESS } from "../constants/actions";
import {ERROR_MIDDLEWARE} from '../constants/errors';
import httpApi from "../api/httpApi";
import { parseResponse } from "../utils/Utils";

export const createAsset = assetData => {
  console.log('REQUEST CREATE ASSET ACTIONS');

  return dispatch => {
    httpApi.assets
      .createAsset(assetData)
      .then(res => {
      //  dispatch(getDiagramDataSuccess(finalResult));
      })
      .catch(err => {
        console.log(err);
        dispatch(handleError(err.message));
      });
  };
};


const createAssetSuccess = () => {
  return {
    type: CREATE_ASSET_SUCCESS,
  };
};

const handleError = message => {
  return {
    type: ERROR_MIDDLEWARE,
    message: message
  };
};
