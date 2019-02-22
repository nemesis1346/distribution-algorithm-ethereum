import { UpdateTrackRequest } from './../../models/updateTrackRequest';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { TrackModel } from '../../models/trackModel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CreateAgreementRequest } from '../../models/createAgreementRequest';
import * as Constants from '../../resources/constants';
import superagent from 'superagent';
import Utils from '../../resources/utils';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable()
export class TrackServiceProvider {
  private url: string = Constants.SERVER_HOST_DEVELOPMENT;

  constructor(public http: Http,
    public httpClient: HttpClient,
   ) {
  }

  createTrack(trackModel: TrackModel) {
    let seq = this.httpClient.post(this.url + '/createTrack', trackModel, httpOptions);
    return seq;
  }

  //TODO: Verify if it needs a role
  getTracks(role: string) {
    let seq = this.httpClient.get(this.url + '/getTracks', httpOptions);
    return seq;
  }

  getTrackDetail(isrc: string) {
    let seq = this.httpClient.post(this.url + '/getTrackDetail', JSON.stringify(isrc), httpOptions);
    return seq;
  }

  createAgreement(createAgreementRequest: CreateAgreementRequest) {
    let seq = this.httpClient.post(this.url + '/createAgreement', JSON.stringify(createAgreementRequest), httpOptions);
    return seq;
  }

  getAgreementsByTrack(isrc: String) {
    let seq = this.httpClient.post(this.url + '/getAgreementsByTrack', JSON.stringify(isrc), httpOptions);
    return seq;
  }

  updateTrack(updateTrackRequest: UpdateTrackRequest) {
    let seq = this.httpClient.post(this.url + '/updateTrack', JSON.stringify(updateTrackRequest), httpOptions);
    return seq;
  }

  async updateTrackSuperagent(updateTrackRequest: UpdateTrackRequest) {
    try {
      let result;
      let data = JSON.stringify(updateTrackRequest);
      const res = await superagent
        .post(this.url + "/updateTrack")
        .set('Content-Type', 'application/json')
        .send(data);
      result = Utils.parseResponse(res.body);
      return result;
    } catch (err) {
      console.log('ERROR');
      throw new Error(err);
    }
  }

 
}
