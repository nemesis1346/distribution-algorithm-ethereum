import { DistributionRequest } from './../../models/distributionRequest';
import { TrackListPage } from './../track-list/track-list';
import { TransactionProvider } from './../../providers/transaction-service/transaction-provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UpdateTrackRequest } from './../../models/updateTrackRequest';
import { PaymentDistRequest } from './../../models/paymentDistRequest';
import Utils from '../../resources/utils';
import { TrackServiceProvider } from '../../providers/track-service/track-service';
import { AlertComponent } from './../../resources/alertComponent';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-update-track',
  templateUrl: 'update-track.html',
  providers: [AlertComponent]

})
export class UpdateTrackPage {
  private updatedQuantity: number;
  private isrc: string;
  private traderId: any;
  private listTrackModel: any;
private trackListPage:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private trackService: TrackServiceProvider,
    private loading: LoadingController,
    private transactionService: TransactionProvider,
    private alertComponent: AlertComponent,
    private storage: Storage,
  ) {
    this.trackListPage = TrackListPage;
    this.listTrackModel = JSON.parse(this.navParams.get('trackList'));
    this.storage.get('traderId').then((data) => {
      this.traderId = data;
      console.log("traderId: " + this.traderId);
    });

  }

  ionViewDidLoad() {
  }

  /**
   * This method uses the superagent library
   */
  async updateTrackRevenue() {
    if (this.updatedQuantity && this.updatedQuantity > 0) {

      let loaderCounter = 0;
      let loader = this.loading.create({
        content: 'Loading...',
      });
      loader.present().then(async () => {
        try {
          for (const element of this.listTrackModel) {
            let updateTrackRequest = new UpdateTrackRequest(element.isrc, String(this.updatedQuantity));
            let currentUpdateTrackResult = await this.trackService.updateTrackSuperagent(updateTrackRequest);
            console.log(currentUpdateTrackResult);

            console.log('trader id before' +this.traderId);
            let distributionRequest = new DistributionRequest(element.isrc, this.traderId, String(new Date().toISOString()));
            let currentDistributionResult = await this.transactionService.distributionSuperAgent(distributionRequest);
            console.log(currentDistributionResult);

            loaderCounter++;
            if (this.listTrackModel.length == loaderCounter) {
              this.alertComponent.Alert.confirm(loaderCounter + ' Tracks Updated and/or Distributed', 'Message');
              loader.dismiss();
              this.navCtrl.push(this.trackListPage, {
                "updateTrackFlag": true
              });
          
            }
          }
        } catch (err) {
          loader.dismiss();
          console.log('ERROR');
          console.log(err);
          this.alertComponent.Alert.confirm(err, 'Error');
        }
      });
    } else {
      this.alertComponent.Alert.confirm('Insert a value higher than 0');
    }
  }

}
