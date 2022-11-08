import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './ResponsiveBar.css';

const Chart = ({dataScientists}) => {

	const attributeBarChart = useRef()

	// Ref for updating dimention 
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})

	// Ref for resize event update
	const update = useRef(false)

	useEffect(()=>{

		// Listen for any resize event update
		window.addEventListener('resize', ()=>{
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			})

			// If resize, remove the previous chart
			if(update.current){
				d3.selectAll('g').remove()
				d3.selectAll('text').remove()
			} else {update.current = true}
		})

		// Draw chart using the data and updated dimensions
		DrawChart(dataScientists[0],dimensions)

	},[dimensions])

	const margin = {top: 50, right:30, bottom: 30, left:60}

	function DrawChart(data, dimensions){

		const chartwidth = parseInt(d3.select('#riderBarChart').style('width')) - margin.left - margin.right
		const chartheight = parseInt(d3.select('#riderBarChart').style('height')) - margin.top - margin.bottom

		// console.log(Object.keys(data))
		// console.log(Object.keys(data).length)
		console.log("data value", data.DataVisualization)
		console.log("data value at i", Object.entries(data)[0])

		const svg = d3.select(attributeBarChart.current)
						.attr('width', chartwidth + margin.left + margin.right)
						.attr('height', chartheight + margin.top + margin.bottom)

		

		// x scale
		const x = d3.scaleBand()
					.domain(d3.range(Object.keys(data).length))
					.range([margin.left, chartwidth - margin.right])
					.padding(0.1)

		svg.append('g')
			.attr('transform', 'translate(0,'+ chartheight + ')')
			.style("font-size", "25px")
			.call(d3.axisBottom(x).tickFormat(i=>Object.keys(data)[i]).tickSizeOuter(0))

		// const max = d3.max(data, function(d){return d[profileStat]})
		const max = 10;

		// y scale
		const y = d3.scaleLinear()
					.domain([0, max])
					.range([chartheight, margin.top])

		svg.append('g')
			.style("font-size", "25px")
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y))

		// Draw bars
		svg.append('g')
			.attr('fill','#65f0eb')
			.selectAll('rect')
			.data([ 3, 4, 7, 5, 9, 5, 2 ])
			.join('rect')
				.attr('x', (d,i) => x(i) + x.bandwidth() * .125)
				.attr('y', d => y(d))
				.attr('height', d=>y(0)-y(d))
				.attr('width', d => x.bandwidth() * .75)
	}

	return (
		<div id='riderBarChart' style={barChartDivStyle}>
		  <svg ref={attributeBarChart}></svg>
		</div>
	)
}

const barChartDivStyle = {
    backgroundColor: '#323638', 
    color: '#ffffff',
    border: '7px solid #3b4043',
    padding: '20px',
	margin: '15px',
	width: '1700px',
	display: 'block',
	margin: 'auto'
}

export default Chart