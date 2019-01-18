import { UpdateTrackPage } from './../update-track/update-track';
import { CreateAgreementPage } from './../create-agreement/create-agreement';
import { TrackServiceProvider } from './../../providers/track-service/track-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TrackDetailPage } from '../track-detail/track-detail';
import { TrackModel } from '../../models/trackModel';
import { ManualPaymentPage } from '../manual-payment/manual-payment';

@IonicPage()
@Component({
  selector: 'page-track-list',
  templateUrl: 'track-list.html',
  providers: [TrackServiceProvider],
  entryComponents: [TrackDetailPage],
})
export class TrackListPage {
  private listTrackModelLoaded: TrackModel[];
  private role: any;
  private trackDetailPage: any;
  private listTrackModel: TrackModel[];
  private flagNoResults: boolean;
  private createAgreementPage: any;
  private traderId: any;
  private createAgreementFlag: boolean;
  private agreementTrackList: any;
  private checkedItems: boolean[];
  private updateTrackFlag: any;
  private manualPaymentFlag: boolean;
  private manualPaymentPage: any;
  private updateTrackPage: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private trackService: TrackServiceProvider,
    private loading: LoadingController,
    private alertController: AlertController,
    private storage: Storage,
  ) {
    this.updateTrackPage = UpdateTrackPage;
    this.checkedItems = [];
    this.agreementTrackList = [];
    this.storage.get('role').then((data) => {
      this.role = data;
      console.log("role: " + this.role);
    });
    if (this.navParams.get('createAgreementFlag')) {
      this.createAgreementFlag = true;
    } else {
      this.createAgreementFlag = false;
    }
    if (this.navParams.get('updateTrackFlag')) {
      this.updateTrackFlag = true;
    } else {
      this.updateTrackFlag = false;
    }
    if (this.navParams.get('manualPaymentFlag')) {
      this.manualPaymentFlag = true;
    } else {
      this.manualPaymentFlag = false;
    }
    this.storage.get('traderId').then((data) => {
      this.traderId = data;
      console.log("traderId: " + this.traderId);
    });
    console.log("Update track flag: " + this.updateTrackFlag);
    console.log("Manual Payment Flag: " + this.manualPaymentFlag);
    this.listTrackModel = [];
    this.trackDetailPage = TrackDetailPage;
    this.manualPaymentPage = ManualPaymentPage;
    this.flagNoResults = false;
    this.createAgreementPage = CreateAgreementPage;
    console.log("Track List Page create agreement role: " + this.createAgreementFlag);
  }

  ionViewDidLoad() {
    this.getTracks();
  }

  manualPayment(isrc) {
    this.navCtrl.push(this.manualPaymentPage, {
      "isrc": isrc,
      'traderId': this.traderId
    });
  }

  updateTrackRevenue() {
    if (this.agreementTrackList.length > 0) {
      this.navCtrl.push(this.updateTrackPage, {
        "trackList": JSON.stringify(this.agreementTrackList)
      });
    } else {
      this.alertLoginError('No track selected');
    }
  }

  createAgreement() {
    if (this.agreementTrackList.length > 0) {
      this.navCtrl.push(this.createAgreementPage, {
        "agreementTrackList": JSON.stringify(this.agreementTrackList)
      });
    } else {
      this.alertLoginError('No track selected');
    }
  }

  getTracks() {
    this.listTrackModelLoaded = [];

    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.trackService.getTracks(this.role)
        .subscribe((resp: any) => {
          loader.dismiss();

          console.log('Track List Front End Response:');
          let result = this.parseResponse(resp);
          console.log(result);

          if (result.data) {
            let trackArray = JSON.parse(result.data);
            console.log(trackArray);
            if (trackArray.length > 0) {
              trackArray.forEach(element => {
                console.log(element);
                let currentTrackModel = new TrackModel(
                  element.isrc,
                  element.title,
                  element.revenueTotal,
                  element.vendorIdentifier,
                  element.label,
                  element.author,
                  element.ownerType,
                  element.uploaderId
                );
                this.listTrackModelLoaded.push(currentTrackModel);
                this.listTrackModel = this.listTrackModelLoaded;
              });
              this.checkedItems = new Array(this.listTrackModel.length);
            } else {
              this.alertLoginError("No product results");
            }
          } else {
            this.alertLoginError(result.message);
          }
        }, (err: any) => {
          console.log('ERROR Track List: ');
          console.log(err);
          loader.dismiss();
          this.alertLoginError(err);
        });
    });
  }

  checkTrack(index, isrc) {
    console.log(" index: " + index + " isrc: " + isrc);
    if (this.checkedItems[index]) {
      this.agreementTrackList.push(this.listTrackModel[index]);
    } else {
      this.agreementTrackList = this.agreementTrackList.filter(item => item.isrc != isrc);
    }
    console.log(this.agreementTrackList);
  }


  selectTrack(isrc: string) {
    this.navCtrl.push(this.trackDetailPage, {
      'isrc': isrc,
      'role': this.role,
      'traderId': this.traderId,
      'manualPaymentFlag': false
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
  onInput(searchbar: any) {
    console.log(searchbar);
    this.initializeList()
    let val = searchbar.target.value;
    if (val.trim()) {
      this.listTrackModel = this.listTrackModel.filter((item) => {
        return ((item.title.toLowerCase() + ' ' + item.author.toLowerCase()).includes(val.toLowerCase().trim()));
      })
      if (this.listTrackModel.length > 0) {
        this.flagNoResults = false;
      } else {
        this.flagNoResults = true;
      }
    } else {
      this.flagNoResults = false;
    }
  }

  initializeList() {
    this.listTrackModel = this.listTrackModelLoaded;
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
