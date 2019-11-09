import axios from 'axios';
import { store } from '../index';
import { parseResponse } from '../utils/Utils'; //must be changed
//import {saveTokenObject, logout} from '../actions/authActions'; 
import * as CONFIG from '../constants/config';

//INSTANCE OF AXIOS 
export const instanceWithInterceptors = axios.create({ baseURL: CONFIG.DEV_URL }); 

instanceWithInterceptors.defaults.headers.common.Accept = 'application/json';
instanceWithInterceptors.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instanceWithInterceptors.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instanceWithInterceptors.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
instanceWithInterceptors.defaults.params = {};

//LISTEN FOR THE TOKEN HERE and ERRORS if you like
instanceWithInterceptors.interceptors.response.use(
    (response) => {
        console.log('RESPONSE IN INTERCEPTORS');
        console.log(response);
        let result = parseResponse(response);
        console.log('RESPONSE AFTER PARSING');
        console.log(result);

        // if (result.tokenObject != null && result.tokenObject != "") {
        //     console.log('NEW TOKENS IN INTERCEPTORS');
        //     console.log(result.tokenObject);
        //     //store.dispatch(saveTokenObject(result.tokenObject));
        // }
        //return result;
    },
    (error) => {
        let state = store.getState();

        console.log('ERRORS IN RESPONSE USING INTERCEPTORS IN LOGIN');
       console.log(error);
        // store.dispatch(logout(state.userReducer.userSession));

        return Promise.reject(error);
    });


//ADD TOKENS FOR ALL REQUESTS here
instanceWithInterceptors.interceptors.request.use(function (config) {
    console.log('USING REQUEST INTERCEPTOR');
    let state = store.getState();
    console.log('TOKEN OBJECT');
   // console.log(state.userReducer.tokenObject);
    
    // if (state.userReducer.tokenObject != null&&
    //     state.userReducer.tokenObject != "") {
    //     console.log('Need authorization');
    //     let access_token = state.userReducer.tokenObject.access_token;
    //     let refresh_token = state.userReducer.tokenObject.refresh_token;
    //     config.headers.Authorization = 'Bearer ' + access_token;
    //     // config.params = {
    //     //     refresh_token: refresh_token, //be careful with this. THIS IS THE IDEAL BUT FOR THE MOMENT IS NOT NECESARY
    //     //     client_id: CONFIG.CLIENT_ID,
    //     //     client_secret: CONFIG.CLIENT_SECRET,
    //     // }
    //     console.log(JSON.stringify(config));
    // }
    return config;
}, function (err) {
    return Promise.reject(err);
});