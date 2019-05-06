import React from 'react';
import { Line } from 'react-chartjs-2';

class ChartCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }

    render() {
        return (
            <div className="chart">
                <Line allowChartUpdate="true" oneToOne={true}
                    data={this.state.data.chartData}
                    options={this.state.data.chartOptions}
                    height={500}
                    width={700}
                />
            </div>
        );

    }
}

export default (ChartCanvas);

