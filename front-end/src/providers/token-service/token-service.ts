import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TokenAccountModel } from '../../models/tokenAccount';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as Constants from '../../resources/constants';

const httpOtpions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
@Injectable()
export class TokenServiceProvider {
  private url: string = Constants.SERVER_HOST_DEVELOPMENT;

  constructor(public http: Http,
    public httpClient: HttpClient) {
  }

  parseResponse(res) {
    let result;
    if (res.status = '200') {
      result = res.body;
    }
    result = res.body;
    console.log(result);

    return result;
  }

  createNewTokenAccount(tokenAccountId: string) {
    let observable = this.httpClient.post(this.url + '/createNewTokenAccount', JSON.stringify(tokenAccountId), { responseType: 'json' });
    return observable;
  }

  getTokenAccountDetail(tokenAccountId: string) {
    let seq = this.httpClient.post(this.url + '/getTokenAccountDetail', JSON.stringify(tokenAccountId), { responseType: 'json' });
    return seq;
  }
}
