import * as d3 from 'd3';
import {ui_buttons} from './data';
import{
	nest, sum, select
} from 'd3';


function drawNormalisedLineChart(rootDOM,data){ 
	
	//get the width & height of DOM element
	// console.group('dataInNormalisedFunction');
	// console.log(data);
	// console.groupEnd();


	const W = rootDOM.clientWidth;
	const H = rootDOM.clientHeight;
	const margin = {t:10, r:10, b:20, l:20};
	const w = W - margin.l - margin.r;
	const h = H - margin.t - margin.b;
	//console.log(`${W}+${H}`);


	//Set up scales
	var scaleX = d3.scaleLinear()
	   	.domain([2000,2017])
	    .range([0,w])
	var scaleY = d3.scaleLinear()
		.domain([-38,30])
		.range([h,0])
	var color = d3.scaleOrdinal(d3.schemeSet3);
	

	//Add axes
	const axisX = d3.axisBottom()
			.scale(scaleX)
			.ticks(19)
			.tickFormat(function(value){ return "'"+String(value).slice(-2)})//pick the last two digits

	const axisY = d3.axisLeft()
			.scale(scaleY)
			.tickSize(-w)//draw the grid line
			.ticks(10)//the number of grid lines


	//Set up a line generator
	const lineGenerator = d3.line()
		.x(d => {return scaleX(+d.year)})
		.y(d => {return scaleY(+d.value_normalised)})
		//.curve(d3.curveBasis)
	

	//Append svg & g
	const plot = d3.select(rootDOM)
		.append('svg')
		.attr('width',W)
		.attr('height',H)
		.append('g')
		.attr('transform',`translate(${margin.l},${margin.t})`);
	

	//Add lines
	var func = plot.selectAll('.function')
		.data(data)
		.enter()
		.append('g')
		.attr('class','function')
		.attr('id',function(d){
			return `funcc-${d.key}`
		})

	func.append('path')
		.attr('class','line')
		.attr('id',d => d.key)//give each line an id
		.attr('d',function(d){return lineGenerator(d.values)})
		.style('stroke','grey')
	


	//Add points
	data.forEach(function(d,i){
		var dots = func
			.selectAll('.dot')
			.data(function(d){
				return d.values;
			})
			.enter()
			.append('circle')
			.attr('class','dot')
			.attr('id',function(d,i){
				return `dot${i}+${+d.year}`;
			})
			.attr('r',2)
			.attr('cx',function(d){
				return scaleX(+d.year)
			})
			.attr('cy',function(d){
				return scaleY(+d.value_normalised)
			})
			.style('stroke','white')
			.style('stroke-width','1px')
			.style('fill','#f2a829')

		//hover over dots
		dots.on('mouseover',function(d){
			//console.log(d);
			
			d3.select(this)
				.attr('r',4)
				.style('cursor','pointer')
				.style('fill',function(d){
					return d.colorCode;
				})

			tooltip.transition()
				.duration(100)
				.style('opacity',1)

			tooltip.html(function(){
				
				return "<strong>"  + "Budget Function: " + "</strong>" + "<span style='color:grey'>" + d.functionFullName + '</span>' + '<br>'
				+ "<strong>"  + "Year: " + "</strong>" + "<span style='color:grey'>" + d.year + '</span>' + '<br>'
				+ "<strong>"  + "Normalised Value: " + "</strong>" + "<span style='color:grey'>" + d.value_normalised + '</span>'

			})
				.style('left',(d3.event.pageX) + 'px')
				.style('top',(d3.event.pageY-30) + 'px')
				
		})

		dots.on('mouseout',function(d){
			d3.select(this)
				.attr('r',1)
				.style('stroke','white')
				.style('stroke-width','1px')
				.style('fill','#f2a829')

		tooltip.transition()
			.duration(200)
			.style('opacity',0)
		})
	})
	
	

	//tooltip	
	var tooltip = d3.select('.normalised-trend')
		.append('div')
		.attr('class','tooltip')
		.style('opacity',0)


	d3.selectAll('.line')
		.on('click',function(d){
			console.log(d.key);
		})
		.on('mouseover',function(d){
			
			d3.select(this)
				.style('cursor','pointer')
				.style('stroke',d => {
					return d.values[0].colorCode
				})
				.style('stroke-width','2px');

			tooltip.transition()
				.duration(100)
				.style('opacity',1)

			tooltip.html(function(){
				
				return "<strong>"  + "Budget Function: " + "</strong>" + "<span style='color:grey'>" + d.key 

			})
				.style('left',(d3.event.pageX) + 'px')
				.style('top',(d3.event.pageY-30) + 'px')
		})
		.on('mouseout',mouseout);


	function mouseout(){

		d3.select(this)
				.style('stroke','grey')
				.style('stroke-width','0.4px');

		tooltip.transition()
			.duration(200)
			.style('opacity',0)
	}
	
	// function GetPropertyValue(object, dataToRetrieve) {
	//     dataToRetrieve.split('.').forEach(function(token) {
	//       if (object) object = object[token];
	//     });
    
 //    	return object;
	// }

	

	//Call Axes
	plot.append('g')
		.attr('class','axis axis-x')
		.attr('transform',`translate(0,${h})`)
		.call(axisX);

	plot.append('g')
		.attr('class','axis axis-y')
		.call(axisY);




}


