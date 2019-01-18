import { UserModel } from './../../models/userModel';
import { TraderModel } from './../../models/traderModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TraderServiceProvider } from '../../providers/trader-service/trader-service';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { OrganizationServiceProvider } from '../../providers/organization-service/organization-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validators';

@IonicPage()
@Component({
  selector: 'page-create-organization-account',
  templateUrl: 'create-organization-account.html',
  providers: [TraderServiceProvider, LoginServiceProvider]
})
export class CreateOrganizationAccountPage {

  private credentialsForm: FormGroup;
  private traderModel: TraderModel;
  private listTrader: TraderModel[];
  private traderId: string;
  private organizationType: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private traderService: TraderServiceProvider,
    private loading: LoadingController,
    private alertController: AlertController,
    private organizationService: OrganizationServiceProvider,
    private formBuilder: FormBuilder
  ) {
    this.listTrader = [];
    this.traderId = "";
    this.traderModel = new TraderModel(null, null, null, null, null, null);
    this.organizationType = "";
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
      ],
      password: [
        '', Validators.compose([
          Validators.pattern(regexValidators.name), //TODO: Change this when needed
          Validators.required
        ])
      ]
    });
  }

  ionViewDidLoad() {
    this.loadTraders();
  }


  submit() {
    //This to create a user that 
    if (this.credentialsForm.valid && this.traderId && this.organizationType != "") {
      let userModel = new UserModel(
        this.credentialsForm.controls['name'].value,
        this.credentialsForm.controls['email'].value,
        this.credentialsForm.controls['password'].value,
        'DISTRIBUTOR', //Check this out
        this.traderId
      );

      let loader = this.loading.create({
        content: 'Loading...',
      });
      loader.present().then(() => {
        this.organizationService.createOrganization(userModel)
          .subscribe((resp: any) => {
            loader.dismiss();

            console.log('Success');
            let result = this.parseResponse(resp);
            console.log(result);

            if (result.data) {
              this.alertSuccess('Organization Created');
            } else {
              this.alertError(result.message);
            }
          }, (err) => {
            loader.dismiss();
            this.alertError(err);

          });
      });
    } else {
      this.alertError('Some field is empty');
    }

  }

  loadTraders() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {

      this.traderService.getTraders()
        .subscribe((resp: any) => {
          loader.dismiss();

          console.log('Traders Front End Response:');
          let result = this.parseResponse(resp);
          if (result.data) {
            let traderArray = JSON.parse(result.data);
            console.log(traderArray);

            traderArray.forEach(element => {
              let currentTrader = new TraderModel(
                element.traderId,
                element.name,
                element.email,
                element.balance,
                element.traderType,
                element.tokenAccount
              );
              this.listTrader.push(currentTrader);
            });
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
      title: 'Create Trader Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  alertCreationSuccess() {
    const alert = this.alertController.create({
      title: 'Success',
      subTitle: 'Trader Created!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
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


  parseResponse(response) {
    let body = JSON.parse(response.body);

    if (body.status == '200') {
      return body.data;
    } else {
      return body.message;
    }
  }

}
