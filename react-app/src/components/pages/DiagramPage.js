import React from 'react';
import BarChart from "../charts/BarChart";
import { connect } from 'react-redux';
import { getDiagramData } from '../../actions/diagramActions';
import '../../styles/DiagramPage.css';
import '../../styles/MainPage.css';

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

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    resize() {
        console.log('RESIZE EXECUTED');
        // this.setState({hideNav: window.innerWidth <= 760});
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav !== this.state.hideNav) {
            this.setState({hideNav: currentHideNav});
        }
    }
    //this is for the conditional of web or mobile
    // className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}
    render() {
        console.log("PROPS");
        console.log(this.props);
        const { diagramData } = this.props;
        return (
            <div className="main-container-page">
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