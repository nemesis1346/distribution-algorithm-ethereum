import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import DiagramPage from '../src/components/pages/DiagramPage';
import GenericModal from './components/modals/GenericModal';
import NavBar from './components/navigation/NavBar';

class App extends Component {
  render() {
    const {
      modalTitle,
      modalDescription,
      modalShow,
      modalNegativeButton,
      modalPositiveButton
    } = this.props;
    return (
      <div>
        <BrowserRouter>
          <div>

            <div>
              <NavBar onLogoutNavBarCallback={this.onLogoutNavBarCallback}></NavBar>
            </div>

            <div>
              <GenericModal
                modalTitle={modalTitle}
                modalDescription={modalDescription}
                modalShow={modalShow}
                modalNegativeButton={modalNegativeButton}
                modalPositiveButton={modalPositiveButton}
                modalNegativeButtonCallback={this.onLogoutNegativeModal}
                modalPositiveButtonCallback={this.onLogoutPositiveModal}
                modalOnHideCallback={this.modalOnHide}
              >
              </GenericModal>
            </div>


            <main>
              <Route path="/" exact component={DiagramPage}></Route>  
            </main>
          </div>

        </BrowserRouter>
      </div>

    );
  }
}

export default App;


