import { AgreementModel } from './../../models/agreementModel';
import { TrackModel } from './../../models/trackModel';
import { EarnedDistTxRequest } from './../../models/earnedDistTxRequest';
import { PaymentReceiptModel } from './../../models/paymentReceiptModel';
import { AlertComponent } from './../../resources/alertComponent';
import { TrackServiceProvider } from './../../providers/track-service/track-service';
import { TransactionProvider } from './../../providers/transaction-service/transaction-provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import Utils from '../../resources/utils';
import { TokenServiceProvider } from '../../providers/token-service/token-service';
import { Storage } from '@ionic/storage';
import { ManualPaymentRequest } from '../../models/manualPaymentRequest';

@IonicPage()
@Component({
  selector: 'page-manual-payment',
  templateUrl: 'manual-payment.html',
  providers: [AlertComponent]
})
export class ManualPaymentPage {

  private trackModel: any;
  private receiptList: any;
  private tokenTotal: number;
  private isrc: string;
  private traderId: string;
  private agreementModelList: AgreementModel[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private trackService: TrackServiceProvider,
    private transactionService: TransactionProvider,
    private loading: LoadingController,
    private alertComponent: AlertComponent,
    private tokenAccountService: TokenServiceProvider,
    private storage: Storage,
  ) {
    this.agreementModelList = [];
    this.tokenTotal = 0;
    this.trackModel = new TrackModel(null, null, null, null, null, null, null, null);
    this.isrc = this.navParams.get('isrc');
    console.log('ISRC: ' + this.isrc);
    this.receiptList = [];
    this.traderId = this.navParams.get('traderId');
    console.log("TraderId: " + this.traderId);
  }

  ionViewDidLoad() {
    this.getTrackDetail();
    this.getReceipts();
    this.getAgreementsByTrack();
  }
  pay() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    let earnedDistTxRequest = new ManualPaymentRequest(this.isrc, this.traderId);

    loader.present().then(() => {
      this.transactionService.manualPayment(earnedDistTxRequest)
        .subscribe((resp: any) => {
          loader.dismiss();
          console.log(resp);
          let result = Utils.parseResponse(resp);
          if (result.data) {
            this.alertComponent.Alert.confirm('Tokens Paid', 'Message');
            this.navCtrl.pop()
          } else {
            this.alertComponent.Alert.confirm(result.message, 'Error Message');
          }
        }, (error: any) => {
          loader.dismiss();
          this.alertComponent.Alert.confirm(error);
        });
    });
  }

  getAgreementsByTrack() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.trackService.getAgreementsByTrack(this.isrc)
        .subscribe((resp: any) => {
          loader.dismiss();

          console.log('Agreements by Track Response:');
          let result = Utils.parseResponse(resp);
          console.log(result);

          let agreementArray = JSON.parse(result.data);
          console.log(agreementArray);
          if (agreementArray && agreementArray != "" && agreementArray.length > 0) {
            agreementArray.forEach(element => {
              let currentAgreement = new AgreementModel(null, null, null, null, null, null, null, null);
              currentAgreement.percentage = element.percentage;
              currentAgreement.traderEmiterId = element.traderEmiterId;
              currentAgreement.traderReceiverId = element.traderReceiverId;
              currentAgreement.agreementId = element.agreementId;
              currentAgreement.isrc = element.isrc;
              currentAgreement.status = element.status;
              currentAgreement.traderEmiterName = element.traderEmiterName;
              currentAgreement.traderReceiverName = element.traderReceiverName;

              this.agreementModelList.push(currentAgreement);
            });
          } else {
            this.alertComponent.Alert.confirm('There is no shares', 'Message');
            this.agreementModelList = [];
          }

        }, (err: any) => {
          loader.dismiss();
          this.alertComponent.Alert.confirm(err, 'Error');
        });
    });
  }

  getTrackDetail() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.trackService.getTrackDetail(this.isrc)
        .subscribe((resp: any) => {
          loader.dismiss();

          let result = Utils.parseResponse(resp);

          if (result.data) {
            let model = JSON.parse(result.data);
            console.log('Track Detail');
            console.log(model);

            this.trackModel.author = model.author;
            this.trackModel.isrc = model.isrc;
            this.trackModel.label = model.label;
            this.trackModel.ownerType = model.ownerType;
            this.trackModel.revenueTotal = model.revenueTotal.toString();
            this.trackModel.title = model.title;
            this.trackModel.vendorIdentifier = model.vendorIdentifier;
            this.trackModel.uploaderId = model.uploaderId;
          } else {
            this.alertComponent.Alert.confirm(result.message);
          }
        }, (err: any) => {
          loader.dismiss();
          this.alertComponent.Alert.confirm(err);
        });
    });
  }

  getReceipts() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    console.log("TraderId on Request: " + this.traderId);

    let earnedDistTxRequest = new EarnedDistTxRequest(this.isrc, this.traderId);
    loader.present().then(() => {
      console.log('REQUEST FRONT END');
      console.log(earnedDistTxRequest);
      this.transactionService.getEarnedDistTransactionsByTraderAndISRC(earnedDistTxRequest)
        .subscribe((resp: any) => {
          loader.dismiss();

          console.log('Receipts by Track Response:');
          let result = Utils.parseResponse(resp);
          console.log(result);

          let receiptArray = JSON.parse(result.data);
          console.log(receiptArray);
          if (receiptArray && receiptArray != "" && receiptArray.length > 0) {
            receiptArray.forEach(element => {
              let currentReceipt = new PaymentReceiptModel(null,null, null, null, null, null, null, null,null,null);
              currentReceipt.ammount = element.ammount;
              currentReceipt.traderEmiterId = element.traderEmiterId;
              currentReceipt.traderReceiverId = element.traderReceiverId;
              currentReceipt.agreementId = element.agreementId;
              currentReceipt.isrc = element.isrc;
              currentReceipt.paymentReceiptType = element.paymentReceiptType;
              currentReceipt.paymentReceiptStatus = element.paymentReceiptStatus;
              currentReceipt.traderEmiterName = element.traderEmiterName;
              currentReceipt.traderReceiverName= element.traderReceiverName;

              this.tokenTotal += parseFloat(element.ammount);
              console.log(element.ammount);
              console.log(this.tokenTotal);
              this.receiptList.push(currentReceipt);
            });
          } else {

            this.alertComponent.Alert.confirm('There is tokens available to pay', 'Message');
            this.receiptList = [];
            this.tokenTotal = 0;
          }
        }, (err: any) => {
          loader.dismiss();
          console.log(err);
          this.alertComponent.Alert.confirm(err);
        });
    });
  }

}
