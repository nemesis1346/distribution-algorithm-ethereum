import { TraderServiceProvider } from './../../providers/trader-service/trader-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TraderModel } from '../../models/traderModel';
import { Storage } from '@ionic/storage';
import { TraderDetailPage } from '../trader-detail/trader-detail';

@IonicPage()
@Component({
  selector: 'page-trader-list',
  templateUrl: 'trader-list.html',
})
export class TraderListPage {
  private listTraderModelLoaded: TraderModel[];
  private traderDetailPage: any;
  private listTraderModel: TraderModel[];
  private flagNoResults: boolean;
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private traderService: TraderServiceProvider,
    private storage: Storage,
    private alertController: AlertController,
    private loading: LoadingController) {
    this.listTraderModel = [];
    this.traderDetailPage = TraderDetailPage;
    this.flagNoResults = false;
  }

  ionViewDidLoad() {
    this.getTraders();
  }
  getTraders() {
    this.listTraderModelLoaded = [];
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.traderService.getTraders()
        .subscribe((resp: any) => {
          loader.dismiss();

          console.log('Trader List Front End Response:');
          let result = this.parseResponse(resp);
          console.log(result);

          if (result.data) {
            let traderArray = JSON.parse(result.data);
            console.log(traderArray);
            if (traderArray.length > 0) {
              traderArray.forEach(element => {
                console.log(element);
                let currentTrackModel = new TraderModel(
                  element.traderId,
                  element.name,
                  element.email,
                  element.balance,
                  element.traderType,
                  element.tokeAccountId
                );
                this.listTraderModelLoaded.push(currentTrackModel);
                this.listTraderModel = this.listTraderModelLoaded;
              });

            } else {
              this.alertLoginError("No product results");
            }
          } else {
            this.alertLoginError(result.message);
          }
        }, (err: any) => {
          loader.dismiss();
          this.alertLoginError(err);
        })
    });

  }

  selectTrader(traderId: string) {
    this.navCtrl.push(this.traderDetailPage, {
      'traderId': traderId
    });
  }
  alertLoginError(error: string) {
    const alert = this.alertController.create({
      title: 'Login Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  onInput(searchbar: any) {
    this.initializeList()
    let val = searchbar.target.value;
    if (val.trim()) {
      this.listTraderModel = this.listTraderModel.filter((item) => {
        return ((item.name.toLowerCase() + ' ' + item.name.toLowerCase()).includes(val.toLowerCase().trim()));
      })
      if (this.listTraderModel.length > 0) {
        this.flagNoResults = false;
      } else {
        this.flagNoResults = true;
      }
    } else {
      this.flagNoResults = false;
    }
  }
  initializeList() {
    this.listTraderModel = this.listTraderModelLoaded;
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
