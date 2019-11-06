import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu'

class NavBar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu
      isOpen={ false }
      customBurgerIcon={false}
      customCrossIcon={ false } >
        <a id="home" className="menu-item" href="/diagramPage">Home</a>
        <a id="about" className="menu-item" href="/createAssetPage">About</a>
      </Menu>
    );
  }
}

export default NavBar;