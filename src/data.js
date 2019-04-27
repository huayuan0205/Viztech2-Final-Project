import {
	parseColorCode,
	parseNormalisedData,
	parseActualData,
	parseSubfunctionData
} from './utils';
import drawLineChart from './ViewModules/LineChart';
import * as d3 from 'd3';
import {
	csv, nest, map
} from 'd3';



const colorCodePromise = csv('./data/Color.csv', parseColorCode)
	.then(data => {
		return new Map(data);
	});
// console.log("colorCodePromise");
// console.log(colorCodePromise);


const actualDataPromise = d3.csv('./data/actual_Amount.csv', parseActualData)
	.then(data => data.reduce((acc,val) => acc.concat(val), []))
// console.group('actualDataPromise');
// console.log(actualDataPromise);
// console.groupEnd();


const normalisedDataPromise = d3.csv('./data/normalised-Amount.csv', parseNormalisedData)
	.then(data => data.reduce((acc,val) => acc.concat(val), []))
	
// console.group('normalisedDataPromise');
// console.log(normalisedDataPromise);
// console.groupEnd();


const subfunctionDataPromise = d3.csv('./data/func_subfunc.csv', parseSubfunctionData)
	.then(data => data.reduce((acc,val) => acc.concat(val), []))
// console.group('subfunctionDataPromise');
// console.log(subfunctionDataPromise);
// console.groupEnd();


const normalisedDataCombined = Promise.all([
		colorCodePromise,
		normalisedDataPromise,
	])
	.then(([colorCode, normalisedData]) => {

		const normalisedAddColor = normalisedData.map(d => {

			const color_code = colorCode.get(d.functionCode);
			
			//Add color property
			d.colorCode = color_code;

			return d;
		});


		const normalisedAugmented = d3.nest()
			.key(d => d.functionName)
			.entries(normalisedAddColor);

		console.group('normalisedAugmented');
		console.log(normalisedAugmented);
		console.groupEnd();


		return normalisedAugmented;
		
	})


const actualDataCombined = Promise.all([
		colorCodePromise,
		actualDataPromise
	])
	.then(([colorCode, actualData]) => {


		const actualAddColor = actualData.map(d => {

			const color_code = colorCode.get(d.functionCode);
			
			//Add color property
			d.colorCode = color_code;

			return d;
		});


		const actualAugmented = d3.nest()
			.key(d => d.functionName)
			.entries(actualAddColor);

		console.group('actualAugmented');
		console.log(actualAugmented);
		console.groupEnd();

		
		return actualAugmented;
		
	})


var ui_buttons = [
{btn_id:'national_defense', btn_label:'National Defense',line_key:'National_Defense'},
{btn_id:'international_affairs', btn_label:'International Affairs',line_key:'International_Affairs'},
{btn_id:'general_science_space_and_technology', btn_label:'General Science Space and Technology',line_key:'General_Science_Space_and_Technology'},
{btn_id:'energy', btn_label:'Energy',line_key:'Energy'},
{btn_id:'natural_resources_and_environment', btn_label:'Natural Resources and Environment',line_key:'Natural_Resources_and_Environment'},
{btn_id:'agriculture', btn_label:'Agriculture',line_key:'Agriculture'},
{btn_id:'commerce_and_housing_credit', btn_label:'Commerce and Housing Credit',line_key:'Commerce_and_Housing_Credit'},
{btn_id:'transportation', btn_label:'Transportation',line_key:'Transportation'},
{btn_id:'community_and_regional_development', btn_label:'Community and Regional Development',line_key:'Community_and_Regional_Development'},
{btn_id:'education_training_employment_and_social_services', btn_label:'Education Training Employment and Social Services',line_key:'Education_Training_Employment_and_Social_Services'},
{btn_id:'health', btn_label:'Health',line_key:'Health'},
{btn_id:'medicare', btn_label:'Medicare',line_key:'Medicare'},
{btn_id:'income_security', btn_label:'Income Security',line_key:'Income_Security'},
{btn_id:'social_security', btn_label:'Social Security',line_key:'Social_Security'},
{btn_id:'veterans_benefits_and_services', btn_label:'Veterans Benefits and Services',line_key:'Veterans_Benefits_and_Services'},
{btn_id:'administration_of_justice', btn_label:'Administration of Justice',line_key:'Administration_of_Justice'},
{btn_id:'general_government', btn_label:'General Government',line_key:'General_Government'},
{btn_id:'net_interest', btn_label:'Net Interest',line_key:'Net_Interest'},
{btn_id:'undistributed_offsetting_receipts', btn_label:'Undistributed Offsetting Receipts',line_key:'Undistributed_Offsetting_Receipts'}
]


export {
	normalisedDataPromise,
	colorCodePromise,
	normalisedDataCombined,
	actualDataCombined,
	ui_buttons,
	subfunctionDataPromise
}