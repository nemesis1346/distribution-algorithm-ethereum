import axios from "axios";

//const instanceDefault = axios.create({ baseURL: "http://localhost:3011" }); // this is for firebase
const instanceDefault = axios.create({ baseURL: "http://104.196.55.102:3011" }); 

/**
 * This File is for parsing and anything processing middleware with diferent directions
 */
export default {
  diagram: {
    getDiagramData: isrc => {
      console.log(isrc);
      let headers = { "Content-Type": "application/json" };
      return instanceDefault.post("/getTxByTrackForDiagram", isrc, headers);
    }
  }
};
