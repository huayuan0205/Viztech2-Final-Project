import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
// import * as data from './budget_2000';
import {
	normalisedDataPromise,
	colorCodePromise,
	normalisedDataCombined,
	actualDataCombined,
	ui_buttons
} from './data';
import {
	drawNormalisedLineChart,
	drawActualLineChart,
	clickButton
} from './LineChart';

import * as d3 from 'd3';
import{
	csv, nest, sum, select, keys
} from 'd3';


console.log('webpack2');



//draw all the lines
normalisedDataCombined.then(data => {
		
	drawNormalisedLineChart(d3.select('.normalised-trend').node(),data);
	clickButton(data);

});

actualDataCombined.then(data => {
		
	drawActualLineChart(d3.select('.absolute-trend').node(),data);
	//clickButton(data);

});


// json.then(function(data){

// 	console.log('Treemap data');
// 	console.log(data);

	
// 	const rootNode = d3.hierarchy(data)//return the data in a treemap structure
// 		.sum(function(d){ return d.value });//calculate the value of leaves elements 
// 	console.log('rootNode');
// 	console.log(rootNode.descendants());//to get the nodes from the standardized data


// 	renderTreemap(rootNode, d3.select('.composition-container').node());

// })



	


	
	






//show the outline of svg-composition-container
const svgTreemap = d3.select('.composition-container')
	.append('svg')
	.attr('width',d3.select('.composition-container').node().clientWidth)
	.attr('height',d3.select('.composition-container').node().clientHeight)

const svgTreemap_Path = svgTreemap.append('rect')
	.attr("x", 0)
    .attr("y", 0)
	.attr('width',d3.select('.composition-container').node().clientWidth)
	.attr('height',d3.select('.composition-container').node().clientHeight)
	.style('fill','none')
	.style('stroke','black')
	.style('stroke-width',1);













