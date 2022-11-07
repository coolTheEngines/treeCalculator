const languageEN = "EN";
const languageRU = "RU";

const metricUK = "metricUK";
const metricEU = "metricEU";

const metricMultiplierEU = Number(0.453592);

let height = Number(5);
let diameter = Number(0.25);
let age = Number(2);
let language = languageEN;
let metric = metricUK;

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
    changeMetriсValues();
}

//W
// For trees with D &lt; 11: W = 0.25D^2 *H
// For trees with D &gt;= 11: W = 0.15D^2 *H
let greenWeight;
let greenWeightKg;

function calcGreenWeight() {
    let multiplier = Number(diameter) < 11 ? 0.25 : 0.15;
    let res = multiplier * Number(height) * Math.pow(Number(diameter), 2);
    greenWeight = Number(res);
    greenWeightKg = Number(res * metricMultiplierEU);
}

//DW
// DW=W*72,5%
let dryWeight;
let dryWeightKg;

function calcDryWeight() {
    let res = greenWeight * 0.725;
    dryWeight = Number(res);
    dryWeightKg = Number(res * metricMultiplierEU);
    console.log("1dryWeight " + dryWeight );
    console.log("1dryWeightKg " + dryWeightKg );
}

//WC
//WC = DW * 50%
let weightOfCarbon;
let weightOfCarbonKg;

function calcWeightOfCarbon() {
    let res = dryWeight * 0.5;
    weightOfCarbon = Number(res);
    weightOfCarbonKg = Number(res * metricMultiplierEU);
}

//WCO2
//WCO2=WC * 3.6663^6
let weightOfCarbonDioxide;
let weightOfCarbonDioxideKg;

function calcWeightOfCarbonDioxide() {

    let res = weightOfCarbon * Math.pow(3.6663, 6);
    weightOfCarbonDioxide = Number(res);
    weightOfCarbonDioxideKg = Number(res * metricMultiplierEU);
}

let weightOfCO2;
let weightOfCO2Kg;
// WCO2 / age of the tree
function calcWeightOfCO2() {
    let res = weightOfCarbonDioxide / age;
    weightOfCO2 = Number(res);
    weightOfCO2Kg = Number(res * metricMultiplierEU);
}

