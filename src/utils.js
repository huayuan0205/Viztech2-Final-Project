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
	// return functionBudget.reduce((acc,val)=>{
	// 	return acc.concat(val);
	// }, []);


	// return functionBudget.reduce((acc,val) => {
	// // 	acc[functionName] = functionName,
	// 	acc[val.year]=val.value;
	// 	return acc;
	// },{})

	//[
	//	{functionName: "National Defense", year:"2000",value:1.00}
	//		x18
	//]
	
}

export {
	parseColorCode,
	parseNormalisedData,
	parseActualData
}