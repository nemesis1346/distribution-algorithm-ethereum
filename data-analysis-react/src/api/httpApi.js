import axios from "axios";

const instanceDefault = axios.create({ baseURL: "http://localhost:3011" }); // this is for firebase
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
