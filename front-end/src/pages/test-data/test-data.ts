import { TransactionProvider } from './../../providers/transaction-service/transaction-provider';
import { TraderModel } from './../../models/traderModel';
import { TraderServiceProvider } from './../../providers/trader-service/trader-service';
import { TrackServiceProvider } from './../../providers/track-service/track-service';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AppleTrackData } from "../../data/appleData"
import { AppleDistributorData } from '../../data/appleData';
import { OwnerServiceProvider } from '../../providers/owner-service/owner-service';
import { TrackModel } from '../../models/trackModel';
import { UUID } from 'angular2-uuid';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { TokenAccountModel } from '../../models/tokenAccount';
import { PaymentDistRequest } from '../../models/paymentDistRequest';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-test-data',
  templateUrl: 'test-data.html',
  providers: [ApiProvider, OwnerServiceProvider, TrackServiceProvider, TraderServiceProvider, LoginServiceProvider],
})
export class TestDataPage {
  private role: string;
  private traderId: string;
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private alertController: AlertController,
    private trackService: TrackServiceProvider,
    private loading: LoadingController,
    private traderService: TraderServiceProvider,
    private transactionService: TransactionProvider,
    private storage: Storage) {

    this.storage.get('role').then((data) => {
      this.role = data;
    });
    this.storage.get('traderId').then((data) => {
      this.traderId = data;
    });
  }

  ionViewDidLoad() {
  }

  updateTrackRevenue() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    //TODO: load a track to distribute automatically
    console.log('ready to upload track for automatic distribution');
    console.log('uploaderId: ' + this.traderId);

    let paymentDistModel = new PaymentDistRequest('0123456789', this.traderId);

    loader.present().then(() => {
      this.transactionService.automaticPaymentDistribution(paymentDistModel)
        .subscribe((resp: any) => {
          loader.dismiss();

          console.log('Upload and Distribution Response:');
          console.log(resp);
          let result = this.parseResponse(resp);
          if (result && result.data) {
            console.log(result);

            this.alertSuccess(result.data, 'OK', null);
          } else {
            this.alertError(result.message);
          }
        }, (err: any) => {
          loader.dismiss();
          this.alertError(err.error);
        });
    });
  }


  uploadNewTrack() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    let counter = 0
    loader.present().then(() => {
      let tokenId = UUID.UUID();
      let tokenAccount = new TokenAccountModel(
        tokenId,
        "0.00",
        "0.00"
      );
      let uuid = UUID.UUID();//This is the identifier of the company

      //First we create the Trader from the json file
      let traderModel = new TraderModel(
        uuid,
        AppleDistributorData.origin,
        "email",
        0.00,
        "DISTRIBUTOR",
        JSON.stringify(tokenAccount)
      );
      console.log(traderModel);
      this.traderService.createTrader(traderModel)
        .subscribe((resp: any) => {
          console.log(resp);
          AppleTrackData.forEach((element: any) => {
            if (counter < 2) {
              //We save the artists first
              var currentTrack = new TrackModel(
                element.isrc,
                element.item_title,
                parseFloat(element.royaltyTotal),
                "random",
                "random",
                element.item_artist,
                'COMPOSER',
                "org.membran.hyperstate.Trader#" + uuid
              );
              console.log(currentTrack);
              this.trackService.createTrack(currentTrack)
                .subscribe((res) => {
                  console.log(res);
                }, (err: any) => {
                  console.log(err);
                });
              counter++;
            }
          });
          loader.dismiss();
        }, (err: any) => {
          loader.dismiss();
          this.alertError(err);
        });
    }, (err: any) => {
      loader.dismiss();
      this.alertError(err);
    });
  }


  alertError(error: string) {
    const alert = this.alertController.create({
      title: 'Error',
      subTitle: error,
      buttons: [{
        text: 'Dismiss',
        role: "Dismiss"
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

  alertSuccess(message: string, messageButton: string, callback) {
    const alert = this.alertController.create({
      title: 'Message',
      subTitle: message,
      buttons: [{
        text: messageButton,
        handler: () => {
          if(callback){
            callback();
          }
        }
      }]
    });
    alert.present();
  }



}
