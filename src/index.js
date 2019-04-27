import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
// import * as data from './budget_2000';
import {
	normalisedDataPromise,
	colorCodePromise,
	normalisedDataCombined,
	actualDataCombined,
	subfunctionDataPromise,
	ui_buttons
} from './data';
import clickButton from './button';
import {
	drawNormalisedLineChart,
	drawActualLineChart
} from './LineChart';
import {
	drawTreemap,
	drawTreemap_sub
} from './Treemap';
import * as d3 from 'd3';
import{
	csv, nest, sum, select, keys
} from 'd3';


console.log('webpack2');
const years = [];


// //draw all the lines
// normalisedDataCombined.then(data => {

// 	drawNormalisedLineChart(d3.select('.normalised-trend').node(),data);
// 	clickButton(data);

// });


// actualDataCombined.then(data => {
		
// 	drawActualLineChart(d3.select('.absolute-trend').node(),data);

// });


// subfunctionDataPromise.then(data => {

// 	//console.log('datainsub',data);
	
// 	var dataByYear_func = nest()
// 			.key(d => d.year)
// 			.key(d => d.functionName)
// 			.rollup(s => d3.sum(s, d => d.value_sub))
// 			.entries(data)
// 			.map(d => [+d.key, d.values]);
	
// 	dataByYear_func.forEach(function(d){
// 		years.push(d[0])
// 	})
	
// 	drawTreemap(d3.select('.composition-container').node(),data,2000);
	
// 	renderMenu(years,data);

// });


const allDataCombined = Promise.all([
		actualDataCombined,
		normalisedDataCombined,
		subfunctionDataPromise
	])
	.then(([actualData,normalisedData,subfunctionData]) => {
		
		//call actual-data line chart
		drawActualLineChart(d3.select('.absolute-trend').node(),actualData);

		//call normalised-data line chart
		drawNormalisedLineChart(d3.select('.normalised-trend').node(),normalisedData);
		
		//call interaction - button
		clickButton(normalisedData,subfunctionData);

		//generate default treemap for 19 functions
		var dataByYear_func = nest()
			.key(d => d.year)
			.key(d => d.functionName)
			.rollup(s => d3.sum(s, d => d.value_sub))
			.entries(subfunctionData)
			.map(d => [+d.key, d.values]);
	
		dataByYear_func.forEach(function(d){
			years.push(d[0])
		})
		
		drawTreemap(d3.select('.composition-container').node(),subfunctionData,2000);
		

		//call interaction - dropdown
		renderMenu(years,subfunctionData);

		
	})


function renderMenu(year,data){

	//Get list of countryCode values
	const yearList = Array.from(years.entries());
	//console.log(yearList);
	var selectedYear;
	//Build UI for <select> menu
	let menu = select('.year')
		.selectAll('select')
		.data([1]);

	menu = menu.enter()
		.append('select')
		.attr('class','form-control form-control-sm')
		.merge(menu);

	//Add <option> tag under <select>
	menu.selectAll('option')
		.data(yearList)
		.enter()
		.append('option')
		.attr('value', d => d[1])
		.html(d => d[1]);

	//Define behavior for <select> menu
	menu.on('change', function(el){

		selectedYear = this.value;

		var year_tag= select("#years_holder").text(selectedYear);
		console.log("check in function value",selectedYear);
		
		drawTreemap(d3.select('.composition-container').node(),data,selectedYear)

				
	});

}




	


	
	





