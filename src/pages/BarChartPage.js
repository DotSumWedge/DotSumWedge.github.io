import React, { useState } from 'react'
import Chart from '../components/ResponsiveBar';

function BarChartPage() {

    const [dataScientists, setRiders] = useState ([
        {
            DataVisualization: 5,
            MachineLearning: 5,
            Mathematics: 7,
            Statistics: 6,
            ComputerScience: 9,
            Communication: 5,
            DomainExpertise: 2
        }
      ])

    //Save the key value pairs for the attributes
    const profileStats = [];
    for (const [key, value] of Object.entries(dataScientists[0])) {
        //console.log(`${key}: ${value}`);
        profileStats.push(key);
    }

  return (
    <div style={barChartPageStyle}>
        <Chart dataScientists={dataScientists}/>
    </div>
  )
}

const barChartPageStyle = {
    backgroundColor: '#262623', 
    border: '15px solid #630c01',
    padding: '50px'
}

export default BarChartPage