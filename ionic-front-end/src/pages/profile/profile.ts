import { TokenAccountModel } from '../../models/tokenAccount';
import { TraderModel } from '../../models/traderModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TraderServiceProvider } from '../../providers/trader-service/trader-service';
import { TokenServiceProvider } from '../../providers/token-service/token-service';
import { Storage } from '@ionic/storage';
import { TransactionProvider } from '../../providers/transaction-service/transaction-provider';
import { WithdrawRequest } from '../../models/withdrawRequest';
import { WithdrawalByTraderRequest } from '../../models/withdrawalByTraderRequest';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private traderId: string;
  private role: string;
  private userId: string;
  private traderModel: TraderModel;
  private tokenAccountModel: TokenAccountModel;
  private withdrawRequest: WithdrawRequest;
  private earnedListTx: any;
  private debtListTx: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private traderService: TraderServiceProvider,
    private tokenAccountService: TokenServiceProvider,
    private loading: LoadingController,
    private alertController: AlertController,
    private transactionProvider: TransactionProvider,
    private storage: Storage) {

    this.debtListTx = [];
    this.earnedListTx = [];
    this.storage.get('traderId').then((data) => {
      this.traderId = data;
    });
    this.storage.get('role').then((data) => {
      this.role = data;
    });
    this.storage.get('userId').then((data) => {
      this.userId = data;
      console.log("userId: " + this.userId);
      if (this.traderId && this.traderId != "") {
        this.getTraderDetail();
      } else {
        this.alertLoginError("User " + this.userId + " doesnt have a trader associated");
      }
    });
    this.withdrawRequest = new WithdrawRequest(null, null, null);
    this.traderModel = new TraderModel(null, null, null, null, null, null);
    this.tokenAccountModel = new TokenAccountModel(null, null, null);
    console.log('Trader Detail');
    console.log(this.traderId);
  }
  ionViewDidLoad() {
  }

  detailEarnedTx(earnedTx) {
    console.log(earnedTx);

  }
  detailDebtTx(debtTx){
console.log(debtTx);
  }
  withdrawalByTraderEranedTx(earnedTx) {
    console.log(earnedTx);

    let withdrawalByTraderRequest = new WithdrawalByTraderRequest(null, null, null);
    withdrawalByTraderRequest.oweTotal = earnedTx.total;
    withdrawalByTraderRequest.traderId = this.traderId;
    withdrawalByTraderRequest.txList = earnedTx.txList;

    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.transactionProvider.withdrawalByTrader(withdrawalByTraderRequest)
        .subscribe((resp: any) => {
          let result = this.parseResponse(resp);
          loader.dismiss();
          console.log(result);
          this.getTraderDetail();
        }, (err: any) => {
          loader.dismiss();
          this.alertLoginError(err);
        });
    });
  }

  getTraderDetail() {
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

          this.traderModel = new TraderModel(null, null, null, null, null, null);

          this.traderModel.name = model.name;
          this.traderModel.balance = model.balance;
          this.traderModel.email = model.email;
          this.traderModel.traderId = model.traderId;
          this.traderModel.traderType = model.traderType;
          this.traderModel.tokenAccountId = model.tokenAccountId;

          this.tokenAccountService.getTokenAccountDetail(this.traderModel.tokenAccountId)
            .subscribe((resp: any) => {

              let result = this.parseResponse(resp);
              let tokenAccount = JSON.parse(result.data);
              console.log('Token Account: ');
              console.log(tokenAccount);

              this.tokenAccountModel.tokenAccountId = tokenAccount.tokenAccountId;
              this.tokenAccountModel.balanceDisabled = tokenAccount.balanceDisabled;
              this.tokenAccountModel.balanceEnabled = tokenAccount.balanceEnabled;

              this.transactionProvider.getTxByReceiverForBalance(this.traderId)
                .subscribe((resp: any) => {
                  let result = this.parseResponse(resp);
                  this.earnedListTx = JSON.parse(result.data);
                  console.log(this.earnedListTx);
                  if (this.earnedListTx && this.earnedListTx.length > 0) {
                    this.earnedListTx.forEach(element => {
                      let currentTxListByTraderEarned = JSON.parse(element.txList);
                      console.log(currentTxListByTraderEarned);
                    });
                  }
                  this.transactionProvider.getTxByEmiterForBalance(this.traderId)
                    .subscribe((resp: any) => {
                      loader.dismiss();
                      let result = this.parseResponse(resp);
                      this.debtListTx = JSON.parse(result.data);
                      console.log(this.debtListTx);
                      if (this.debtListTx && this.debtListTx.length > 0) {
                        this.debtListTx.forEach(element => {
                          let currentTxListByTraderDebt = JSON.parse(element.txList);
                          console.log(currentTxListByTraderDebt);
                        });
                      }
                    }, (err: any) => {
                      loader.dismiss();
                      this.alertLoginError(err);
                    });

                }, (err: any) => {
                  loader.dismiss();
                  this.alertLoginError(err);
                });

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

  withdraw() {
    let loader = this.loading.create({
      content: 'Loading...',
    });

    this.withdrawRequest.traderId = this.traderId;
    this.withdrawRequest.tokenAccountId = this.tokenAccountModel.tokenAccountId;
    this.withdrawRequest.ammount = this.tokenAccountModel.balanceEnabled;

    loader.present().then(() => {
      this.transactionProvider.withdraw(this.withdrawRequest)
        .subscribe((resp: any) => {
          loader.dismiss();
          let result = this.parseResponse(resp);
          console.log('Withdraw resdponse: ');
          console.log(result);

          this.alertMessage(result.message, 'OK', () => {
            this.getTraderDetail();
          });
        }, (error: any) => {
          loader.dismiss();
          this.alertLoginError(error);
        });
    });
  }
  alertMessage(message: string, messageButton: string, callback) {
    const alert = this.alertController.create({
      title: 'Message',
      subTitle: message,
      buttons: [{
        text: messageButton,
        handler: () => {
          callback();
        }
      }]
    });
    alert.present();
  }


  alertLoginError(error: string) {
    const alert = this.alertController.create({
      title: 'Message',
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
