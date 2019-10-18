import { TokenAccountModel } from './../../models/tokenAccount';
import { TraderModel } from './../../models/traderModel';
import { TraderServiceProvider } from './../../providers/trader-service/trader-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TokenServiceProvider } from '../../providers/token-service/token-service';

@IonicPage()
@Component({
  selector: 'page-agreement-detail',
  templateUrl: 'agreement-detail.html',
})
export class AgreementDetailPage {

  private traderEmiterId: string;
  private traderReceiverId: string;
  private percentageEmiter: any;
  private percentageReceiver: Number;
  private agreementId: string;
  private traderEmiter: TraderModel;
  private traderReceiver: TraderModel;
  private tokenAccountEmiter: TokenAccountModel;
  private tokenAccountReceiver: TokenAccountModel;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingController,
    private alertController: AlertController,
    private traderService: TraderServiceProvider,
    private tokenAccountService: TokenServiceProvider) {

    this.traderEmiterId = this.navParams.get('traderEmiterId');
    this.traderReceiverId = this.navParams.get('traderReceiverId');
    this.percentageEmiter = parseFloat(this.navParams.get('percentage'));
    this.percentageReceiver = 1 - this.percentageEmiter;
    this.agreementId = this.navParams.get('agreementId');

    console.log(this.traderEmiterId);

    this.traderEmiter = new TraderModel(null, null, null, null, null,null);
    this.traderReceiver = new TraderModel(null, null, null, null, null,null);
    this.tokenAccountEmiter = new TokenAccountModel(null, null, null);
    this.tokenAccountReceiver = new TokenAccountModel(null, null, null);

  }

  ionViewDidLoad() {
    this.loadDetails();

  }

  loadDetails() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {

      //First we get the info of the trader Emiter
      this.traderService.getTraderDetail(this.traderEmiterId)
        .subscribe((resp: any) => {

          console.log('Model Emiter: ');
          let result = this.parseResponse(resp);
          let modelEmiter = JSON.parse(result.data);

          console.log(modelEmiter);
          this.traderEmiter.name = modelEmiter.name;
          this.traderEmiter.balance = modelEmiter.balance;
          this.traderEmiter.email = modelEmiter.email;
          this.traderEmiter.traderId = modelEmiter.traderId;
          this.traderEmiter.traderType = modelEmiter.traderType;
          this.traderEmiter.tokenAccountId = modelEmiter.tokenAccountId;

          this.tokenAccountService.getTokenAccountDetail(this.traderEmiter.tokenAccountId)
            .subscribe((resp: any) => {

              console.log('Emiter Token Account: ');
              let result = this.parseResponse(resp);
              let tokenAccountEmiter = JSON.parse(result.data);

              console.log(tokenAccountEmiter);
              this.tokenAccountEmiter.tokenAccountId = tokenAccountEmiter.tokenAccountId;
              this.tokenAccountEmiter.balanceDisabled = tokenAccountEmiter.balanceDisabled;
              this.tokenAccountEmiter.balanceEnabled = tokenAccountEmiter.balanceEnabled;

              //Now we get the info of the traderReceiver
              this.traderService.getTraderDetail(this.traderReceiverId)

                .subscribe((resp: any) => {
                  
                  console.log('Model Receiver: ');
                  let result = this.parseResponse(resp);
                  let modelReceiver = JSON.parse(result.data);

                  console.log(modelReceiver);
                  this.traderReceiver.name = modelReceiver.name;
                  this.traderReceiver.balance = modelReceiver.balance;
                  this.traderReceiver.email = modelReceiver.email;
                  this.traderReceiver.traderId = modelReceiver.traderId;
                  this.traderReceiver.traderType = modelReceiver.traderType;
                  this.traderReceiver.tokenAccountId = modelReceiver.tokenAccountId;

                  this.tokenAccountService.getTokenAccountDetail(this.traderReceiver.tokenAccountId)
                    .subscribe((resp: any) => {

                      console.log('Receiver Token Account: ');
                      let result = this.parseResponse(resp);
                      let tokenAccountReceiver = JSON.parse(result.data);

                      console.log(tokenAccountReceiver);
                      this.tokenAccountReceiver.tokenAccountId = tokenAccountReceiver.tokenAccountId;
                      this.tokenAccountReceiver.balanceDisabled = tokenAccountReceiver.balanceDisabled;
                      this.tokenAccountReceiver.balanceEnabled = tokenAccountReceiver.balanceEnabled;

                      loader.dismiss();
                    }, (err: any) => {
                      loader.dismiss();
                      this.alertError(err);
                    });
                });
            }, (err: any) => {
              loader.dismiss();
              this.alertError(err);
            });
        }, (err: any) => {
          loader.dismiss();
          this.alertError(err);
        });
    });
  }

  alertError(error: string) {
    const alert = this.alertController.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  parseResponse(response) {
    let body = JSON.parse(response.body);

    if (body.status == '200') {
      return body.data;
    } else {
      return body.message;
    }
  }

}