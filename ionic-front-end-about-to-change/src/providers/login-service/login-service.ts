import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserModel } from '../../models/userModel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as Constants from '../../resources/constants';
const httpOtpions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
//This kind of files are for the parsing of the response and control errors
@Injectable()
export class LoginServiceProvider {
  private url: string = Constants.SERVER_HOST_DEVELOPMENT;

  constructor(public http: Http,
    public httpClient: HttpClient) {

  }
 login(userModel: UserModel) {
    let observable = this.httpClient.post(this.url + '/login', JSON.stringify(userModel), httpOtpions);
    return observable;
  }

}
