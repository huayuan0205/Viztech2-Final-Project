function parseColorCode(d){
	return [
		d.Code.padStart(3, '0'),
		d['Color']
	]
}


function parseActualData(d){

	const functionBudget = [];
	const functionCode = d.Code;
	const functionName = d.Function;
	const functionFullName = d['Show Name'];
	

	delete d.Code;
	delete d.Function;
	delete d['Show Name'];


	if(functionName === '') return;


	for(let key in d){
		const year = key;
		const acValue = d[key];

		if(acValue !== '...'){
			functionBudget.push({
				functionCode,
				functionName,
				functionFullName,
				year,
				value_actual: +acValue.replace(/,/g, '')
			})
		}
	}

	return functionBudget;
	
}


function parseNormalisedData(d){

	const functionBudget = [];
	const functionCode = d.Code;
	const functionName = d.Function;
	const functionFullName = d['Show Name'];
	
	delete d.Code;
	delete d.Function;
	delete d['Show Name'];


	if(functionName === '') return;

	for(let key in d){
		const year = key;
		const nmValue = d[key];

		if(nmValue !== '...'){
			functionBudget.push({
				functionCode,
				functionName,
				functionFullName,
				year,
				value_normalised: +nmValue.replace(/,/g, '')
			})
		}
	}

	return functionBudget;
	
}

function parseSubfunctionData(d){

	const subfunctionBudget = [];
	const functionName = d.Function;
	const subfunctionName = d.Subfunction
	//const functionFullName = d['Show Name'];
	

	delete d.Function;
	delete d['Function Code'];
	delete d.Subfunction;
	delete d['Subfunction Name'];
	delete d['Subfunction Code'];


	if(functionName === '') return;


	for(let key in d){
		const year = key;
		const subValue = d[key];

		if(subValue !== '...'){
			subfunctionBudget.push({
				functionName,
				subfunctionName,
				year,
				value_sub: +subValue.replace(/,/g, '')
			})
		}
	}

	return subfunctionBudget;
	
}

export {
	parseColorCode,
	parseNormalisedData,
	parseActualData,
	parseSubfunctionData
}