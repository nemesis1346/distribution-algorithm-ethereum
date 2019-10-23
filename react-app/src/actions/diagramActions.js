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
        let receiptList = JSON.parse(parseResult.receiptList);
        let finalResult;
        let firstEmiterId = receiptList[0].uploaderId;
        console.log("FIRST EMITTER");
        console.log(firstEmiterId);
        receiptList.forEach(element => {
          if (element.traderReceiverId == firstEmiterId) {
            //We extract the Id of the first trader
            finalResult = element;
          }
        });

        let subResult = getNestedChildren(receiptList, firstEmiterId);
        finalResult.children = subResult;

        finalResult = JSON.stringify(finalResult).replace(
          /"traderReceiverName":/g,
          '"name":'
        );
        finalResult = JSON.parse(finalResult);
        finalResult = JSON.stringify(finalResult).replace(
          /"ammount":/g,
          '"value":'
        );
        finalResult = JSON.parse(finalResult);

        console.log("ACTIONS");
        console.log(finalResult);

        console.log(receiptList);
        dispatch(getDiagramDataSuccess(finalResult));
      })
      .catch(err => {
        console.log(err);
        dispatch(handleError(err.message));
      });
  };
};

const getNestedChildren = (arr, traderEmiterId) => {
  var out = [];
  for (var i in arr) {
    if (arr[i].traderEmiterId == traderEmiterId) {
      var children = getNestedChildren(arr, arr[i].traderReceiverId);
      if (children.length) {
        arr[i].children = children;
      }
      out.push(arr[i]);
    }
  }
  return out;
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
