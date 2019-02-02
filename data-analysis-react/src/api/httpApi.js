import axios from 'axios';
import { parseResponse } from '../utils/Utils';

//TODO: Be aware where the port is going to be
//const instance = axios.create({ baseURL: 'http://35.190.131.104:8888' })
//const instance = axios.create({ baseURL: 'http://localhost:8888' }) // this is for blockchain
const instanceDefault = axios.create({ baseURL: 'http://localhost:8889' }); // this is for firebase
/**
 * This File is for parsing and anything processing middleware with diferent directions
 */
export default {
    diagram: {
        getDiagramData: isrc => instanceDefault.post('/getTxByTrackForDiagram', { isrc })
            .then((res) => {
                console.log('Response Diagram in Api Login:');
                let result = parseResponse(res);
                console.log(result);
                return result;
            }),
    }
}
