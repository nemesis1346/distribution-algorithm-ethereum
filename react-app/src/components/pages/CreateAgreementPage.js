import React from 'react';
import { connect } from 'react-redux';
import '../../styles/CreateAssetPage.css';
import '../../styles/MainPage.css';

class CreateAgreementPage extends React.Component {

    state = {
        isrc: ""
    }
    onClick = (e) => {
        e.preventDefault();
    }
    handleChange = (e) => {
        this.setState({ isrc: e.target.value });

    }
    render() {
        console.log("PROPS");
        console.log(this.props);
        const { diagramData } = this.props;
        return (
            <div className="main-container-page">
              Create Agreement page
            </div>
        );
    }
}

const mapStateToPropsCreateAgreementPage = state => {
    //In this case objects is gonna be applied to the props of the component
    return {
        diagramData: state.diagramReducer.diagramData,
    };
};


export default connect(mapStateToPropsCreateAgreementPage, null)(CreateAgreementPage);