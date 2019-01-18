import { GetTxByStatusTypeTraderRequest } from './../../models/getTxByStatusTypeTraderRequest';
import { TraderModel } from './../../models/traderModel';
import { TraderServiceProvider } from './../../providers/trader-service/trader-service';
import { AlertComponent } from './../../resources/alertComponent';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction-service/transaction-provider';
import Utils from '../../resources/utils';
import { PaymentReceiptModel } from '../../models/paymentReceiptModel';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html',
  providers: [AlertComponent]
})
export class TransactionListPage {
  private traderId: any;
  private transactionList: any;
  private listTransactionModel: any;
  private listTransactionModelLoaded: any;
  private paymentReceiptStatus: any;
  private traderReceiverId: any;
  private traderEmiterId: any;
  private listTraderEmiter: any;
  private listTraderReceiver: any;
  private type: any;
  private role: any;
  private tokenTotal: number;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private loading: LoadingController,
    private alertController: AlertController,
    private transactioService: TransactionProvider,
    private storage: Storage,
    private alertComponent: AlertComponent,
    private traderService: TraderServiceProvider) {

    this.tokenTotal = 0;
    this.storage.get('role').then((data) => {
      this.role = data;
      console.log("role: " + this.role);
    });
    this.type = "";
    this.traderReceiverId = "";
    this.traderEmiterId = "";
    this.paymentReceiptStatus = "";
    this.listTraderReceiver = [];
    this.listTraderEmiter = [];
    this.listTransactionModel = [];
    this.listTransactionModelLoaded = [];
    this.transactionList = [];
    this.storage.get('traderId').then((data) => {
      this.traderId = data;
      this.getTransactions();
      console.log("traderId: " + this.traderId);
    });

  }

  ionViewDidLoad() {
    this.loadTraders();
  }

  loadTraders() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      let promise;

      console.log(this.role);
      // if (this.role === 'ADMIN') {
     // promise = this.traderService.getTraders();
      // } else {
      //   promise = this.traderService.getTradersByHierarchy(this.traderId);
      // }

      this.traderService.getTraders().subscribe((resp: any) => {
        loader.dismiss();

        console.log('Traders Front End Response:');
        let result = Utils.parseResponse(resp);
        if (result.data) {
          let traderArray = JSON.parse(result.data);
          console.log(traderArray);

          if (traderArray.length > 0) {
            traderArray.forEach(element => {
              let currentTrader = new TraderModel(
                element.traderId,
                element.name,
                element.email,
                element.balance,
                element.traderType,
                element.tokenAccountId
              );
              this.listTraderReceiver.push(currentTrader);
              this.listTraderEmiter.push(currentTrader);
            });
            //CUSTOM trader lists depending with the role
            if (this.role != "ADMIN") {
              this.listTraderReceiver = this.listTraderReceiver.filter(item => item.traderId !== this.traderId);
              this.listTraderEmiter = this.listTraderEmiter.filter(item => item.traderId !== this.traderId);
              console.log(this.listTraderReceiver);
            } else {
              this.listTraderReceiver = this.listTraderReceiver;
              this.listTraderEmiter = this.listTraderEmiter;
              this.listTraderReceiver.push(new TraderModel('none', 'none', 'none', 0, 'none', 'none'));
              this.listTraderEmiter.push(new TraderModel('none', 'none', 'none', 0, 'none', 'none'));
              console.log('LIST TRADERS RECEIVER');
              console.log(this.listTraderReceiver);
            }
          } else {
            this.alertError("There is no traders");
          }
        } else {
          this.alertComponent.Alert.confirm(result.message, "Message");
        }
      }, (err: any) => {
        loader.dismiss();
        this.alertError(err.error);
      });
    });
  }

  getTransactions() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      let promise;

      console.log(this.role);
      if (this.role === 'ADMIN') {
        console.log('THIS PROMISE');
        promise = this.transactioService.getTransactions();
      } else {
        var getTranscationByTraderRequest = {
          "traderId": this.traderId
        }
        promise = this.transactioService.getTranscationByTrader(getTranscationByTraderRequest);
      }
      promise.subscribe((resp: any) => {
        loader.dismiss();

        console.log('Transaction List Front End Response:');
        let result = Utils.parseResponse(resp);
        console.log(result);

        if (result.data) {
          let transactionArray = JSON.parse(result.data);
          console.log(transactionArray);
          if (transactionArray.length > 0) {
            transactionArray.forEach(element => {
              console.log(element);
              let currentTrackModel = new PaymentReceiptModel(
                element.paymentReceiptId,
                element.isrc,
                element.ammount,
                element.traderEmiterId,
                element.traderReceiverId,
                element.paymentReceiptType,
                element.agreementId,
                element.paymentReceiptStatus,
                element.traderEmiterName,
                element.traderReceiverName
              );
              //We calculate the total tokens
              if(element.paymentReceiptStatus=="EARNED"){
                this.tokenTotal += Number(element.ammount);
              }
              this.listTransactionModelLoaded.push(currentTrackModel);
            });
            this.listTransactionModel = this.listTransactionModelLoaded;
          } else {
            this.alertError("No Transactions results");
          }
        } else {
          this.alertError(result.message);
        }
      }, (err: any) => {
        console.log('ERROR Track List: ');
        console.log(err);
        loader.dismiss();
        this.alertError(err);
      });
    });
  }
  filter() {
    if (this.paymentReceiptStatus != "" && this.traderReceiverId != "" && this.type != "" && this.traderEmiterId != "") {
      this.tokenTotal = 0;
      let loader = this.loading.create({
        content: 'Loading...',
      });
      loader.present().then(() => {
        let getTxByStatusTypeTrader = new GetTxByStatusTypeTraderRequest(this.traderEmiterId, this.traderReceiverId, this.paymentReceiptStatus, this.type);
        this.transactioService.getTxByStatusTypeTrader(getTxByStatusTypeTrader)
          .subscribe((resp: any) => {
            loader.dismiss();
            console.log('Transaction List Front End Response:');
            let result = Utils.parseResponse(resp);
            console.log(result);
            this.listTransactionModel = [];
            this.listTransactionModelLoaded = [];
            if (result.data) {
              let transactionArray = JSON.parse(result.data);
              console.log(transactionArray);
              if (transactionArray.length > 0) {
                transactionArray.forEach(element => {
                  console.log(element);
                  let currentTrackModel = new PaymentReceiptModel(
                    element.paymentReceiptId,
                    element.isrc,
                    element.ammount,
                    element.traderEmiterId,
                    element.traderReceiverId,
                    element.paymentReceiptType,
                    element.agreementId,
                    element.paymentReceiptStatus,
                    element.traderEmiterName,
                    element.traderReceiverName
                  );
                  //We calculate the total tokens
                  this.tokenTotal += Number(element.ammount);
                  this.listTransactionModelLoaded.push(currentTrackModel);
                });
                this.listTransactionModel = this.listTransactionModelLoaded;
              } else {
                this.alertError("No Transactions results");
              }
            } else {
              this.alertError(result.message);
            }
          }, (error) => {
            this.alertError(error);
            loader.dismiss();

          });
      });

    } else {
      this.alertComponent.Alert.confirm("Some fields are missing", "Message");
    }
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


  alertError(error: string) {
    const alert = this.alertController.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
