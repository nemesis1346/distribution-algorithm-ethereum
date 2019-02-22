import { TokenAccountModel } from './../../models/tokenAccount';
import { UserModel } from './../../models/userModel';
import { TraderModel } from './../../models/traderModel';
import { MenuClientPage } from './../menu-client/menu-client';
import { OrganizationServiceProvider } from './../../providers/organization-service/organization-service';
import { TraderServiceProvider } from './../../providers/trader-service/trader-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { UUID } from 'angular2-uuid';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validators';
import { TokenServiceProvider } from '../../providers/token-service/token-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private menuClientPage: any;
  private traderType: string;
  public credentialsForm: FormGroup;
  public traderOptions: any;
  private traderHierarchy: string;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private traderService: TraderServiceProvider,
    private organizationServiceProvider: OrganizationServiceProvider,
    private tokenAccountService: TokenServiceProvider,
    private alertController: AlertController,
    private loading: LoadingController,
    private storage: Storage,
    private formBuilder: FormBuilder
  ) {

    this.traderOptions = [
      { traderType: "DISTRIBUTOR", traderHierarchy: 2 },
      { traderType: "LABEL", traderHierarchy: 3 },
      { traderType: "ARTIST", traderHierarchy: 4 }
    ];

    //TODO: change the validators with regex
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
          Validators.pattern(regexValidators.name), //TODO: Change to password when needed
          Validators.required
        ])
      ]
    });
    this.traderType = "";
    this.menuClientPage = MenuClientPage;
  }

  getSelection(traderType) {
    let selection = this.traderOptions.filter(item => item.traderType === traderType);
    this.traderHierarchy = selection[0].traderHierarchy;
    this.traderType=selection[0].traderType;
    console.log(this.traderHierarchy);
    console.log(this.traderType);
  }

  ionViewDidLoad() {
  }

  alertError(error: string) {
    const alert = this.alertController.create({
      title: 'Login Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  submit() {
    if (this.credentialsForm.valid && this.traderType != "" && this.traderHierarchy!="") {
      let loader = this.loading.create({
        content: 'Loading...',
      });
      let tokenAccountId = UUID.UUID();//The object is going to be created in the chaincode 

      let traderId = UUID.UUID();
      let traderModel = new TraderModel(
        traderId,
        this.credentialsForm.controls['name'].value,
        this.credentialsForm.controls['email'].value,
        0.00,
        this.traderType,
        tokenAccountId
      );
      console.log("Trader Model");
      console.log(traderModel);
      loader.present().then(() => {

        this.traderService.createTrader(traderModel)
          .subscribe((resp: any) => {
            console.log('Trader Creation response: ');
            let resultTrader = this.parseResponse(resp);
            console.log(resultTrader);

            if (resultTrader.data) {
              this.tokenAccountService.createNewTokenAccount(tokenAccountId)
                .subscribe((resp: any) => {
                  console.log('Token Created response: ');
                  let resultToken = this.parseResponse(resp);
                  console.log(resultToken);
                  if (resultToken.data) {

                    let organizationModel = new UserModel(
                      this.credentialsForm.controls['name'].value,
                      this.credentialsForm.controls['email'].value,
                      this.credentialsForm.controls['password'].value,
                      this.traderType,
                      traderId);
                    // console.log(organizationModel);
                    this.organizationServiceProvider.createOrganization(organizationModel)
                      .subscribe((resp: any) => {
                        loader.dismiss();
                        console.log('Organization Created: ');
                        let resultOrganization = this.parseResponse(resp);
                        console.log(resultOrganization);
                        if (resultOrganization.data) {
                          //Set user information in all Application
                          this.storage.set('role: ', resultOrganization.data.organizationType);
                          this.storage.set('username: ', resultOrganization.data.email);
                          this.storage.set('userId: ', traderId)
                          this.navCtrl.pop();
                          // this.navCtrl.push(this.menuClientPage, {
                          //   'role': resultOrganization.data.organizationType,
                          //   'userId': traderId
                          // });
                        } else {
                          this.alertError(resultOrganization.message);
                        }
                      }, (err: any) => {
                        loader.dismiss();
                        console.log('ERROR Create Organization');
                        this.alertError(this.parseError(err));
                      });
                  } else {
                    this.alertError(resultToken.message);
                  }
                }, (err: any) => {
                  loader.dismiss();
                  console.log('ERROR Create Token');
                  this.alertError(this.parseError(err));
                });

            } else {
              this.alertError(resultTrader.message);
            }

          }, (err: any) => {
            loader.dismiss();
            console.log('ERROR Create Trader');
            this.alertError(this.parseError(err));
          });
      });
    } else {
      this.alertError("Something is missing");
    }
  }

  parseResponse(response) {

    let body = JSON.parse(response.body);

    if (body.status == '200') {
      return body.data;
    } else {
      return body.message;
    }
  }

  parseError(error) {
    let body = JSON.parse(error.error.body);
    return body.message;
  }
}

