import { AlertComponent } from './../../resources/alertComponent';
import { TransactionProvider } from './../../providers/transaction-service/transaction-provider';
import { TrackModel } from './../../models/trackModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TrackServiceProvider } from '../../providers/track-service/track-service';
import { AgreementModel } from '../../models/agreementModel';
import { AgreementDetailPage } from '../agreement-detail/agreement-detail';
import { FlowDiagramPage } from '../flow-diagram/flow-diagram';
import { Storage } from '@ionic/storage';
import Utils from '../../resources/utils';

@IonicPage()
@Component({
  selector: 'page-track-detail',
  templateUrl: 'track-detail.html',
  providers: [TrackServiceProvider, AlertComponent]
})
export class TrackDetailPage {
  private isrc: string;
  private trackModel: TrackModel;
  private agreementModelList: AgreementModel[];
  private agreementDetailPage: any;
  private manualPaymentFlag: boolean;
  private traderId: any;
  private flowDiagramPage: any;
  
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private trackService: TrackServiceProvider,
    private loading: LoadingController,
    private alertController: AlertController,
    private transactionService: TransactionProvider,
    private alertComponent: AlertComponent,
    private storage: Storage) {

    this.storage.get('traderId').then((data) => {
      this.traderId = data;
      console.log("traderId: " + this.traderId);
    });
    this.isrc = this.navParams.get('isrc');
    this.trackModel = new TrackModel(null, null, null, null, null, null, null, null);
    this.agreementModelList = [];
    this.agreementDetailPage = AgreementDetailPage;
     this.flowDiagramPage = FlowDiagramPage;
    //this.flowDiagramPage = DiagramPage;


    //TODO: Check if i m gonna need to see each trader name in the interface
    if (this.navParams.get('manualPaymentFlag')) {
      this.manualPaymentFlag = true;
    } else {
      this.manualPaymentFlag = false;
    }
    console.log("manualPaymentFlag: " + this.manualPaymentFlag);
  }

  ionViewDidLoad() {
    this.getTrackDetail();
  }
  showDiagram(){
    this.navCtrl.push(this.flowDiagramPage,{
      "isrc":this.isrc
    });
  }

  getTrackDetail() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.trackService.getTrackDetail(this.isrc)
        .subscribe((resp: any) => {
          let result = this.parseResponse(resp);

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

            this.trackService.getAgreementsByTrack(this.isrc)
              .subscribe((resp: any) => {
                loader.dismiss();

                console.log('Agreements by Track Response:');
                let result = this.parseResponse(resp);
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
                  this.alertMessage('There is no shares', 'ok', null);
                  this.agreementModelList = [];
                }

              }, (err: any) => {
                loader.dismiss();
                this.alertError(err);
              });
          } else {
            this.alertError(result.message);
          }
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

  //this is the structure for a simple alert
  alertMessage(message: string, buttonText: string, callback) {
    const alert = this.alertController.create({
      title: 'Message',
      subTitle: message,
      buttons: [{
        text: buttonText,
        role: buttonText,
        handler: () => {
          if (callback && callback != "") {
            callback();
          }
        }
      }]
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
  selectAgreement(agreementId, emiterId, receiverId, percentage, emiterName, receiverName) {
    this.navCtrl.push(this.agreementDetailPage, {
      'agreementId': agreementId,
      'traderEmiterId': emiterId,
      'traderReceiverId': receiverId,
      'percentage': percentage,
      'traderEmiterName': emiterName,
      'traderReceiverName': receiverName
    });
  }

  removeAgreement(agreementId) {
    console.log(agreementId);
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.transactionService.removeAgreement(agreementId)
        .subscribe((resp: any) => {
          console.log('Remove agreement response: ');

          let result = this.parseResponse(resp);
          console.log(result);
          loader.dismiss();

          this.alertMessage('Agreement removed', "OK", () => {
            this.agreementModelList = [];
            this.getTrackDetail();
          })
        }, (error: any) => {
          loader.dismiss();
          this.alertError(error);
        });
    });
  }


}
