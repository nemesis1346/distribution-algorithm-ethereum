import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu'

class NavBar extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    render() {
        console.log('NAV BAR PROPS');
        console.log(this.props);
        const {
            isOpen
        } = this.props;
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu
                isOpen={isOpen}
                customBurgerIcon={false}
                customCrossIcon={false} >
                <a id="home" className="menu-item" href="/diagramPage">Home</a>
                <a id="about" className="menu-item" href="/createAssetPage">About</a>
            </Menu>
        );
    }
}

export default NavBar;