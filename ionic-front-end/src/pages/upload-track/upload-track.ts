import { PaymentDistRequest } from './../../models/paymentDistRequest';
import { AlertComponent } from './../../resources/alertComponent';
import { TrackModel } from './../../models/trackModel';
import { TrackServiceProvider } from './../../providers/track-service/track-service';
import { TransactionProvider } from './../../providers/transaction-service/transaction-provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import Utils from '../../resources/utils';
import { Storage } from '@ionic/storage';
import { DistributionRequest } from '../../models/distributionRequest';

@IonicPage()
@Component({
  selector: 'page-upload-track',
  templateUrl: 'upload-track.html',
  providers: [AlertComponent]
})
export class UploadTrackPage {

  public isrc;
  public title;
  public revenueTotal;
  public vendorIdentifier;
  public label;
  public author;
  public ownerType;
  public trackShares;
  public uploaderId;

  private role: any;
  private userId: any;
  private traderId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingController,
    private storage: Storage,
    private trackService: TrackServiceProvider,
    private alertComponent: AlertComponent,
    private transactionService: TransactionProvider
  ) {
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
  }

  ionViewDidLoad() {
  }

  async saveTrack() {
    let loader = this.loading.create({
      content: 'Loading...',
    });

    let trackModel = new TrackModel(
      this.isrc,
      this.title,
      this.revenueTotal,
      this.vendorIdentifier,
      this.label,
      this.author,
      "MUSICIAN",
      this.traderId
    );

    loader.present().then(async () => {

      this.trackService.createTrack(trackModel)
        .subscribe(async (resp: any) => {

          console.log('Success');
          let result = Utils.parseResponse(resp);
          console.log(result);
          try {
            let paymentDistRequest = new DistributionRequest(this.isrc, this.traderId, String(new Date().toISOString()));
            let responseDistributionResult = await this.transactionService.distributionSuperAgent(paymentDistRequest);

            let resultDist = Utils.parseResponse(responseDistributionResult);
            if (resultDist&&resultDist.data) {
              loader.dismiss();

              this.alertComponent.Alert.confirm('Track Created and Distributed', 'Message');
              this.navCtrl.pop()
            } else {
              this.alertComponent.Alert.confirm(resultDist.message, 'Error Message');
            }
          } catch (err) {
            loader.dismiss();
            console.log('ERROR');
            console.log(err);
            this.alertComponent.Alert.confirm(err, 'Error');
          }
        }, (err: any) => {
          loader.dismiss();
          this.alertComponent.Alert.confirm(err, 'Error Message');
        });
    });
  }

}
