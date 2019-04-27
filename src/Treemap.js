import * as d3 from 'd3';
import {nest, sum, hierarchy, treemap, select} from 'd3';


//let year = 2000;
const depthScale = d3.scaleOrdinal()
	.domain([0,1,2,3,4])
	.range([null, '#aee5d7','#03afeb']);


function drawTreemap(rootDOM, data, year){
	console.log("dataintree",data);
	const W = rootDOM.clientWidth;
	const H = rootDOM.clientHeight;
	const margin = {t:10, r:10, b:10, l:25};
	const w = W - margin.l - margin.r;
	const h = H - margin.t - margin.b;


	//Sort out data
	var dataByYear_func = nest()
			.key(d => d.year)
			.key(d => d.functionName)
			//.key(d => d.subfunctionName)
			.rollup(s => d3.sum(s, d => d.value_sub))
			.entries(data)
			.map(d => [+d.key, d.values]);

	console.log("check",dataByYear_func);
	

	//Set up a treemap
	const layout = treemap().size([w,h])
		.paddingInner(5)
		.paddingOuter(10)


	//convert to Map format
	const dataByYear = new Map(dataByYear_func);
	console.log("dby",dataByYear);


	//Convert to a treemap structure
	let treemapData = {
		key:'root',
		values:dataByYear.get(Number(year))
	};
	console.log("treemap in 2000",treemapData);//data in 2000


	//Convert to hierarchy structure
	treemapData = hierarchy(treemapData, d => d.values);
	treemapData.sum(d => d.value);


	//Layout using treemap
	layout(treemapData);
	console.log("layout-treemap",treemapData);


	//Label-Function
	const showFuncName = select('.function-name')
		.append('text')
		.text('Function')
		.attr('text-align','left')


	//Build DOM
	//Append svg
	const svg = select(rootDOM)
		.selectAll('svg')
		.data([1]);//make sure only create <svg> once

	const svgEnter = svg.enter()
			.append('svg');

	svgEnter
		.append('g').attr('class','plot');

	const plot = svg.merge(svgEnter)
		.attr('width', W)
		.attr('height', H)
		.select('.plot')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);


	//Update
	const nodes = plot.selectAll('.node')
		.data(treemapData.descendants());


	//Exit
	nodes.exit().remove();


	//Enter
	const nodesEnter = nodes.enter()
		.append('g')
		.attr('class','node')
		.on('mouseenter',function(d){
			//console.log(d.data.key,d.value);

			d3.select('.function-name')
				.text(d.data.key);
			
			d3.select(this)
			.select('rect')
			.style('fill-opacity',1)
		})
		.on('mouseleave',function(d){
			d3.select(this)
			.select('rect')
			.style('fill-opacity',0.5)
		});


	nodesEnter.append('rect');
	nodesEnter.append('text');

	nodesEnter.merge(nodes)
		.attr('transform',d =>`translate(${d.x0},${d.y0})`);

	nodesEnter.merge(nodes)
		.select('rect')
		.transition()
		.attr('width',d => d.x1-d.x0)
		.attr('height',d => d.y1-d.y0)
		.style('fill', d => depthScale(d.depth));

	nodesEnter.filter(d => d.depth === 0 )
		.select('rect')
		.style('fill','none')
		.style('stroke','none')
		.select('.text')
		.style('fill','none');

	nodesEnter.merge(nodes)
		.select('text')
		.attr('transform', d => `translate(${(d.x1-d.x0)/2}, ${(d.y1-d.y0)/2})`)
		.filter(d => (d.x1-d.x0)>30 && d.depth >0)
		.text(d => d.data.key)
		.attr('text-anchor','middle');
}



function drawTreemap_sub(rootDOM, data, year, selected_cata){
	console.log("dataintree",data);
	const W = rootDOM.clientWidth;
	const H = rootDOM.clientHeight;
	const margin = {t:10, r:10, b:10, l:25};
	const w = W - margin.l - margin.r;
	const h = H - margin.t - margin.b;

	console.log("+++++++++++++++++")

	//Sort out data
	const filtered = data.filter(d => d.functionName == selected_cata[selected_cata.length-1]);
	console.log("filtered Result ",filtered);
	var dataByYear_func = nest()
			.key(d => d.year)
			.key(d => d.functionName)
			.key(d => d.subfunctionName)
			.rollup(s => d3.sum(s, d => d.value_sub))
			.entries(filtered)
			.map(d => [+d.key, d.values]);

	console.log("check",dataByYear_func);
	

	//Set up a treemap
	const layout = treemap().size([w,h])
		.paddingInner(5)
		.paddingOuter(10)


	//convert to Map format
	const dataByYear = new Map(dataByYear_func);
	console.log("dby",dataByYear);


	//Convert to a treemap structure
	let treemapData = {
		key:'root',
		values:dataByYear.get(Number(year))
	};

	console.log("treemap in 2000",treemapData);//data in 2000


	//Convert to hierarchy structure
	treemapData = hierarchy(treemapData, d => d.values);
	treemapData.sum(d => d.value);


	//Layout using treemap
	layout(treemapData);
	console.log("layout-treemap",treemapData);


	//Label-Function
	const showFuncName = select('.function-name')
		.append('text')
		.text('Function')
		.attr('text-align','left')


	//Build DOM
	//Append svg
	const svg = select(rootDOM)
		.selectAll('svg')
		.data([1]);//make sure only create <svg> once

	const svgEnter = svg.enter()
			.append('svg');

	svgEnter
		.append('g').attr('class','plot');

	const plot = svg.merge(svgEnter)
		.attr('width', W)
		.attr('height', H)
		.select('.plot')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);


	//Update
	const nodes = plot.selectAll('.node')
		.data(treemapData.descendants());


	//Exit
	nodes.exit().remove();


	//Enter
	const nodesEnter = nodes.enter()
		.append('g')
		.attr('class','node')
		.on('mouseenter',function(d){
			//console.log(d.data.key,d.value);

			d3.select('.function-name')
				.text(d.data.key);
			
			d3.select(this)
			.select('rect')
			.style('fill-opacity',1)
		})
		.on('mouseleave',function(d){
			d3.select(this)
			.select('rect')
			.style('fill-opacity',0.5)
		});


	nodesEnter.append('rect');
	nodesEnter.append('text');

	nodesEnter.merge(nodes)
		.attr('transform',d =>`translate(${d.x0},${d.y0})`);

	nodesEnter.merge(nodes)
		.select('rect')
		.transition()
		.attr('width',d => d.x1-d.x0)
		.attr('height',d => d.y1-d.y0)
		.style('fill', d => depthScale(d.depth));

	nodesEnter.filter(d => d.depth === 0 )
		.select('rect')
		.style('fill','none')
		.style('stroke','none')
		.select('.text')
		.style('fill','none');

	nodesEnter.merge(nodes)
		.select('text')
		.attr('transform', d => `translate(${(d.x1-d.x0)/2}, ${(d.y1-d.y0)/2})`)
		.filter(d => (d.x1-d.x0)>30 && d.depth >0)
		.text(d => d.data.key)
		.attr('text-anchor','middle');

}



