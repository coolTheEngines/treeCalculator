let height = 500;
let diameter = 500;
let age = 500;



function onInputHeight(val) {
    height = Number(val);
    document.getElementById('heightRange').value = val;
    calc();
}

function onInputHeightRange(val) {
    height = Number(val);
    document.getElementById('height').value = val;
    calc();
}

function onInputDiameter(val) {
    diameter = Number(val);
    document.getElementById('diameterRange').value = val;
    calc();
}

function onInputDiameterRange(val) {
    diameter = Number(val);
    document.getElementById('diameter').value = val;
    calc();
}

function onInputAge(val) {
    age = Number(val);
    document.getElementById('ageRange').value = val;
    calc();
}

function onInputAgeRange(val) {
    age = Number(val);
    document.getElementById('age').value = val;
    calc();
}

function calc() {
    calcGreenWeight();
    calcDryWeight();
    calcWeightOfCarbon();
    calcWeightOfCarbonDioxide();
    calcWeightOfCO2();
}
//W
let greenWeight;
    function calcGreenWeight() {
    let multiplier = Number(diameter) < 11 ? 0.25 : 0.15;
    let res = multiplier * Number(height) * Math.pow(Number(diameter), 2);
    greenWeight = res;
    document.getElementById('greenWeight').innerHTML = round(res);
}
//DW
let dryWeight;
function calcDryWeight() {
    let res = greenWeight * 0.725;
    dryWeight = res;
    document.getElementById('dryWeight').innerHTML = round(res);
}

//WC
let weightOfCarbon;
function calcWeightOfCarbon() {
    let res = dryWeight * 0.5;
    weightOfCarbon = res;
    document.getElementById('weightOfCarbon').innerHTML = round(res);
}

//WCO2
let weightOfCarbonDioxide;
function calcWeightOfCarbonDioxide() {

    let res = weightOfCarbon * Math.pow(3.6663, 6);
    weightOfCarbonDioxide = res;
    document.getElementById('weightOfCarbonDioxide').innerHTML = round(res);
}

//let weightOfCO2;
function calcWeightOfCO2() {
    let res = weightOfCarbonDioxide / age;
    weightOfCO2 = res;
    document.getElementById('weightOfCO2').innerHTML = round(res);
}

function round(x) {
    if (x > 10) {
        return Math.round(x);
    } else if( 10 > x > 1) {
        return x.toFixed(1);
    } else {
        let res = '';
        for(let c of x.toString()) {
            if(c != '.' && c !== '.' && c != ',' && c !== ',' && c != '0') {
                res += c;
                return Number(res);
            } else {
                res += c;
            }
        }
        return Number(x);
    }
}