import React, { Component } from 'react';
import * as d3 from "d3";

const TREE_OPTION = {
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


class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="text" ame="isrc" placeholder="Track ISRC"></input>
        <button ion-button type="submit" >Update</button>
        <div echarts style="height: 600px;"></div>
      </div>
    );
  }
}

export default App;
