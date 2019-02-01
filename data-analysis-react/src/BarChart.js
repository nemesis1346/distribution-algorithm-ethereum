import React, { Component } from "react";
import * as d3 from "d3";
import Tree from "react-d3-tree";

class BarChart extends Component {
    state = {
        diagramData: []
      };
      
  render() {
    console.log(this.props);
    return (
      <div id="treeWrapper" style={{ height: "600px" }}>
        {this.props.data ? <Tree data={this.props.data} /> : <div />}
      </div>
    );
  }
}

export default BarChart;
