let height = Number(5);
let diameter = Number(0.25);
let age = Number(2);

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
// For trees with D &lt; 11: W = 0.25D^2 *H
// For trees with D &gt;= 11: W = 0.15D^2 *H
let greenWeight;

function calcGreenWeight() {
    let multiplier = Number(diameter) < 11 ? 0.25 : 0.15;
    let res = multiplier * Number(height) * Math.pow(Number(diameter), 2);
    greenWeight = res;
    document.getElementById('greenWeight').innerHTML = round(res);
}

//DW
// DW=W*72,5%
let dryWeight;

function calcDryWeight() {
    let res = greenWeight * 0.725;
    dryWeight = res;
    document.getElementById('dryWeight').innerHTML = round(res);
}

//WC
//WC = DW * 50%
let weightOfCarbon;

function calcWeightOfCarbon() {
    let res = dryWeight * 0.5;
    weightOfCarbon = res;
    document.getElementById('weightOfCarbon').innerHTML = round(res);
}

//WCO2
//WCO2=WC * 3.6663^6
let weightOfCarbonDioxide;

function calcWeightOfCarbonDioxide() {

    let res = weightOfCarbon * Math.pow(3.6663, 6);
    weightOfCarbonDioxide = res;
    document.getElementById('weightOfCarbonDioxide').innerHTML = round(res);
}

//let weightOfCO2;
// WCO2 / age of the tree
function calcWeightOfCO2() {
    let res = weightOfCarbonDioxide / age;
    weightOfCO2 = res;
    document.getElementById('weightOfCO2').innerHTML = round(res);
}

function round(x) {
    if (x > 10) {
        return Math.round(x);
    } else if (10 > x > 1) {
        return x.toFixed(1);
    } else {
        let res = '';
        for (let c of x.toString()) {
            if (c != '.' && c !== '.' && c != ',' && c !== ',' && c != '0') {
                res += c;
                return Number(res);
            } else {
                res += c;
            }
        }
        return Number(x);
    }
}

function openUrl(url) {
    window.open(url);
}

document.addEventListener("DOMContentLoaded", function () {
    calc();
});