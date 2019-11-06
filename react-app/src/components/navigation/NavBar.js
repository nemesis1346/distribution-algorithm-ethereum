import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu';
import '../../styles/NavBar.css';
import { closeHamburgerMenu } from '../../actions/appActions';
import { withRouter } from "react-router";

class NavBar extends React.Component {

    constructor(props) {
        super(props)

        this.onMenuStateCheck = this.onMenuStateCheck.bind(this);
        this.onCloseMenu = this.onCloseMenu.bind(this);
    }

    showSettings(event) {
        event.preventDefault();
    }

    onMenuStateCheck() {
        console.log('ON CHECK');
        console.log(this.props.isOpen);
        if (this.props.isOpen === false) {
            //not yet
        }
    }

    onCloseMenu(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.props.closeMenuCallback();
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
            >
                <a onClick={this.onCloseMenu} id="home" className="menu-item" href="/diagramPage">Distribution</a>
                <a onClick={this.onCloseMenu} id="about" className="menu-item" href="/createAssetPage">Create Asset</a>
                <a onClick={this.onCloseMenu} id="about" className="menu-item" href="/createTraderPage">Create Trader</a>
                <a onClick={this.onCloseMenu} id="about" className="menu-item" href="/createAgreementPage">Create Agreement</a>


            </Menu>
        );
    }
}

export default withRouter(NavBar);