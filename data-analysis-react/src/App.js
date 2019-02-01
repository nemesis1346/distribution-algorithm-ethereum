import React, { Component } from "react";
import * as d3 from "d3";
import Tree from "react-d3-tree";
import BarChart from "./BarChart";

class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="text" ame="isrc" placeholder="Track ISRC" />
        <button ion-button type="submit">
          Submit5
        </button>
        <BarChart />
      </div>
    );
  }
}

export default App;
