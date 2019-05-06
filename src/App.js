import React, { Component } from 'react';
import './App.css';
import MyCart from './components/Canvas/Chart';
import math from 'mathjs';
// import ReactDOM from 'react-dom';
// import TeX from 'react-formula-beautifier';
import UserInput from './components/UserInput/UserInput';
import UserOutput from './components/UserOutput/UserOutput';


class App extends Component {

  // constructor(){
  //   super();
  // }

  state = {
    formula: 'x^2',
    start: -10,
    end: 10,
    data: {},
    coordinates: []
  }

  switchDataHandler = (temp) => {
    // console.log('after',temp);

    this.getChartData();
    //  console.log('after',this.state.data)

    this.setState({
      formula: this.state.formula,
      start: this.state.start,
      end: this.state.end,
      data: this.state.data,
      coordinates: this.state.coordinates
    });
    //  this.setState({ state: this.state });
    console.log('i am clicked', this.state.coordinates);
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData = () => {

    var formula = this.state.formula;
    let coordinatesList = [];
    coordinatesList = this.generateDataPoints(coordinatesList);
    console.log('coordinatesList', coordinatesList);

    this.setState({
      data: {
        chartData: {
          datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: coordinatesList,
          }]
        },
        chartOptions: {
          title: {
            display: true,
            text: 'This is the First line graph',
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

  truckFormulaInputChange = (e) => {
    this.setState({
      formula: e.target.value,
    });
    // console.log(this.state.formula);
  }

  truckStartInputChange = (e) => {
    this.setState({
      start: e.target.value,
    });
    // console.log(this.state.start);
  }

  truckEndInputChange = (e) => {
    this.setState({
      end: e.target.value,
    });
    // console.log(this.state.end);
  }

  generateDataPoints = (coordinatesList) => {
    let start = this.state.start ? this.state.start : -10
    let end = this.state.end ? this.state.end : 10
    for (let index = start; index < end; index++) {
      const temp = math.parse(this.state.formula);
      // console.log('temp', temp);

      const temp2 = temp.compile();
      // console.log('temp compiled', temp2);

      let scope = {
        x: index
      }
      const y = temp2.eval(scope); // 9

      coordinatesList.push({ x: index, y: y })
    }
    console.log('one: ', coordinatesList);

    this.setState({
      coordinates: coordinatesList,
    });

    console.log('state coordinate: ', this.state);
    return coordinatesList;
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
        <h2>Demo</h2>
        <MyCart data={this.state.data} oneToOne={true} ></MyCart>
        <div className="App-input">
          <h4> Please Insert One Variable Equation </h4>
          <UserInput
            changed={this.truckFormulaInputChange}
            currentFormula={this.state.formula} />
        </div>
        <div className="App-input">
          <h4> Please Insert X axis Start Point </h4>
          <UserInput
            changed={this.truckStartInputChange}
            currentFormula={this.state.start} />
        </div>
        <div className="App-input">
          <h4> Please Insert X axis End Point </h4>
          <UserInput
            changed={this.truckEndInputChange}
            currentFormula={this.state.end} />
        </div>

        <button
          style={style}
          onClick={this.switchDataHandler.bind(this)}> CLICK ME</button>

        <UserOutput formula={this.state.formula} start={this.state.start} end={this.state.end} />

        {/* <TeX value={this.state.formula} /> */}

      </div>
    );
  }

}
export default App;