function drawActualLineChart(rootDOM,data){ 
	//get the width & height of DOM element
	// console.group('dataInActualFunction');
	// console.log(data);
	// console.groupEnd();

	const W = rootDOM.clientWidth;
	const H = rootDOM.clientHeight;
	const margin = {t:10, r:10, b:20, l:25};
	const w = W - margin.l - margin.r;
	const h = H - margin.t - margin.b;


	// const extentValue = d3.extent(data[0].values, function(d){return d.value;});
	// console.log('extentValueForYAxis');
	// console.log(extentValue);


	//Set up scales
	var scaleX = d3.scaleLinear()
	   	.domain([2000,2017])
	    .range([0,w])
	var scaleY = d3.scaleLinear()
		.domain([-125,1000])
		.range([h,0])
	var color = d3.scaleOrdinal(d3.schemeSet3);
	

	//Add axes
	const axisX = d3.axisBottom()
			.scale(scaleX)
			.ticks(19)
			.tickFormat(function(value){ return "'"+String(value).slice(-2)})//pick the last two digits

	const axisY = d3.axisLeft()
			.scale(scaleY)
			.tickSize(-w)//draw the grid line
			.ticks(10)//the number of grid lines


	//Set up a line generator
	const lineGenerator = d3.line()
		.x(d => {return scaleX(+d.year)})
		.y(d => {return scaleY(+d.value_actual)})
		//.curve(d3.curveBasis)
	

	//Append svg & g
	const plot = d3.select(rootDOM)
		.append('svg')
		.attr('width',W)
		.attr('height',H)
		.append('g')
		.attr('transform',`translate(${margin.l},${margin.t})`);
	

	//Add lines
	var func = plot.selectAll('.function')
		.data(data)
		.enter()
		.append('g')
		.attr('class','function')

	func.append('path')
		.attr('class','line')
		.attr('id',d => {
			return `actual_${d.key}`})
		.attr('d',function(d){return lineGenerator(d.values)})
		.style('stroke','grey')
	

	//Add points
	data.forEach(function(d,i){
		var dots = func
			.selectAll('.dot')
			.data(function(d){
				return d.values;
			})
			.enter()
			.append('circle')
			.attr('class','dot')
			.attr('id',function(d,i){
				return `dot${i}+${+d.year}`;
			})
			.attr('r',2)
			.attr('cx',function(d){
				return scaleX(+d.year)
			})
			.attr('cy',function(d){
				return scaleY(+d.value_actual)
			})
			.style('stroke','white')
			.style('stroke-width','1px')
			.style('fill','#4da9de')


		//hover over dots
		dots.on('mouseover',function(d){
			//console.log(d);
			
			d3.select(this)
				.attr('r',4)
				.style('cursor','pointer')
				.style('fill',function(d){
					return d.colorCode;
				})

			tooltip.transition()
				.duration(100)
				.style('opacity',1)

			tooltip.html(function(){
				
				return "<strong>"  + "Budget Function: " + "</strong>" + "<span style='color:grey'>" + d.functionFullName + '</span>' + '<br>'
				+ "<strong>"  + "Year: " + "</strong>" + "<span style='color:grey'>" + d.year + '</span>' + '<br>'
				+ "<strong>"  + "Absolute Amount: " + "</strong>" + "<span style='color:grey'>" + "$ " + d.value_actual*1000 + '</span>'

			})
				.style('left',(d3.event.pageX) + 'px')
				.style('top',(d3.event.pageY-30) + 'px')
				
		})

		dots.on('mouseout',function(d){
			d3.select(this)
				.attr('r',1)
				.style('stroke','white')
				.style('stroke-width','1px')
				.style('fill','#4da9de')

		tooltip.transition()
			.duration(200)
			.style('opacity',0)
		})
	})


	//tooltip	
	var tooltip = d3.select('.absolute-trend')
		.append('div')
		.attr('class','tooltip')
		.style('opacity',0)


	d3.selectAll('.line')
		.on('click',function(d){
			console.log(d.key);
		})
		.on('mouseover',function(d){
			
			d3.select(this)
				.style('cursor','pointer')
				.style('stroke',d => {
					return d.values[0].colorCode
				})
				.style('stroke-width','2px');

			tooltip.transition()
				.duration(100)
				.style('opacity',1)

			tooltip.html(function(){
				
				return "<strong>"  + "Budget Function: " + "</strong>" + "<span style='color:grey'>" + d.key 

			})
				.style('left',(d3.event.pageX) + 'px')
				.style('top',(d3.event.pageY-30) + 'px')
		})
		.on('mouseout',mouseout);


	function mouseout(){

		d3.select(this)
				.style('stroke','grey')
				.style('stroke-width','0.4px');

		tooltip.transition()
			.duration(200)
			.style('opacity',0)
	}


	//Call Axes
	plot.append('g')
		.attr('class','axis axis-x')
		.attr('transform',`translate(0,${h})`)
		.call(axisX);

	plot.append('g')
		.attr('class','axis axis-y')
		.call(axisY);


}


