import React from 'react';
import BarChart from "../charts/BarChart";
import { connect } from 'react-redux';
import { getDiagramData } from '../../actions/diagramActions';

class DiagramPage extends React.Component {

    state = {

    }
    componentWillMount() {
        //Here we can call to the props
        this.props.getDiagramData(JSON.stringify('example1'));
      }
    render() {
        return (
            <div className="App">
                <input type="text" name="isrc" placeholder="Track ISRC" />
                <button type="submit">
                    Submit5
        </button>
                <BarChart />
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