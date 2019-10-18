import { TokenAccountModel } from './../../models/tokenAccount';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TraderServiceProvider } from '../../providers/trader-service/trader-service';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';
import { TraderModel } from '../../models/traderModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validators';

@IonicPage()
@Component({
  selector: 'page-create-trader',
  templateUrl: 'create-trader.html',
})
export class CreateTraderPage {
  private credentialsForm: FormGroup;
  private traderType: string;
  private traderHierarchy: string;
  private traderOptions: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private traderService: TraderServiceProvider,
    private loading: LoadingController,
    private storage: Storage,
    private alertController: AlertController,
    private traderProvider: TraderServiceProvider,
    private formBuilder: FormBuilder
  ) {
    this.traderOptions = [
      { traderType: "ADMIN", traderHierarchy: 1 },
      { traderType: "DISTRIBUTOR", traderHierarchy: 2 },
      { traderType: "LABEL", traderHierarchy: 3 },
      { traderType: "ARTIST", traderHierarchy: 4 }
    ];
    this.traderType = "";
    this.traderHierarchy = '';
    this.credentialsForm = this.formBuilder.group({
      name: [
        '', Validators.compose([
          Validators.pattern(regexValidators.name),
          Validators.required
        ])
      ],
      email: [
        '', Validators.compose([
          Validators.pattern(regexValidators.email),
          Validators.required
        ])
      ]
    });
  }

  ionViewDidLoad() {
  }

  getSelection(traderType) {
    let selection = this.traderOptions.filter(item => item.traderType === traderType);
    this.traderHierarchy = selection[0].traderHierarchy;
    this.traderType=selection[0].traderType;
  }

  submit() {
    console.log(this.credentialsForm.valid);
    console.log(this.traderType);
    if (this.credentialsForm.valid && this.traderType != "" && this.traderHierarchy != "") {
      let loader = this.loading.create({
        content: 'Loading...',
      });
      let tokenAccountId = UUID.UUID();
      let tokenAccount = new TokenAccountModel(
        tokenAccountId,
        "0.00",
        "0.00"
      );

      let traderId = UUID.UUID();
      let traderModel = new TraderModel(
        traderId,
        this.credentialsForm.controls['name'].value,
        this.credentialsForm.controls['email'].value,
        0.00,
        this.traderType,
        JSON.stringify(tokenAccount)
      );

      console.log("Trader Model");
      console.log(traderModel);
      loader.present().then(() => {

        this.traderService.createTrader(traderModel)
          .subscribe((resp: any) => {
            loader.dismiss();

            console.log('Success');
            let result = this.parseResponse(resp);
            console.log(result);

            if (result.data) {
              this.alertSuccess('Trader Created');
            } else {
              this.alertError(result.message);
            }
          }, (err: any) => {
            loader.dismiss();
            this.alertError(err);
          });
      });
    } else {
      this.alertError("Something is missing");

    }
  }


  alertError(error: string) {
    const alert = this.alertController.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  alertMessage(message: string) {
    const alert = this.alertController.create({
      title: 'Message',
      subTitle: message,
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

  alertSuccess(message: string) {
    const alert = this.alertController.create({
      title: 'Message',
      subTitle: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }
}