export {
	drawTreemap,
	drawTreemap_sub
}
	



	//console.log('data in treemap');
	//console.log(data);

	

	// const nodes = plot.selectAll('.node')
	// 	.data(treemapData.descendants().filter(d => d.height < 2), d => d.data.key || d.data.dest_name);

	// nodes.exit().remove();

	// const nodesEnter = nodes.enter()
	// 	.append('g').attr('class','node');
	// nodesEnter.append('rect');
	// nodesEnter.append('text');

	// const nodesCombined = nodes.merge(nodesEnter);
	// nodesCombined
	// 	.transition()
	// 	.attr('transform', d => `translate(${d.x0}, ${d.y0})`);
	// nodesCombined
	// 	.select('rect')
	// 	.transition()
	// 	.attr('width', d => d.x1 - d.x0)
	// 	.attr('height', d => d.y1 - d.y0);
	// nodesCombined
	// 	.select('text')
	// 	.attr('transform', d => `translate(${(d.x1-d.x0)/2}, ${(d.y1-d.y0)/2})`)
	// 	.attr('text-anchor','middle')
	// 	.filter(d => (d.x1-d.x0)>30 && d.depth===2)
	// 	.text(d => d.data.key || d.data.dest_name);
	// nodesCombined.filter(d => d.depth ===1 )
	// 	.select('rect')
	// 	.style('fill','none')
	// 	.style('stroke','none')
	// 	//.style('stroke','#ccc')
	// 	//.style('stroke-width','1px');
	// nodesCombined.filter(d => d.depth ===2 )
	// 	.select('rect')
	// 	.style('fill-opacity', .2)







	

	
	// 	//Build DOM
	// 	//Append new <svg> only once with enter/exit/update hack
	// 	const svg = select(rootDOM)
	// 		.selectAll('svg')
	// 		.data([1]);
	// 	const svgEnter = svg.enter()
	// 		.append('svg');
	// 	svgEnter
	// 		.append('g').attr('class','plot');

	// 	const plot = svg.merge(svgEnter)
	// 		.attr('width', W)
	// 		.attr('height', H)
	// 		.select('.plot')
	// 		.attr('transform', `translate(${margin.l}, ${margin.t})`);

	// 	const nodes = plot.selectAll('.node')
	// 		.data(treemapData.descendants().filter(d => d.height < 2), d => d.data.key || d.data.dest_name);

	// 	nodes.exit().remove();

	// 	const nodesEnter = nodes.enter()
	// 		.append('g').attr('class','node');
	// 	nodesEnter.append('rect');
	// 	nodesEnter.append('text');

	// 	const nodesCombined = nodes.merge(nodesEnter);
	// 	nodesCombined
	// 		.transition()
	// 		.attr('transform', d => `translate(${d.x0}, ${d.y0})`);
	// 	nodesCombined
	// 		.select('rect')
	// 		.transition()
	// 		.attr('width', d => d.x1 - d.x0)
	// 		.attr('height', d => d.y1 - d.y0);
	// 	nodesCombined
	// 		.select('text')
	// 		.attr('transform', d => `translate(${(d.x1-d.x0)/2}, ${(d.y1-d.y0)/2})`)
	// 		.attr('text-anchor','middle')
	// 		.filter(d => (d.x1-d.x0)>30 && d.depth===2)
	// 		.text(d => d.data.key || d.data.dest_name);
	// 	nodesCombined.filter(d => d.depth ===1 )
	// 		.select('rect')
	// 		.style('fill','none')
	// 		.style('stroke','none')
	// 		//.style('stroke','#ccc')
	// 		//.style('stroke-width','1px');
	// 	nodesCombined.filter(d => d.depth ===2 )
	// 		.select('rect')
	// 		.style('fill-opacity', .2)
	// }

	// exportFunction.year = function(_){
	// 	year = _;
	// 	return this;
	// }

