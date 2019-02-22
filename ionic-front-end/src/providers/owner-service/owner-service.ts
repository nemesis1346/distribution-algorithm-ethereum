import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { OwnerModel } from '../../models/ownerModel';


@Injectable()
export class OwnerServiceProvider {

  constructor(public http: Http,
    public apiProvider: ApiProvider) {
  }
  createOwner(ownerType:OwnerModel) {
    let seq = this.apiProvider.post('api/Owner', ownerType, { responseType: 'json'});
    return seq;
  }

}
