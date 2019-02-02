import React, { Component } from "react";
import * as d3 from "d3";
import Tree from "react-d3-tree";

class BarChart extends Component {
    state = {
        diagramData: []
      };
      
  render() {
    console.log('PROPS BARCHART');
    console.log(this.props);
    const  {diagramData}=this.props 
    console.log();
    return (
      <div id="treeWrapper" style={{ height: "600px" }}>
        {diagramData ? <Tree data={diagramData} /> : <div />}
      </div>
    );
  }
}

export default BarChart;
