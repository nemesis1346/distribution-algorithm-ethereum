import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction-service/transaction-provider';
import { DiagramTreeLevelModel } from '../../models/diagramTreeLevelModel';
import { first } from 'rxjs/operator/first';


@IonicPage()
@Component({
  selector: 'page-flow-diagram',
  templateUrl: 'flow-diagram.html',
  // styleUrls: ['flow-diagram.scss']
})
export class FlowDiagramPage {
  private isrc: string
  options = TREE_OPTION;
  mergeData = null;
  private diagramTree = [];
  private revenueTotal: any;

  constructor(
    private transactioService: TransactionProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loading: LoadingController,

  ) {
    this.isrc = this.navParams.get('isrc');
    this.revenueTotal = "";
  }

  ionViewDidLoad() {

    // TREE_OPTION.series[0].data = [null];

    // //This is for merginng the options
    // this.mergeData = {
    //   series: TREE_OPTION.series
    // };

  }

  getDiagramData(isrc) {
    console.log(isrc);
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present().then(() => {
      this.transactioService.getTxByTrackForDiagram(this.isrc)
        .subscribe((resp) => {
          console.log(resp);
          loader.dismiss();

          let result = this.parseResponse(resp);

          if (result.data) {
            let data = JSON.parse(result.data);
            this.revenueTotal = data.trackRevenue;
            let receiptList = JSON.parse(data.receiptList);
            console.log(receiptList);

            let firstEmiterId = receiptList[0].uploaderId;
            let finalResult;

            receiptList.forEach(element => {
              if (element.traderReceiverId == data.uploaderId) {
                //We extract the Id of the first trader
                finalResult = element;
              }
            });

            let subResult = this.getNestedChildren(receiptList, firstEmiterId);
            finalResult.children = subResult;


            finalResult = JSON.stringify(finalResult).replace(/"traderReceiverName":/g, '"name":');
            finalResult = JSON.parse(finalResult);
            finalResult = JSON.stringify(finalResult).replace(/"ammount":/g, '"value":');
            finalResult = JSON.parse(finalResult);

            console.log('FINAL RESULT');
            console.log(finalResult);

            TREE_OPTION.series[0].data = [finalResult];

            //This is for merginng the options
            this.mergeData = {
              series: TREE_OPTION.series
            };
          } else {
            this.alertError(result.message);
          }
        }, (error) => {
          loader.dismiss();
          this.alertError(error);
        })
    });
  }
  getNestedChildren(arr, traderEmiterId) {
    var out = []
    for (var i in arr) {

      if (arr[i].traderEmiterId == traderEmiterId) {
        var children = this.getNestedChildren(arr, arr[i].traderReceiverId)
        if (children.length) {
          arr[i].children = children
        }
        out.push(arr[i]);
      }
    }
    return out
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

}
let TREE_OPTION = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'tree',
      name: 'tree1',
      data: [],
      top: '5%',
      left: '7%',
      bottom: '2%',
      right: '60%',

      symbolSize: 7,

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        }
      },

      leaves: {
        label: {
          normal: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        }
      },
      expandAndCollapse: false,  //This is for expanding the nodes or not
    }
  ]
};

