import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertComponent { 
  constructor(private _alert: AlertController) { }
  public Alert = {
    confirm: (msg?, title?) => {
      return new Promise((resolve, reject) => {
        let alert = this._alert.create({
          title: title || 'Confirm',
          message: msg || 'Do you want continue?',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                resolve(true);
              }
            }
          ]
        });
        alert.present();
      });

    },
    alert: (msg, title?) => {
      let alert = this._alert.create({
        title: title || 'Alert',
        subTitle: msg,
        buttons: ['Dismiss']
      });

      alert.present();
    }
  }
}