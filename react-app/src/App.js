import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import DiagramPage from '../src/components/pages/DiagramPage';
import GenericModal from './components/modals/GenericModal';
import NavBar from './components/navigation/NavBar';
import CreateAssetPage from "./components/pages/CreateAssetPage";
import { HamburgerButton } from 'react-hamburger-button';
import {
  toggleHamburgerMenu,
  closeHamburgerMenu,
  handleStateChangeHamburgerBurger
} from './actions/appActions';
import { connect } from "react-redux";


class App extends Component {

  constructor(props) {
    super(props)

    this.handleStateChange = this.handleStateChange.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange(state) {
    this.props.handleStateChangeHamburgerBurger();
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.props.closeHamburgerMenu();
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.props.toggleHamburgerMenu();
  }


  render() {
    const {
      modalTitle,
      modalDescription,
      modalShow,
      modalNegativeButton,
      modalPositiveButton,
      menuOpen
    } = this.props;
    return (
      <div>
        <BrowserRouter>
          <div>

            <div>
              <NavBar
                onLogoutNavBarCallback={this.onLogoutNavBarCallback}
                isOpen={menuOpen}></NavBar>

              <HamburgerButton
                open={menuOpen}
                onClick={this.toggleMenu}
                width={18}
                height={15}
                strokeWidth={1}
                animationDuration={0.5}
              />
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
              <Route path="/diagramPage" exact component={DiagramPage}></Route>
              <Route path="/createAssetPage" exact component={CreateAssetPage}></Route>

            </main>
          </div>

        </BrowserRouter>
      </div>

    );
  }
}


//these are props
const mapStateToPropsApp = state => {
  return {
    menuOpen: state.appReducer.menuOpen,
  };
};

//these are actions
const mapDispatchToPropsApp = {
  toggleHamburgerMenu: toggleHamburgerMenu,
}

export default connect(
  mapStateToPropsApp,
  mapDispatchToPropsApp
)(App);


