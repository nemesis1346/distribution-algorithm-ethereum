import { DistributionRequest } from './../../models/distributionRequest';
import { GetTxByStatusTypeTraderRequest } from './../../models/getTxByStatusTypeTraderRequest';
import { EarnedDistTxRequest } from './../../models/earnedDistTxRequest';
import { ManualPaymentRequest } from './../../models/manualPaymentRequest';
import { WithdrawRequest } from './../../models/withdrawRequest';
import { PaymentDistRequest } from './../../models/paymentDistRequest';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from '../../resources/constants';
import { Http } from '@angular/http';
import superagent from 'superagent';
import Utils from '../../resources/utils';
import { WithdrawalByTraderRequest } from '../../models/withdrawalByTraderRequest';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable()
export class TransactionProvider {

  private url: string = Constants.SERVER_HOST_DEVELOPMENT;

  constructor(public httpClient: HttpClient) {
  }

  withdrawalByTrader(withdrawalByTraderRequest:WithdrawalByTraderRequest){
    let observable = this.httpClient.post(this.url + '/withdrawalByTrader', JSON.stringify(withdrawalByTraderRequest), httpOptions);
    return observable;
  }

  getTxByReceiverForBalance(traderId:string){
    let observable = this.httpClient.post(this.url + '/getTxByReceiverForBalance', JSON.stringify(traderId), httpOptions);
    return observable;
  }

  getTxByEmiterForBalance(traderId:string){
    let observable = this.httpClient.post(this.url + '/getTxByEmiterForBalance', JSON.stringify(traderId), httpOptions);
    return observable;
  }

  automaticPaymentDistribution(paymentDistModel: PaymentDistRequest) {
    let observable = this.httpClient.post(this.url + '/paymentDistributionAutomatic', JSON.stringify(paymentDistModel), httpOptions);
    return observable;
  }
  removeAgreement(agreementId) {
    let observable = this.httpClient.post(this.url + '/removeAgreement', JSON.stringify(agreementId), httpOptions);
    return observable;
  }
  withdraw(withdrawRequest: WithdrawRequest) {
    let observable = this.httpClient.post(this.url + '/withdraw', JSON.stringify(withdrawRequest), httpOptions);
    return observable;
  }
  getTranscationByTrader(request) {
    let observable = this.httpClient.post(this.url + '/getTransactionsByTrader', JSON.stringify(request), httpOptions);
    return observable;
  }
  manualPayment(manualPaymentRequest: ManualPaymentRequest) {
    let observable = this.httpClient.post(this.url + '/manualPayment', JSON.stringify(manualPaymentRequest), httpOptions);
    return observable;
  }
  getEarnedDistTransactionsByTraderAndISRC(earnedDistTxRequest: EarnedDistTxRequest) {
    let observable = this.httpClient.post(this.url + '/getEarnedDistTransactionsByTraderAndISRC', JSON.stringify(earnedDistTxRequest), httpOptions);
    return observable;
  }
  async distributionSuperAgent(distributionRequest:DistributionRequest){
    try {
      let result;
      let data = JSON.stringify(distributionRequest);
      const res = await superagent
        .post(this.url + "/distributionAlgorithm")
        .set('Content-Type', 'application/json')
        .send(data);
      result = Utils.parseResponse(res.body);
      return result;
    } catch (err) {
      console.log('ERROR');
      console.log(err);
    }
  }

  getTxByStatusTypeTrader(getTxByStatusTypeTraderRequest:GetTxByStatusTypeTraderRequest){
    let observable = this.httpClient.post(this.url + '/getTxByStatusTypeTrader', JSON.stringify(getTxByStatusTypeTraderRequest), httpOptions);
    return observable;
  }
  getTransactions(){
    let observable = this.httpClient.post(this.url + '/getTransactions', null, httpOptions);
    return observable;
  }
  getAgreements(){
    let observable = this.httpClient.post(this.url + '/getAgreements', null, httpOptions);
    return observable;
  }
  getTxByTrackForDiagram(isrc){
    let observable = this.httpClient.post(this.url+'/getTxByTrackForDiagram',JSON.stringify(isrc), httpOptions);
    return observable;
  }
}
