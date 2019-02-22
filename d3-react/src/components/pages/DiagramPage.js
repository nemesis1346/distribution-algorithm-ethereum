import React from 'react';
import BarChart from "../charts/BarChart";
import { connect } from 'react-redux';
import { getDiagramData } from '../../actions/diagramActions';

class DiagramPage extends React.Component {

    state = {
        isrc: ""
    }
    onClick = (e) => {
        e.preventDefault();
        this.props.getDiagramData(JSON.stringify(this.state.isrc));
    }
    handleChange = (e) => {
        this.setState({ isrc: e.target.value });

    }
    render() {
        console.log("PROPS");
        console.log(this.props);
        const { diagramData } = this.props;
        return (
            <div className="App">
                <form >
                    <input type="text" name="isrc" placeholder="Track ISRC" value={this.state.isrc} onChange={this.handleChange} />
                    <button type="submit" onClick={this.onClick}>
                        Submit
                </button>
                    <BarChart diagramData={diagramData} />
                </form>
            </div>
        );
    }
}

const mapStateToPropsDiagramPage = state => {
    //In this case objects is gonna be applied to the props of the component
    return {
        diagramData: state.diagramReducer.diagramData,
    };
};


export default connect(mapStateToPropsDiagramPage, { getDiagramData })(DiagramPage);