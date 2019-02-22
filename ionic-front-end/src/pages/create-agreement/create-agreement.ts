import { TraderModel } from './../../models/traderModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TraderServiceProvider } from '../../providers/trader-service/trader-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgreemPartModel } from '../../models/agreemPartModel';
import { CreateAgreementRequest } from '../../models/createAgreementRequest';
import { UUID } from 'angular2-uuid';
import { TrackServiceProvider } from '../../providers/track-service/track-service';
import { Storage } from '@ionic/storage';
import Async from 'async';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-create-agreement',
  templateUrl: 'create-agreement.html',
})
export class CreateAgreementPage {

  private listTrader: TraderModel[];
  private listTraderReceiver: TraderModel[];
  private isrc: string;
  private role: string;
  private traderId: any;//This is the user account
  private traderEmiter: any;
  private traderReceiver: any;
  private traderEmiterId: string;
  private traderReceiverId: string;
  private emiterPercentage: string;
  private receiverPercentage: number;
  private userId: any;
  private selectionEnabled: boolean;
  private listTrackModel: any;
  private observableList: any;
  private agreementRequestList: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private loading: LoadingController,
    private alertController: AlertController,
    private traderService: TraderServiceProvider,
    private trackService: TrackServiceProvider,
    private storage: Storage
  ) {
    this.observableList = [];
    this.agreementRequestList = [];
    this.selectionEnabled = false;
    this.listTrader = [];
    //Variables of User
    this.storage.get('role').then((data) => {
      this.role = data;
      console.log("role: " + this.role);
    });
    this.userId = this.storage.get('userId').then((data) => {
      this.userId = data;
      console.log("userId: " + this.userId);
    });
    this.traderId = this.storage.get('traderId').then((data) => {
      this.traderId = data;
      console.log("traderId: " + this.traderId);
    });

    this.isrc = this.navParams.get('isrc');
    this.traderEmiterId = "";
    this.traderReceiverId = "";
    this.emiterPercentage = "";
    this.receiverPercentage = 0;
    this.traderEmiter = new TraderModel(null, null, null, null, null, null);
    this.traderReceiver = new TraderModel(null, null, null, null, null, null);

    this.listTrackModel = JSON.parse(this.navParams.get('agreementTrackList'));
    console.log("TRACK LIST: ");
    console.log(this.listTrackModel);

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
      promise = this.traderService.getTraders();
      // } else {
      this.selectionEnabled = true;
      this.traderEmiterId = this.traderId; //this is the user Id
      console.log('Selection Enabled: ' + this.selectionEnabled);

      //promise = this.traderService.getTradersByHierarchy(this.traderId);
      //}

      promise.subscribe((resp: any) => {
        loader.dismiss();

        console.log('Traders Front End Response:');
        let result = this.parseResponse(resp);
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
              this.listTrader.push(currentTrader);
            });
            //CUSTOM trader lists depending with the role
            if (this.role != "ADMIN") {
              this.listTraderReceiver = this.listTrader.filter(item => item.traderId !== this.traderId);
              console.log(this.listTraderReceiver);
            } else {
              this.listTraderReceiver = this.listTrader;
              console.log('LIST TRADERS RECEIVER');
              console.log(this.listTraderReceiver);
            }
          } else {
            this.alertError("There is no traders");
          }
        } else {
          this.alertMessage(result.message);
        }
      }, (err: any) => {
        loader.dismiss();
        this.alertError(err.error);
      });
    });
  }
  alertError(error: string) {
    const alert = this.alertController.create({
      title: 'Login Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  async getTraderFromId(traderId) {
    let result;
    for (const element of this.listTrader) {
      //this.listTrader.forEach(element => {
      if (String(element.traderId) == String(traderId)) {
        console.log('BINGO');
        result = element;
      }
    }
    return result;
  }

  async createAgreement() {
    if (this.receiverPercentage <= 1 && this.receiverPercentage >= 0 && this.traderReceiverId != "") {
      try {
        let loader = this.loading.create({
          content: 'Loading...',
        });
        loader.present().then(() => {

          var itemsProcessed = 0;

          this.listTrackModel.forEach(async element => {

            let transactionId = UUID.UUID();
            let emiterId = this.traderEmiterId;

            this.traderEmiter = await this.getTraderFromId(this.traderEmiterId);
            console.log('EMITER HIERARCHY');
            console.log(this.traderEmiter);
            let receiverId = this.traderReceiverId;
            this.traderReceiver = await this.getTraderFromId(this.traderReceiverId);

            let percentage = this.receiverPercentage;  //This is the percentage that the logic is asking, is the receiver percentage, the emiter percentage is calculated automaticaly
            let agreementRequest = new CreateAgreementRequest(null, null, null, null, null, null, null, null,null);

            agreementRequest.agreementId = transactionId;
            agreementRequest.traderEmiterId = emiterId;
            agreementRequest.traderReceiverId = receiverId;
            agreementRequest.percentage = String(percentage);
            agreementRequest.isrc = element.isrc;
            agreementRequest.status = 'PENDING';
            agreementRequest.traderEmiterName = this.traderEmiter.name;
            agreementRequest.traderReceiverName = this.traderReceiver.name;
            agreementRequest.datetime=String(new Date());
            console.log('Current Agreement Request');
            console.log(agreementRequest);

            //TODO: Improve this part for proper handling of observables
            this.trackService.createAgreement(agreementRequest)
              .subscribe((resp: any) => {
                itemsProcessed++;
                console.log(resp);
                if (itemsProcessed == this.listTrackModel.length) {
                  loader.dismiss();
                  console.log('Traders Front End Response:');
                  let result = this.parseResponse(resp);
                  if (result.data) {
                    this.alertSuccess('Agreements Created ');
                  }else{
                    this.alertSuccess(result.message);
                  }
                }
              }, (err: any) => {
                loader.dismiss();
                this.alertError(err);
              });
          });
        });

      } catch (error) {
        this.alertError(error);
      }
    } else {
      this.alertMessage('Percentage must be between 0 and 1 and receiver must be selected');
    }
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  alertMessage(message: string) {
    const alert = this.alertController.create({
      title: 'Message',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  alertSuccess(message: string) {
    const alert = this.alertController.create({
      title: 'Message',
      subTitle: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop()
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
}

