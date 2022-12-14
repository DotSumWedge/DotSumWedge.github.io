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
        <h1 style={barChartHeaderStyle}>Data Science Skills</h1>
        <Chart dataScientists={dataScientists}/>
    </div>
  )
}

const barChartPageStyle = {
    backgroundColor: '#262623', 
    padding: '50px'
}

const barChartHeaderStyle = {
  color: '#98efeb'
}

export default BarChartPage