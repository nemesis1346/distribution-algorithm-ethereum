import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction-service/transaction-provider';
import { AgreementModel } from '../../models/agreementModel';


@IonicPage()
@Component({
  selector: 'page-agreement-list',
  templateUrl: 'agreement-list.html',
})
export class AgreementListPage {
  private listAgreementModel: any;
  private flagNoResults: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public transactionProvider: TransactionProvider,
    public alertController: AlertController) {
    this.listAgreementModel = [];
    this.flagNoResults = false;

  }

  ionViewDidLoad() {
    this.getAgreements();
  }
  getAgreements() {
    this.listAgreementModel = [];

    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.transactionProvider.getAgreements()
        .subscribe((resp: any) => {
          loader.dismiss();

          console.log('Track List Front End Response:');
          let result = this.parseResponse(resp);
          console.log(result);

          if (result.data) {
            let agreementArray = JSON.parse(result.data);
            console.log(agreementArray);
            if (agreementArray.length > 0) {
              agreementArray.forEach(element => {
                console.log(element);
                let currentAgreementModel = new AgreementModel(
                  element.agreementId,
                  element.traderEmiterId,
                  element.traderReceiverId,
                  element.percentage,
                  element.status,
                  element.isrc,
                  element.traderEmiterName,
                  element.traderReceiverName
                );
                this.listAgreementModel.push(currentAgreementModel);
              });
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
  alertLoginError(error: string) {
    const alert = this.alertController.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
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
  selectAgreement(agreementId) {
    console.log(agreementId)
  }
}
