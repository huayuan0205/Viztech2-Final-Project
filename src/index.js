import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
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
	//clickButton2
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


//Interaction-Buttons

// d3.select('#btn-test')
//         .selectAll('.button')
//         .on('click', function() {

//         	var currentColor = 'grey';
//         	currentColor = currentColor=='grey'? function(d){return d.values[0].colorCode}:'grey';

//             return{
//             	d3.select(this)
//             	.style('fill',currentColor);
//             }
//         })
            


//Click and Unclick
// for(let i=0;i<ui_buttons.length;i++){

// 		d3.select(`#${ui_buttons[i].id}`).on('click', function(){
// 			console.log('ui_buttons[i].id');

// 			var clickTimes = 0;
		
// 		// Determine if current line is visible
// 			clickTimes++;

// 			if(clickTimes%2 !== 0){
// 				d3.select(`#${ui_buttons[i].id}`)//id of the line
// 				.style('stroke',d => {
// 					console.log('color channge');
// 					console.log(d.values[0].colorCode);
// 					return d.values[0].colorCode})
// 				.style('stroke-width','2px');
// 			}else{
// 				d3.select(`#${ui_buttons[i].id}`)
// 				.style('stroke','grey')
// 				.style('stroke-width','0.4px');
// 			}
// 	})
// }

	
	// const buttonSvg = d3.select('.btn-test')
	// 	.append('svg')
	// 	.attr('width',d3.select('.btn-toolbar').node().clientWidth)
	// 	.attr('height',d3.select('.btn-toolbar').node().clientHeight)
	// 	.style('background','lightblue')

	// var buttonGroup = buttonSvg.selectAll('.button')
	// 	.data(ui_buttons)
	// 	.enter()
	// 	.append('rect')
	// 	.attr('class','button')
	// 	.style('fill','red')
		// .attr('id',function(d){
		// 	return d.btn_id;
		// 	console.log(d)
		// })
		// .style('background','red')
		// .text(d => d.btn_label)
		//.style('cursor','pointer')
	
		

	// buttonGroup.on('click',function(d){
	// 	console.log(d.btn_label);
	// 	// d3.select(this)
	// 	// 	.transition()
	// 	// 	.style('background','red')
	// 	// 	.style('color','white')
		
	// })


	// var buttonSpace = 20;

	// buttonGroup.append('rect')
	// 	// .attr('width',buttonWidth)
	// 	// .attr('height',buttonHeight)
	// 	.attr('x',function(d,i){
	// 		return (buttonWidth+buttonSpace)*i;
	// 	})
	// 	.attr('y',0);
		
	// buttonGroup.append('text')
	// 	.attr('x',function(d,i){
	// 		return (buttonWidth+buttonSpace)*i+buttonWidth/2;
	// 	})
	// 	.attr('y',buttonHeight/2)
	// 	.attr('text-align','center')
	// 	.text(d => d.label);


	// const buttonsGroup = d3.select('.btn-toolbar')
	// 	.selectAll('.button')
	// 	.data(ui_buttons)
	// 	// .append('svg')
	// 	// .attr('width',d3.select('.btn-toolbar').node().clientWidth)
	// 	// .attr('height',d3.select('.btn-toolbar').node().clientHeight)
	
	// buttonsGroup
	// 	//.enter()
	// 	.append('g')
	// 	.attr('class','button')
	// 	.attr('data-id',d => d.id)
	// 	.style('stroke','red')
	// 	.style('stroke-width','2px')
	// 	.text(d => d.label)
		// .on('click',function(d){

		// 	var clickTimes = 0;
		// 	d3.select(`#${d.id}`).on('click', function(){
		// 		console.log('show ND');
		// 		// Determine if current line is visible
		// 		clickTimes++;

		// 		if(clickTimesND%2 !== 0){
		// 			d3.select(`#${d.id}`)//id of the line
		// 			// .style('stroke',d => {
		// 			// 	const colorOfThisLine = d.map(d.values,function(d){

		// 			// 	})
		// 			// 	})
		// 			.style('stroke',d => d.colorCode)
		// 			.style('stroke-width','2px');
		// 		}else{
		// 			d3.select(`#${d.id}`)
		// 			.style('stroke','grey')
		// 			.style('stroke-width','0.4px');
		// 		}
		// 	})
		// })


function dataFiltered(data){
	
	const filteredData = data.map(d => {
		return{
			year: d.year,
			value: d.nmValue
		}
	})

	return filteredData;
	
}







//get the width and height of trend-container
const W = d3.select('.trend-container').node().clientWidth;
const H = d3.select('.trend-container').node().clientHeight;
const margin = {t:10, r:20, b:20, l:10};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;


//show the outline of svg-absolute-trend
// const svgAbTrend = d3.select('.absolute-trend')
// 	.append('svg')
// 	.attr('width',W/2-10)
// 	.attr('height',H-30)

// const svgAbTrend_Path = svgAbTrend.append('rect')
// 	.attr("x", 0)
//     .attr("y", 0)
// 	.attr('width',W/2-10)
// 	.attr('height',H-30)
// 	.style('fill','none')
// 	.style('stroke','black')
// 	.style('stroke-width',1);


//show the outline of svg-normalized-trend
// const svgNmTrend = d3.select('.normalised-trend')
// 	.append('svg')
// 	.attr('width',W/2-10)
// 	.attr('height',H-30)

// const svgNmTrend_Path = svgNmTrend.append('rect')
// 	.attr("x", 0)
//     .attr("y", 0)
// 	.attr('width',W/2-10)
// 	.attr('height',H-30)
// 	.style('fill','none')
// 	.style('stroke','black')
// 	.style('stroke-width',1);


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













