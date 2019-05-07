import React from 'react';
import { Line } from 'react-chartjs-2';
import math from 'mathjs';

class ChartCanvas extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data: null
        };
        this.getChartData();
    }


    componentDidMount() {
      this._isMounted = true;

      if(this._isMounted) {
        this.getChartData();
      }
    }

    componentDidUpdate(prevProps) {
      if(prevProps.end !== this.props.end || prevProps.start !== this.props.start || prevProps.formula !== this.props.formula) {
        this.getChartData();
      }
    }

    getChartData = () => {
      const formula = this.props.formula;
      let coordinatesList = [];
      coordinatesList = this.generateDataPoints(coordinatesList);
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

    generateDataPoints = (coordinatesList) => {
      let start = this.props.start ? Number(this.props.start) : -10
      let end = this.props.end ? Number(this.props.end) : 10

      for (let i = start; i <= end; i++) {
        const algebraNode = math.parse(this.props.formula);
        const algebraCode = algebraNode.compile();

        let scope = {
          x: i
        }

        try {
          const y = algebraCode.eval(scope);
          coordinatesList.push({ x: i, y: y });
        } catch (e) {
            //TODO: include error handler here
            if (e instanceof SyntaxError) {
                console.log(e.message);
            } else {
                console.log(e.message);
                // throw( e );
            }
        }
      }
      return coordinatesList;
    }

    render() {
        return (
          <div> 
          {
            this.state.data && (
              <div className="chart">
                  <Line allowChartUpdate="true" oneToOne={true}
                      data={this.state.data.chartData}
                      options={this.state.data.chartOptions}
                      height={500}
                      width={700}
                  />
              </div>
            )
          }
          </div>
        );
    }
}

export default (ChartCanvas);
