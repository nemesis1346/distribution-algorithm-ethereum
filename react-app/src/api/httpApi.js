import axios from "axios";
import { instanceWithInterceptors } from './middlewareHandler';

//const instanceDefault = axios.create({ baseURL: "http://localhost:3011" }); // this is for firebase
//const instanceDefault = axios.create({ baseURL: "http://104.196.55.102:3011" }); 

/**
 * This File is for parsing and anything processing middleware with diferent directions
 */
export default {
  diagram: {
    getDiagramData: isrc => {
      console.log('GET DIAGRAM INFORMATION HTTP API');
      console.log(isrc);
      return instanceWithInterceptors.post("/getTxByTrackForDiagram", isrc);
    }
  },
  traders: {
    createTrader: traderData => {
      console.log('CREATE TRADER HTTP API REQUEST');
      return instanceWithInterceptors.post('/createTrader', traderData);
    }
  },
  agreements: {
    createAgreement: agreementData => {
      console.log('CREATE AGREEMENT HTTP API REQUEST');
      return instanceWithInterceptors.post('/createAgreement', agreementData);
    }
  },
  assets: {
    createAsset: assetData => {
      console.log('CREATE ASSET HTTP API REQUEST');
      return instanceWithInterceptors.post('/createAsset', assetData);
    }
  }
};
