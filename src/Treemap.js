import * as d3 from 'd3';
import{
	nest, sum, select
} from 'd3';


function renderTreemap(rootNode, rootDOM){

	const W = rootDOM.clientWidth;
	const H = rootDOM.clientHeight;
	const w = W - margin.l - margin.r;
	const h = H - margin.t - margin.b;


	const plot = d3.select(rootDOM)
		.append('svg')
		.attr('width', W)
		.attr('height', H)
		.append('g')
		.attr('class','plot')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);


	console.group('treemap');
	
	const treemapTransform = d3.treemap().size([w,h])//this is a function
	const dataTransformed = treemapTransform(rootNode);//take in real data, return pixel vaule
	
	const nodesData = dataTransformed.descendants();
	const linksData = dataTransformed.links();

	console.log('nodesData');
	console.log(nodesData);
	console.log('dataTransformed');
	console.log(dataTransformed);

	const nodes = plot.selectAll('.node')
		.data(nodesData)

	const nodesEnter = nodes.enter()
		.append('g')
		.attr('class','node')
		.on('mouseenter',function(d){
			console.log(d.data.name,d.value)
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
		.attr('transform',function(d){
			return `translate(${d.x0},${d.y0})`;
		});

	nodesEnter.merge(nodes)
		.select('rect')
		.attr('width',function(d){return d.x1-d.x0})
		.attr('height',function(d){return d.y1-d.y0})
		.style('fill',function(d){return depthScale(d.depth);
		});

	nodesEnter.merge(nodes)
		.filter(function(d){return d.depth <2})
		.select('text')
		.text(function(d){return `${d.data.name}:${d.value}`
		})
		.attr('x',function(d){return (d.x1-d.x0)/2})
		.attr('y',function(d){return (d.y1-d.y0)/2})
		.attr('text-anchor','middle');



	console.groupEnd();

}

export default renderTreemap