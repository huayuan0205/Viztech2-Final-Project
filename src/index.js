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
} from './ViewModules/LineChart';
import {
	drawTreemap,
	drawTreemap_sub
} from './ViewModules/Treemap';
import * as d3 from 'd3';
import{
	csv, nest, sum, select, keys
} from 'd3';


console.log('webpack2');
const years = [];


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

		//var year_tag = select("#years_holder").text(selectedYear);
		//console.log("check in function value",selectedYear);
		
		// for(let i=0;i<ui_buttons.length;i++){
		// 	d3.select(`#${ui_buttons[i].btn_id}`).on('click', function(){

		// 	if(d3.selectAll('.btn').style('background-color') === 'rgb(211,211,211)'){
		// 		drawTreemap(d3.select('.composition-container').node(),data,selectedYear);
		// 	}else{
		// 		drawTreemap_sub(d3.select('.composition-container').node(),data,selectedYear,d3.select(`#${ui_buttons[i].btn_id}`).btn_label);
		// 	}

		// })
		// }
		drawTreemap(d3.select('.composition-container').node(),data,selectedYear);
			
	})

}
