import React from 'react';
import BarChart from "../charts/BarChart";
import { connect } from 'react-redux';
import { getDiagramData } from '../../actions/diagramActions';

class DiagramPage extends React.Component {
    state = {

    }
    render() {
        return (
            <div className="App">
                <input type="text" name="isrc" placeholder="Track ISRC" />
                <button ion-button type="submit">
                    Submit5
        </button>
                <BarChart />
            </div>
        );
    }
}

export default connect(null, { getDiagramData })(DiagramPage);