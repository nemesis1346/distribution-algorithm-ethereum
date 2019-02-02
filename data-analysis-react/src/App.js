import React, { Component } from "react";
import { BrowserRouter,Route } from 'react-router-dom';
import DiagramPage from '../src/components/pages/DiagramPage';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={DiagramPage}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


 