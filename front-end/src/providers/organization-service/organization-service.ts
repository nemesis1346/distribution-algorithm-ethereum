import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserModel } from '../../models/userModel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as Constants from '../../resources/constants';
const httpOtpions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
@Injectable()
export class OrganizationServiceProvider {
  private url: string = Constants.SERVER_HOST_DEVELOPMENT;

  constructor(public http: Http,
    public httpClient: HttpClient) {
  }

  createOrganization(userModel:UserModel){
    let seq = this.httpClient.post(this.url+'/createOrganization', JSON.stringify(userModel), httpOtpions);
    return seq;
  }

  getOrganizations(){
    let seq= this.httpClient.get(this.url+'/getOrganizations',httpOtpions);
    return seq;
  }

}
