const calculateBtn = document.getElementById('calculateBtn');
const cyclesElem = document.getElementById('cycles');
const mfElem = document.getElementById('mf');
const stockElem = document.getElementById('stock');
const plantsElem = document.getElementById('plants');

calculateBtn.onclick = evalValues;

function evalValues(){

    let myValues = {
        'cycles': Number(cyclesElem.value), 
        'mf': Number(mfElem.value),
        'stock': Number(stockElem.value), 
        'plants': Number(plantsElem.value)
    };

    //get keys with a value of zero (=== 0)
    let zeros = Object.keys(myValues).filter((key) => myValues[key] === 0);

    //check for stopping conditions
    if(zeros.length === 0){console.log('whoopsie daisy, please remove a value'); return null;}
    if(zeros.length > 1){ console.log('missing some values?'); return null;}
    
    //call the correct calculation
    switch(zeros[0]){
        case 'cycles':
            calculateCycles(myValues);
            break;
        case 'mf':
            calculateMultiplicationFactor(myValues);
            break;
        case 'stock':
            calculateStock(myValues);
            break;
        case 'plants':
            calculatePlants(myValues);
            break;
    }

    //display the calculated values on screen
    assignValues(myValues)
}

function calculateCycles(myValues){
    myValues.cycles = Math.ceil((log(myValues.plants)-log(myValues.stock))/log(myValues.mf));
}

function calculateMultiplicationFactor(myValues){
    myValues.mf = (myValues.plants/myValues.stock)**(1/myValues.cycles);
}

function calculateStock(myValues){
    myValues.stock=Math.ceil(myValues.plants/(myValues.mf**myValues.cycles));
}

function calculatePlants(myValues){
    myValues.plants = (myValues.mf**myValues.cycles)*myValues.stock;
}

function assignValues(myValues){
    cyclesElem.value = myValues.cycles;
    mfElem.value = myValues.mf;
    stockElem.value = myValues.stock;
    plantsElem.value = myValues.plants;
}