import { AlertComponent } from './../../resources/alertComponent';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserModel } from '../../models/userModel';
import { LoadingController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Storage } from '@ionic/storage';
import { MenuClientPage } from '../menu-client/menu-client';
import { SignupPage } from '../signup/signup';
import { OrganizationServiceProvider } from '../../providers/organization-service/organization-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AlertComponent]
})
export class HomePage {
  private menuClientPage: any;
  private userModel: UserModel;
  private signupPage: any;
  private listUser: any;
  private usernameSelected:any;
  //For selection
  private username: any;
  private password: any;
  constructor(private navCtrl: NavController,
    private loginService: LoginServiceProvider,
    private organizationService: OrganizationServiceProvider,
    private loading: LoadingController,
    private alertController: AlertController,
    private storage: Storage,
    private alertComponent: AlertComponent) {

    this.listUser = [];
    this.signupPage = SignupPage;
    this.menuClientPage = MenuClientPage;
    this.userModel = new UserModel(null, null, null, null, null);
  }

  ionViewCanEnter(){
    this.listUser = [];
    this.loadUsers();

  }
  ionViewDidLoad() { 

  }

  search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  }

  selectUser() {
    console.log('getting here ');
    console.log(this.usernameSelected);

    let userSelected = this.search(this.usernameSelected, this.listUser);
    this.password = userSelected.pwd;
    this.login(this.usernameSelected, this.password);
  }

  loadUsers() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.organizationService.getOrganizations()
        .subscribe((resp: any) => {
          loader.dismiss();

          console.log('users response: ');

          let result = this.parseResponse(resp);
          console.log(result);
          if (result.data) {
            let usersArray = JSON.parse(result.data);
            usersArray.forEach(element => {
              console.log(element);
              let currentUserModel = new UserModel(
                element.name,
                element.email,
                element.pwd,
                element.organizationType,
                element.traderId
              );
              this.listUser.push(currentUserModel);
            });
          } else {
            this.alertLoginError("No users");
          }

        }, (err: any) => {
          console.log('ERROR Login: ');
          console.log(err);
          loader.dismiss();
          this.alertLoginError(err);
        });
    });
  }


  login(email: string, password: string) {

    if (email && email != "" && password && password != "") {
      let loader = this.loading.create({
        content: 'Loading...',
      });

      this.userModel.email = email;
      this.userModel.pwd = password;

      loader.present().then(() => {
        this.loginService.login(this.userModel)
          .subscribe((resp: any) => {
            loader.dismiss();

            console.log('Login response: ');

            let result = this.parseResponse(resp);

            if (result.data) {
              let user = JSON.parse(result.data);
              console.log(user);

              this.storage.clear();
              //Set user information in all Application
              this.storage.set('role', user.organizationType);
              this.storage.set('userId', user.email);
              this.storage.set('traderId', user.traderId);

              this.navCtrl.push(this.menuClientPage, {
                'role': user.organizationType,
                'userId': user.email,
                'traderId': user.traderId
              });
            } else {
              this.alertLoginError(result.message);
            }
          }, (err: any) => {
            console.log('ERROR Login: ');
            console.log(err);
            loader.dismiss();
            this.alertLoginError(err);
          });
      });
    } else {
      //TODO: Make callback for the alert 
        this.alertComponent.Alert.confirm("User or password not submitted",'Error').then();
      //this.alertLoginError("User or password not submitted");
    }
  }

  alertLoginError(error: string) {
    const alert = this.alertController.create({
      title: 'Login Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  signup() {
    this.navCtrl.push(this.signupPage, {
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

}
