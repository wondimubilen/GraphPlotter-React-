import React, { Component } from 'react';
import './App.css';
import MyCart from './components/Canvas/Chart';
import math from 'mathjs';
import UserInput from './components/UserInput/UserInput';
import UserOutput from './components/UserOutput/UserOutput';
// import TeX from 'react-formula-beautifier';

class App extends Component {

  state = {
    formula: 'x^2',
    start: -10,
    end: 10,
    data: {},
    coordinates: []
  }

  componentWillMount() {
    this.getChartData();
  }

  switchDataHandler = (temp) => {
    this.getChartData();

    // update state from user input 
    this.setState({
      formula: this.state.formula,
      start: this.state.start,
      end: this.state.end,
      data: this.state.data,
      coordinates: this.state.coordinates
    });
  }

  generateDataPoints = (coordinatesList) => {
    let start = this.state.start ? this.state.start : -10
    let end = this.state.end ? this.state.end : 10

    for (let i = start; i < end; i++) {
      const algebraNode = math.parse(this.state.formula);
      const algebraCode = algebraNode.compile();

      let scope = {
        x: i
      }
      const y = algebraCode.eval(scope);

      // this doesn't work
      this.setState({
        coordinates: coordinatesList.push({ x: i, y: y }),
      });
    }
    return coordinatesList;
  }

  getChartData = () => {
    var formula = this.state.formula;
    let coordinatesList = [];
    coordinatesList = this.generateDataPoints(coordinatesList);
    console.log('updated coordinates', coordinatesList);
    this.setState({
      data: {
        chartData: {
          datasets: [{
            label: "Graphing Algebra ",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: coordinatesList,
          }]
        },
        chartOptions: {
          title: {
            display: true,
            text: 'Mathematical Formula Graph :' + formula,
            fontSize: 20,
            fontColor: 'black'
          },
          scales: {
            xAxes: [
              {
                type: 'linear',
                ticks: {
                  callback: function (label, index, labels) {
                    return label;
                  }
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  callback: function (label, index, labels) {
                    return label;
                  },
                  fontSize: 18,
                  fontColor: 'black'
                },
                display: true,
              }
            ]
          }
        },
      },
      coordinates: coordinatesList
    })
  }

  trackFormulaInputChange = (e) => {
    this.setState({
      formula: e.target.value,
    });
  }

  trackStartInputChange = (e) => {
    this.setState({
      start: e.target.value,
    });
  }

  trackEndInputChange = (e) => {
    this.setState({
      end: e.target.value,
    });
  }

  render() {
    const style = {
      backgroundColor: '#2fc974',
      padding: '20px 10px',
      cursor: 'pointer',
      border: '1px solid #666',
      color: '#000',
      borderRadius: '8px',
      textAlign: 'center',
      width: '250px',
      display: 'block'

    }

    return (
      <div id="chart" className="App">
        <MyCart data={this.state.data} oneToOne={true} ></MyCart>
        <div className="App-wrapper">
          <div className="App-input">
            <h4> Please Insert One Variable Equation </h4>
            <UserInput
              changed={this.trackFormulaInputChange}
              currentFormula={this.state.formula} />
          </div>
          <div className="App-input">
            <h4> Please Insert X axis Start Point </h4>
            <UserInput
              changed={this.trackStartInputChange}
              currentFormula={this.state.start} />
          </div>

          <div className="App-input">
            <h4> Please Insert X axis End Point </h4>
            <UserInput
              changed={this.trackEndInputChange}
              currentFormula={this.state.end} />
          </div>

          <button
            style={style}
            onClick={this.switchDataHandler.bind(this)}> CLICK ME</button>
        </div>
        <div>
          <UserOutput formula={this.state.formula} start={this.state.start} end={this.state.end} />
          {/* <TeX value={this.state.formula} />  TODO: react-formula-beautifier has a bug */}
        </div>
      </div>
    );
  }

}
export default App;