function clickButton(data){

	//Click 'Clear' 
	d3.select('#clear').on('click',function(d){
		console.log('Clear');
		d3.selectAll('.line')
			.style('stroke','grey')
			.style('stroke-width','0.4px');
	})


	//Click each function button 
	for(let i=0;i<ui_buttons.length;i++){

		d3.select(`#${ui_buttons[i].btn_id}`).on('click', function(){
			
			console.log(`click ${ui_buttons[i].btn_label}`);

			//change the color of clicked button
		
			// if(d3.select(this).style('background-color') === 'lightgrey'){
			// 	d3.select(this)
			// 		.style('background-color',function(d){
			// 			return d.values[0].colorCode;
			// 		})
			// }else{
			// 	d3.select(this)
			// 		.style('background-color','lightgrey')
					
			// }

			//change the color of the clicked line
			if(d3.select(`#${ui_buttons[i].line_key}`).style('stroke') === 'grey'){
				d3.select(`#${ui_buttons[i].line_key}`)
					.style('stroke',function(d){
							return d.values[0].colorCode
					})
					.style('stroke-width','2px');
			}else{
				d3.select(`#${ui_buttons[i].line_key}`)
					.style('stroke','grey')
					.style('stroke-width','0.4px');
			}

			
			
		})

		// var clickTimes = 0;

		// //select button with its id
		// d3.select(`#${ui_buttons[i].btn_id}`).on('click', function(){
			
		
			

		// 	// Determine if current line is visible
		// 	clickTimes++;

		// 	if(clickTimes%2 !== 0){

		// 		d3.select(`#${ui_buttons[i].line_key}`)//select the normalised line with its id
		// 		.style('stroke',d => {
		// 			console.log(d.values[0].colorCode);

		// 			return d.values[0].colorCode})
		// 		.style('stroke-width','2px');

		// 	}else{

		// 		d3.select(`#${ui_buttons[i].line_key}`)
		// 			.style('stroke','grey')
		// 			.style('stroke-width','0.4px');
		// 	}
		
		
		// })

	}
}



export {
	drawNormalisedLineChart,
	drawActualLineChart,
	clickButton
};

