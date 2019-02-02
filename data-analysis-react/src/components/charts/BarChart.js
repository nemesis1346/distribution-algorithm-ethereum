import React, { Component } from "react";
import * as d3 from "d3";
import Tree from "react-d3-tree";

class BarChart extends Component {
  state = {
    diagramData: []
  };

  render() {
    console.log("PROPS BARCHART");
    console.log(this.props);
    const { diagramData } = this.props;
    if(diagramData.length > 0){
      console.log('empty');
    }
    return (
      <div id="treeWrapper" style={{ height: "600px", width: "600px" }}>
        {diagramData.length > 0 ? <Tree data={diagramData}></Tree> :null}
      </div>
    );
  }
}

export default BarChart;
