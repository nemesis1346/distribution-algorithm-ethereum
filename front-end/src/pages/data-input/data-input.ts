import { UploadTrackPage } from './../upload-track/upload-track';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrackListPage } from '../track-list/track-list';

@IonicPage()
@Component({
  selector: 'page-data-input',
  templateUrl: 'data-input.html',
})
export class DataInputPage {

  private uploadTrackPage: any;
  private trackListPage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    this.uploadTrackPage = UploadTrackPage;
    this.trackListPage = TrackListPage;
  }

  ionViewDidLoad() {
  }
  updateTrackRevenue() {
    this.navCtrl.push(this.trackListPage, {
      "updateTrackFlag": true
    });

  }
  uploadNewTrack() {
    this.navCtrl.push(this.uploadTrackPage, {
      
    });
  }
}
