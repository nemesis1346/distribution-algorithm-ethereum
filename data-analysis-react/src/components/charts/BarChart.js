import React, { Component } from "react";
import Tree from "react-d3-tree";
import '../../styles/BarChart.css'
import 'react-tree-graph/dist/style.css'

class BarChart extends Component {
  state = {
    diagramData: []
  };

  render() {
    console.log("PROPS BARCHART");
    const { diagramData } = this.props;
    console.log(diagramData);
    if (diagramData.hasOwnProperty('name')) {
      console.log('NOT EMPTY');
      console.log(diagramData);
    }

    return (
      <div >
        {diagramData.hasOwnProperty('name') > 0 ? <Tree data={diagramData} height={800}
          width={1000}
          svgProps={{
            transform: 'rotate(90)'
          }}/>: null}
      </div>
    );
  }
}

export default BarChart;
