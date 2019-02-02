import { GET_DIAGRAM_DATA_SUCCESS, ERROR_MIDDLEWARE } from "../constants/types";
import httpApi from "../api/httpApi";
import { parseResponse } from "../utils/Utils";

export const getDiagramData = isrc => {
  return dispatch => {
    httpApi.diagram
      .getDiagramData(isrc)
      .then(res => {
        let result = parseResponse(res.data.body);
        let parseResult = JSON.parse(result.data);
        let receiptList =JSON.parse(parseResult.receiptList);
        let finalResult;
        let firstEmiterId = receiptList[0].uploaderId;

        receiptList.forEach(element => {
          if (element.traderReceiverId == firstEmiterId) {
            //We extract the Id of the first trader
            finalResult = element;
          }
        });

        let subResult = this.getNestedChildren(receiptList, firstEmiterId);
        finalResult.children = subResult;


        finalResult = JSON.stringify(finalResult).replace(/"traderReceiverName":/g, '"name":');
        finalResult = JSON.parse(finalResult);
        finalResult = JSON.stringify(finalResult).replace(/"ammount":/g, '"value":');
        finalResult = JSON.parse(finalResult);

        console.log('ACTIONS');
        console.log(finalResult);

         console.log(receiptList);
        dispatch(getDiagramDataSuccess(receiptList));
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
