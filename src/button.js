import * as d3 from 'd3';
import {ui_buttons} from './data';
import{
	nest, sum, select
} from 'd3';
import {
	drawTreemap,
	drawTreemap_sub
} from './ViewModules/Treemap';


var isSelected = false;
var selected_cata=[];

function clickButton(normalisedData,subfunctionData){

	//Click 'Clear' 
	d3.select('#clear').on('click',function(){
		console.log('Clear');

		drawTreemap(d3.select('.composition-container').node(),subfunctionData,2000);
		
		isSelected = false;

		d3.selectAll('.line')
			.style('stroke','grey')
			.style('stroke-width','0.4px');
		
		d3.selectAll('.btn')
			.style('background-color','rgb(211,211,211)')

		selected_cata=[];

			
	})


	//Click each function button 
	for(let i=0;i<ui_buttons.length;i++){

		d3.select(`#${ui_buttons[i].btn_id}`).on('click', function(){

			isSelected = true;
		
			console.log(`click ${ui_buttons[i].btn_label}`);
			
			select("#button_holder").text(`${ui_buttons[i].btn_label}`);
			selected_cata.push(`${ui_buttons[i].btn_label}`);

			var slt_yr = select("#years_holder").text();
			console.log("test slt",slt_yr);

			drawTreemap_sub(d3.select('.composition-container').node(),subfunctionData,slt_yr,selected_cata);



			//change the color of clicked button
			var btnColour = d3.select(`#${ui_buttons[i].btn_id}`).style('background-color');

			if(btnColour === 'rgb(211, 211, 211)'){
				const colorCode = d3.select(`#${ui_buttons[i].btn_id}`)
					.style('background-color',function(){
						
						const lineColor = normalisedData.filter(d => d.key === ui_buttons[i].line_key);
						
						const code = lineColor[0].values[0].colorCode;
						console.log(code);

						return code;
						
				});
				
			}else{
				d3.select(`#${ui_buttons[i].btn_id}`)	
					.style('background-color','rgb(211, 211, 211)');
			}

			// if(d3.select(this).style('background-color') === 'rgb(211,211,211)'){
			// 	console.log('grey');

			// 	d3.select(this)
			// 		.style('background-color',function(d){
			// 			return 'blue'
			// 			//return d.values[0].colorCode;
			// 			//console.log(d.values[0].colorCode)
			// 		})
			// }else{
			// 	console.log('red');
			// 	d3.select(this)
			// 		.style('background-color','red')
					
			// }
			


			//change the color of the clicked line
			if(d3.select(`#${ui_buttons[i].line_key}`).style('stroke') === 'grey'){
				
				d3.select(`#${ui_buttons[i].line_key}`)
					.style('stroke',function(d){
							return d.values[0].colorCode
					})
					.style('stroke-width','2px');

				d3.select(`#${ui_buttons[i].line_key}_actual`)
					.style('stroke',function(d){
							return d.values[0].colorCode
					})
					.style('stroke-width','2px');

			}else{

				d3.select(`#${ui_buttons[i].line_key}`)
					.style('stroke','grey')
					.style('stroke-width','0.4px');

				d3.select(`#${ui_buttons[i].line_key}_actual`)
					.style('stroke','grey')
					.style('stroke-width','0.4px');

			}
	
		})

	}


}

export default clickButton;
