import { DataInputPage } from './../data-input/data-input';
import { HomePage } from './../home/home';
import { TraderListPage } from './../trader-list/trader-list';
import { CreateTraderPage } from './../create-trader/create-trader';
import { TrackListPage } from './../track-list/track-list';
import { TestDataPage } from './../test-data/test-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CreateOrganizationAccountPage } from '../create-organization-account/create-organization-account';
import { CreateAgreementPage } from '../create-agreement/create-agreement';
import { TraderDetailPage } from '../trader-detail/trader-detail';
import { ProfilePage } from '../profile/profile';
import { TransactionListPage } from '../transaction-list/transaction-list';
import { TraderServiceProvider } from '../../providers/trader-service/trader-service';
import { TraderModel } from '../../models/traderModel';
import { AgreementListPage } from '../agreement-list/agreement-list';
import { FlowDiagramPage } from '../flow-diagram/flow-diagram';

@IonicPage()
@Component({
  selector: 'page-menu-client',
  templateUrl: 'menu-client.html',
  entryComponents: [TestDataPage, TrackListPage, CreateTraderPage, TraderListPage]
})
export class MenuClientPage {

  private testDataPage: any;
  private trackListPage: any;
  private createTraderPage: any;
  private traderListPage: any;
  private role: any;
  private createOrganizationAccountPage: any;
  private homePage: any;
  private createAgreementPage: any;
  private traderDetailPage: any;
  private userId: any;
  private profilePage: any;
  private traderId: any;
  private createAgreementFlag: boolean;
  private transactionListPage: any;
  private dataInputPage: any;
  private traderModel: TraderModel;
  private roleFlag: boolean;
  private traderIdFlag: boolean;
  private pageLoadFlag: boolean;
  private agreementListPage: any;
  private flowDiagramPage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alertController: AlertController,
    private loading: LoadingController,
    private traderService: TraderServiceProvider,
  ) {
    this.roleFlag = false;
    this.traderIdFlag = false;
    this.pageLoadFlag = false;
    this.homePage = HomePage;
    this.storage.get('role').then((data) => {
      this.role = data;
      console.log("role: " + this.role);
      this.roleFlag = true;
      this.getDetail();
    });
    this.storage.get('userId').then((data) => {
      this.userId = data;
      console.log("userId: " + this.userId);
    });
    this.storage.get('traderId').then((data) => {
      this.traderId = data;
      console.log("traderId: " + this.traderId);
      this.traderIdFlag = true;
      this.getDetail();
    });
    this.traderModel = new TraderModel(null, null, null, null, null, null);
    this.transactionListPage = TransactionListPage;
    this.createAgreementFlag = true;
    this.testDataPage = TestDataPage;
    this.trackListPage = TrackListPage;
    this.createTraderPage = CreateTraderPage;
    this.traderListPage = TraderListPage;
    this.createOrganizationAccountPage = CreateOrganizationAccountPage;
    this.createAgreementPage = CreateAgreementPage;
    this.traderDetailPage = TraderDetailPage;
    this.profilePage = ProfilePage;
    this.dataInputPage = DataInputPage;
    this.agreementListPage = AgreementListPage;
    this.flowDiagramPage = FlowDiagramPage;
  }

  getDetail() {
    if (this.roleFlag && this.traderIdFlag && this.role != "ADMIN" && this.pageLoadFlag) {
      this.getTraderDetail();
    } else {
      this.traderModel.name = 'ADMIN';
    }
  }

  ionViewDidLoad() {
    this.pageLoadFlag = true;
    this.getDetail();
  }
  getTraderDetail() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.traderService.getTraderDetail(this.traderId)
        .subscribe((resp: any) => {
          let result = this.parseResponse(resp);
          let model = JSON.parse(result.data);
          console.log('Trader Detail: ')
          console.log(model);

          this.traderModel.name = model.name;
          this.traderModel.balance = model.balance;
          this.traderModel.email = model.email;
          this.traderModel.traderId = model.traderId;
          this.traderModel.traderType = model.traderType;
          this.traderModel.tokenAccountId = model.tokenAccountId;
          loader.dismiss();
        }, (err: any) => {
          loader.dismiss();
          this.alertLoginError(err);
        });
    });
  }

  parseResponse(response) {
    let body = JSON.parse(response.body);

    if (body.status == '200') {
      return body.data;
    } else {
      return body.message;
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
  alertLoginError(error: string) {
    const alert = this.alertController.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  manualPayment() {
    this.navCtrl.push(this.trackListPage, {
      "manualPaymentFlag": true
    });
  }
  goClientDetail() {
    this.navCtrl.push(this.profilePage, {
      "role": this.role,
      "userId": this.userId,
      "traderId": this.traderId
    });
  }
  listAgreements() {
    this.navCtrl.push(this.agreementListPage, {
      "traderId": this.traderId
    });
  }

  dataInput(role) {
    this.navCtrl.push(this.dataInputPage, {
      "isrc": role,
      "traderId": this.traderId
    });
  }

  listTracks() {
    this.navCtrl.push(this.trackListPage, {
      "role": this.role
    });
  }
  listTraders() {
    this.navCtrl.push(this.traderListPage, {
      "role": this.role
    });
  }
  listTransactions() {
    this.navCtrl.push(this.transactionListPage, {
      "traderId": this.traderId,
      "role": this.role
    });
  }
  createTrader() {
    this.navCtrl.push(this.createTraderPage, {
      "role": this.role
    });
  }
  createOrganizationAccount() {
    this.navCtrl.push(this.createOrganizationAccountPage, {
      "role": this.role
    });
  }

  createAgreement() {
    this.navCtrl.push(this.trackListPage, {
      "role": this.role,
      "traderId": this.traderId,
      "createAgreementFlag": this.createAgreementFlag
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

  logout() {
    const alert = this.alertController.create({
      title: 'Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.storage.remove('role');
            this.storage.remove('username');
            this.storage.remove('userId');
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  showDiagram() {
    this.navCtrl.push(this.flowDiagramPage, null);
  }

}
