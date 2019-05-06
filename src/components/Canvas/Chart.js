

import React from 'react';
import {Line, Bar, Scatter} from 'react-chartjs-2';

class ChartBilen  extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
    }
    
    
    render() {	
        console.log('hi', this.state.data.chartData.datasets[0].data);
	
        return (
        <div className = "chart">
            <Line  allowChartUpdate="true" oneToOne={true}
            data={this.state.data.chartData}
            options={this.state.data.chartOptions}
            height={500}
            width={700}
            />         
        </div>
        );	

	}	
}

export default (ChartBilen);