function round(x) {
    if (x > 10) {
        return Math.round(x);
    } else if (10 > x > 1) {
        return x.toFixed(1);
    } else {
        let res = '';
        console.log("x = " , x);
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

function changeLanguage() {
    if (language === languageEN) {
        language = languageRU;
    } else {
        language = languageEN;
    }
    translate();
    calc();
}

function changeMetricSystem() {
    if (metric === metricUK) {
        metric = metricEU;
    } else {
        metric = metricUK;
    }
    changeMetricNaming();
    changeMetriсValues();
}

function changeMetricNaming() {
    if (metric === metricUK && language === languageEN) {
        document.getElementsByName('heightParam').forEach(el => el.innerHTML = "meters");
        document.getElementsByName('diameterParam').forEach(el => el.innerHTML = "meters");
        document.getElementsByName('weightResult').forEach(el => el.innerHTML = "kg");
    } else if (metric === metricUK && language === languageRU) {
        document.getElementsByName('heightParam').forEach(el => el.innerHTML = "метры");
        document.getElementsByName('diameterParam').forEach(el => el.innerHTML = "метры");
        document.getElementsByName('weightResult').forEach(el => el.innerHTML = "кг");
    } else if (metric === metricEU && language === languageEN) {
        document.getElementsByName('heightParam').forEach(el => el.innerHTML = "feet");
        document.getElementsByName('diameterParam').forEach(el => el.innerHTML = "inches");
        document.getElementsByName('weightResult').forEach(el => el.innerHTML = "pounds");
    } else if (metric === metricEU && language === languageRU) {
        document.getElementsByName('heightParam').forEach(el => el.innerHTML = "футы");
        document.getElementsByName('diameterParam').forEach(el => el.innerHTML = "дюймы");
        document.getElementsByName('weightResult').forEach(el => el.innerHTML = "фунтов");
    }
}

function changeMetriсValues() {
    if (metric === metricUK) {
        document.getElementById('greenWeight').innerHTML = round(greenWeightKg);
        document.getElementById('dryWeight').innerHTML = round(dryWeightKg);
        document.getElementById('weightOfCarbon').innerHTML = round(weightOfCarbonKg);
        document.getElementById('weightOfCarbonDioxide').innerHTML = round(weightOfCarbonDioxideKg);
        document.getElementById('weightOfCO2').innerHTML = round(weightOfCO2Kg);

    } else if (metric === metricEU) {
        document.getElementById('greenWeight').innerHTML = round(greenWeight);
        document.getElementById('dryWeight').innerHTML = round(dryWeight);
        document.getElementById('weightOfCarbon').innerHTML = round(weightOfCarbon);
        document.getElementById('weightOfCarbonDioxide').innerHTML = round(weightOfCarbonDioxide);
        document.getElementById('weightOfCO2').innerHTML = round(weightOfCO2);
    }
}

function translate() {
    let rusResults = `
        <h4>Результаты:</h4>
        <div>Зеленый вес: <span id="greenWeight"></span>, <span name="weightResult">фунтов</span></div>
        <div>Сухой вес: <span id="dryWeight"></span>, <span name="weightResult">фунтов</span></div>
        <div>Вес углекислого газа: <span id="weightOfCarbon"></span>, <span name="weightResult">фунтов</span></div>
        <div>Вес выделенного углекислого газа: <span id="weightOfCarbonDioxide"></span>, <span name="weightResult">фунтов</span></div>
        <div>Вес СО2, секвестрированного за год: <span id="weightOfCO2"></span>, <span name="weightResult">фунтов</span></div>
   `;

    let engResults = `
        <h4>Tree results:</h4>
        <div>Green weight: <span id="greenWeight"></span>, <span name="weightResult">pounds</span></div>
        <div>Dry weight: <span id="dryWeight"></span>, <span name="weightResult">pounds</span></div>
        <div>Weight of carbon: <span id="weightOfCarbon"></span>, <span name="weightResult">pounds</span></div>
        <div>Weight of carbon dioxide sequestered: <span id="weightOfCarbonDioxide"></span>, <span name="weightResult">pounds</span></div>
        <div>Weight of CO2 sequestered per year: <span id="weightOfCO2"></span>, <span name="weightResult">pounds</span></div>
    `;

    let engParams =
        `
        <h4>Tree params</h4>
                <div>
                    <label for="height">Height, <span name="heightParam">feet</span></label><br>
                    <div class="d-flex align-items-center mt-2 mt-md-0">
                        <input type="number"
                               min="5"
                               max="116"
                               step="0.01"
                               id="height"
                               class="form-control"
                               value="5"
                               oninput="onInputHeight(value)"
                        >
                        <div style="padding-left: 1rem; flex: 1">
                            <input type="range"
                                   min="5"
                                   max="116"
                                   step="0.01"
                                   id="heightRange"
                                   name="heightRange"
                                   class="custom-range"
                                   oninput="onInputHeightRange(value)">
                            <div class="range-marks d-flex">
                                <div class="range-mark-min">5</div>
                                <div class="range-mark-max flex-grow text-right w-100">116</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="diameter">Diameter, <span name="diameterParam">inches</span></label><br>
                    <div class="d-flex align-items-center mt-2 mt-md-0">
                        <input type="number"
                               min="0.25"
                               max="4.84"
                               step="0.01"
                               id="diameter"
                               class="form-control"
                               value="0.25"
                               oninput="onInputDiameter(value)"
                        >
                        <div style="padding-left: 1rem; flex: 1">
                            <input type="range"
                                   min="0.25"
                                   max="4.84"
                                   step="0.01"
                                   id="diameterRange"
                                   name="diameterRange"
                                   class="custom-range"
                                   oninput="onInputDiameterRange(value)">
                            <div class="range-marks d-flex">
                                <div class="range-mark-min">0.25</div>
                                <div class="range-mark-max flex-grow text-right w-100">4.84</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="age">Age, <span name="ageParam">years</span></label><br>
                    <div class="d-flex align-items-center mt-2 mt-md-0">
                        <input type="number"
                               min="2"
                               max="500"
                               id="age"
                               class="form-control"
                               value="2"
                               oninput="onInputAge(value)"
                        >
                        <div style="padding-left: 1rem; flex: 1">
                            <input type="range"
                                   min="2"
                                   max="500"
                                   id="diameterAge"
                                   name="diameterAge"
                                   class="custom-range"
                                   oninput="onInputAgeRange(value)">
                            <div class="range-marks d-flex">
                                <div class="range-mark-min">2</div>
                                <div class="range-mark-max flex-grow text-right w-100">500</div>
                            </div>
                        </div>
                    </div>
                </div>`;

    let ruParams =
        `
        <h4>Параметры дерева</h4>
                <div>
                    <label for="height">Высоты, <span name="heightParam">футы</span></label><br>
                    <div class="d-flex align-items-center mt-2 mt-md-0">
                        <input type="number"
                               min="5"
                               max="116"
                               step="0.01"
                               id="height"
                               class="form-control"
                               value="5"
                               oninput="onInputHeight(value)"
                        >
                        <div style="padding-left: 1rem; flex: 1">
                            <input type="range"
                                   min="5"
                                   max="116"
                                   step="0.01"
                                   id="heightRange"
                                   name="heightRange"
                                   class="custom-range"
                                   oninput="onInputHeightRange(value)">
                            <div class="range-marks d-flex">
                                <div class="range-mark-min">5</div>
                                <div class="range-mark-max flex-grow text-right w-100">116</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="diameter">Диаметр, <span name="diameterParam">дюймы</span></label><br>
                    <div class="d-flex align-items-center mt-2 mt-md-0">
                        <input type="number"
                               min="0.25"
                               max="4.84"
                               step="0.01"
                               id="diameter"
                               class="form-control"
                               value="0.25"
                               oninput="onInputDiameter(value)"
                        >
                        <div style="padding-left: 1rem; flex: 1">
                            <input type="range"
                                   min="0.25"
                                   max="4.84"
                                   step="0.01"
                                   id="diameterRange"
                                   name="diameterRange"
                                   class="custom-range"
                                   oninput="onInputDiameterRange(value)">
                            <div class="range-marks d-flex">
                                <div class="range-mark-min">0.25</div>
                                <div class="range-mark-max flex-grow text-right w-100">4.84</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="age">Возраст, <span name="ageParam">годы</span></label><br>
                    <div class="d-flex align-items-center mt-2 mt-md-0">
                        <input type="number"
                               min="2"
                               max="500"
                               id="age"
                               class="form-control"
                               value="2"
                               oninput="onInputAge(value)"
                        >
                        <div style="padding-left: 1rem; flex: 1">
                            <input type="range"
                                   min="2"
                                   max="500"
                                   id="diameterAge"
                                   name="diameterAge"
                                   class="custom-range"
                                   oninput="onInputAgeRange(value)">
                            <div class="range-marks d-flex">
                                <div class="range-mark-min">2</div>
                                <div class="range-mark-max flex-grow text-right w-100">500</div>
                            </div>
                        </div>
                    </div>
                </div>`;

    let engHeader = `<h1>Calculator</h1>`;
    let ruHeader = `<h1>Калькулятор</h1>`

    if (language === languageEN) {
        document.getElementById('header').innerHTML = engHeader;
        document.getElementById('results').innerHTML = engResults;
        document.getElementById('params').innerHTML = engParams;
    } else {
        document.getElementById('header').innerHTML = ruHeader;
        document.getElementById('results').innerHTML = rusResults;
        document.getElementById('params').innerHTML = ruParams;
    }

}

document.addEventListener("DOMContentLoaded", function () {
    translate();
    calc();
});