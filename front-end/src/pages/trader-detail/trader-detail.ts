import { AlertComponent } from './../../resources/alertComponent';
import { TokenAccountModel } from './../../models/tokenAccount';
import { TraderModel } from './../../models/traderModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TraderServiceProvider } from '../../providers/trader-service/trader-service';
import { TokenServiceProvider } from '../../providers/token-service/token-service';

@IonicPage()
@Component({
  selector: 'page-trader-detail',
  templateUrl: 'trader-detail.html',
})
export class TraderDetailPage {
  private traderId: string;
  private traderModel: TraderModel;
  private tokenAccountModel: TokenAccountModel;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private traderService: TraderServiceProvider,
    private tokenAccountService: TokenServiceProvider,
    private loading: LoadingController,
    private alertController: AlertController,
) {

    this.traderId = this.navParams.get('traderId');

    this.traderModel = new TraderModel(null, null, null, null, null, null);
    this.tokenAccountModel = new TokenAccountModel(null, null, null);

  }

  ionViewDidLoad() {
    this.getTrackDetail();
  }


  getTrackDetail() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.traderService.getTraderDetail(this.traderId)
        .subscribe((resp: any) => {
          let result = this.parseResponse(resp);
          let model = JSON.parse(result.data);
          console.log('Trader Detail: ')
          console.log(model);

          this.traderModel.name = model.name;
          this.traderModel.balance = model.balance;
          this.traderModel.email = model.email;
          this.traderModel.traderId = model.traderId;
          this.traderModel.traderType = model.traderType;
          this.traderModel.tokenAccountId = model.tokenAccountId;

          this.tokenAccountService.getTokenAccountDetail(this.traderModel.tokenAccountId)
            .subscribe((resp: any) => {
              loader.dismiss();

              let result = this.parseResponse(resp);
              let tokenAccount = JSON.parse(result.data);
              console.log('Token Account: ');
              console.log(tokenAccount);

              this.tokenAccountModel.tokenAccountId = tokenAccount.tokenAccountId;
              this.tokenAccountModel.balanceDisabled = tokenAccount.balanceDisabled;
              this.tokenAccountModel.balanceEnabled = tokenAccount.balanceEnabled;
            }, (err: any) => {
              loader.dismiss();
              this.alertLoginError(err);
            });

        }, (err: any) => {
          loader.dismiss();
          this.alertLoginError(err);
        });
    });
  }

  alertLoginError(error: string) {
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
