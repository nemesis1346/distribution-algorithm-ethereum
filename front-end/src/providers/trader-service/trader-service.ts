import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TraderModel } from '../../models/traderModel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as Constants from '../../resources/constants';
const httpOtpions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable()
export class TraderServiceProvider {

  private url: string = Constants.SERVER_HOST_DEVELOPMENT;

  constructor(public httpClient: HttpClient) {

  }

  createTrader(traderModel: TraderModel) {
    let observable = this.httpClient.post(this.url + '/createTrader', traderModel, httpOtpions);
    return observable;
  }
  getTraders() {
    let observable = this.httpClient.get(this.url + '/getTraders', httpOtpions);
    return observable;
  }
  getTraderDetail(traderId) {
    let observable = this.httpClient.post(this.url + '/getTraderDetail', JSON.stringify(traderId), httpOtpions);
    return observable;
  }
  getTradersByHierarchy(userId){
    let observable = this.httpClient.post(this.url + '/getTradersByHierarchy', JSON.stringify(userId), httpOtpions);
    return observable;
  }

}
