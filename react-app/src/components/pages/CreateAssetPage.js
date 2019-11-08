import React from 'react';
import { connect } from 'react-redux';
import '../../styles/CreateAssetPage.css';
import '../../styles/MainPage.css';
import { Form, Button } from 'react-bootstrap';
import { createAsset } from '../../actions/assetActions';

class CreateAssetPage extends React.Component {

    state = {
        isrc: ""
    }
    onClick = (e) => {
        e.preventDefault();
    }
    handleChange = (e) => {
        this.setState({ isrc: e.target.value });

    }
    onSubmit = e => {
        e.preventDefault();
        const assetName = e.target.elements.assetName.value;
        const assetValue = e.target.elements.assetValue.value;

        let createAssetRequest = {
            "name": assetName,
            "value": assetValue
        }

        this.props.createAsset(createAssetRequest);
    }

    render() {
        console.log("PROPS");
        console.log(this.props);
        const { diagramData } = this.props;
        return (
            <div className="main-container-page">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="assetName">
                        <Form.Label>Asset Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Asset Name" />
                    </Form.Group>

                    <Form.Group controlId="assetValue">
                        <Form.Label>Asset Value</Form.Label>
                        <Form.Control type="number" placeholder="Enter Asset Value" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Asset
                     </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToPropsCreateAssetPage = state => {
    return {
        diagramData: state.diagramReducer.diagramData,
    };
};

const mapDispatchToPropsCreateAssetPage = {
    createAsset: createAsset,

}

export default connect(mapStateToPropsCreateAssetPage, mapDispatchToPropsCreateAssetPage)(CreateAssetPage);