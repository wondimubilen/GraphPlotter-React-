import React, { Component } from "react";
import "./App.css";
import MyCart from "./components/Canvas/Chart";
import Histroy from "./components/History/History";
import UserInput from "./components/UserInput/UserInput";
import UserOutput from "./components/UserOutput/UserOutput";
// import TeX from 'react-formula-beautifier';

const historicalData = [];

class App extends Component {
  state = {
    formula: "x^2",
    start: -10,
    end: 10,
    finalFormula: "x^2",
    finalStart: -10,
    finalEnd: 10,
    showHistory: false
  };

  switchDataHandler = () => {
    // update state from user input
    this.setState({
      finalFormula: this.state.formula,
      finalStart: this.state.start,
      finalEnd: this.state.end
    });

    const inputValues = {
      formula: this.state.formula,
      start: this.state.start,
      end: this.state.end
    };

    historicalData.push(inputValues);
  };

  viewHistory = () => {
    this.setState({
      showHistory: true
    });
  };

  editFormulaHandler=(index)=> {
    const data = historicalData[index];

    this.setState({
      finalFormula: data.formula,
      finalStart: data.start,
      finalEnd: data.end
    });

  }

  trackFormulaInputChange = e => {
    this.setState({
      formula: e.target.value
    });
  };

  trackStartInputChange = e => {
    this.setState({
      start: e.target.value
    });
  };

  trackEndInputChange = e => {
    this.setState({
      end: e.target.value
    });
  };


  render() {
    const plotStyle = {
      backgroundColor: "#2fc974",
      padding: "20px 10px",
      cursor: "pointer",
      border: "1px solid #666",
      color: "#000",
      borderRadius: "8px",
      textAlign: "center",
      width: "250px",
      display: "block",
      fontSize: "24px",
      textTransform: "uppercase"
    };

    const historyStyle = {
      backgroundColor: "##A9A9A9",
      padding: "20px 10px",
      cursor: "pointer",
      border: "1px solid #666",
      color: "#000",
      borderRadius: "8px",
      textAlign: "center",
      width: "150px",
      margin: '20px',
      display: "block",
      fontSize: "18px",
      textTransform: "uppercase"
    };

    return (
      <div id="chart" className="App">
        <MyCart
          oneToOne={true}
          formula={this.state.finalFormula}
          start={this.state.finalStart}
          end={this.state.finalEnd}
        />
        <div className="App-wrapper">
          <div className="App-input">
            <h4> Please Insert One Variable Equation </h4>
            <UserInput
              changed={this.trackFormulaInputChange}
              currentFormula={this.state.formula}
            />
          </div>
          <div className="App-input">
            <h4> Please Insert X axis Start Point </h4>
            <UserInput
              changed={this.trackStartInputChange}
              currentFormula={this.state.start}
            />
          </div>

          <div className="App-input">
            <h4> Please Insert X axis End Point </h4>
            <UserInput
              changed={this.trackEndInputChange}
              currentFormula={this.state.end}
            />
          </div>

          <button style={plotStyle} onClick={this.switchDataHandler.bind(this)}>
            Plot
          </button>

          <button style={historyStyle} onClick={this.viewHistory}>
            View History
          </button>
          <div>
            <ol>
            {this.state.showHistory &&
              historicalData.map(function(d, idx) {
                return (
                  <li click={() => this.editFormulaHandler(idx)}>
                    <Histroy
                      key={idx}
                      formula={d.formula}
                      start={d.start}
                      end={d.end}
                    />
                  </li>
                );
              })}
            </ol>

          </div>
        </div>
        <UserOutput
          formula={this.state.formula}
          start={this.state.start}
          end={this.state.end}
        />
        {/* <TeX value={this.state.formula} />  TODO: react-formula-beautifier has a bug */}
      </div>
    );
  }
}
export default App;
