const languageEN = "EN";
const languageRU = "RU";

const metricUK = "metricUK";
const metricEU = "metricEU";

const metricMultiplierEU = Number(0.453592);

//values in meters
let heightMax = Number(116);
let diameterMax = Number(4.84);
let ageMax = Number(500);
let treeCountMax = Number(1000);

//values in meters
let heightMin = Number(5);
let diameterMin = Number(0.25);
let ageMin = Number(2);
let treeCountMin = Number(1);

//values in meters
let height = Number(5);
let diameter = Number(0.25);
let age = Number(2);
let treeCount = Number(1);

let language = languageEN;
let metric = metricEU;

function inputInit() {
    onInputHeight(height);
    onInputDiameter(diameter);
    onInputAge(age);
    onInputTreeCount(treeCount);
}

function minMaxValuesInit() {
    if (metric === metricEU) {
        document.getElementById('height').min = heightMin;
        document.getElementById('height').max = heightMax;
        document.getElementById('heightRange').min = heightMin;
        document.getElementById('heightRange').max = heightMax;

        document.getElementById('diameter').min = diameterMin;
        document.getElementById('diameter').max = diameterMax;
        document.getElementById('diameterRange').min = diameterMin;
        document.getElementById('diameterRange').max = diameterMax;
    } else {
        document.getElementById('height').min = round(heightMin / metricMultiplierEU);
        document.getElementById('height').max = round(heightMax / metricMultiplierEU);
        document.getElementById('heightRange').min = round(heightMin / metricMultiplierEU);
        document.getElementById('heightRange').max = round(heightMax / metricMultiplierEU);

        document.getElementById('diameter').min = round(diameterMin / metricMultiplierEU);
        document.getElementById('diameter').max = round(diameterMax / metricMultiplierEU);
        document.getElementById('diameterRange').min = round(diameterMin / metricMultiplierEU);
        document.getElementById('diameterRange').max = round(diameterMax / metricMultiplierEU);
    }
}

function onInputHeight(val) {
    height = Number(val);
    document.getElementById('heightRange').value = val;
    changeHeightSvgIcon();
    calc();
}

function onInputHeightRange(val) {
    height = Number(val);
    document.getElementById('height').value = val;
    changeHeightSvgIcon();
    calc();
}

function onInputDiameter(val) {
    diameter = Number(val);
    document.getElementById('diameterRange').value = val;
    changeDiameterSvgIcon();
    calc();
}

function onInputDiameterRange(val) {
    diameter = Number(val);
    document.getElementById('diameter').value = val;
    changeDiameterSvgIcon();
    calc();
}

function onInputAge(val) {
    age = Number(val);
    document.getElementById('ageRange').value = val;
    changeAgeSvgIcon();
    calc();
}

function onInputAgeRange(val) {
    age = Number(val);
    document.getElementById('age').value = val;
    changeAgeSvgIcon();
    calc();
}

function onInputTreeCount(val) {
    treeCount = Number(val);
    document.getElementById('treeCountRange').value = val;
    changeTreeCountSvgIcon();
    calc();
}

function onInputTreeCountRange(val) {
    treeCount = Number(val);
    document.getElementById('treeCount').value = val;
    changeTreeCountSvgIcon();
    calc();
}

function calc() {
    calcGreenWeight();
    calcDryWeight();
    calcWeightOfCarbon();
    calcWeightOfCarbonDioxide();
    calcWeightOfCO2();
    updateMetricValues();
}

//W
// For trees with D &lt; 11: W = 0.25D^2 *H
// For trees with D &gt;= 11: W = 0.15D^2 *H
let greenWeight;
let greenWeightKg;

function calcGreenWeight() {
    let multiplier = Number(diameter) < 11 ? 0.25 : 0.15;
    let res = multiplier * Number(height) * Math.pow(Number(diameter), 2) * treeCount;
    greenWeight = Number(res);
    greenWeightKg = Number(res * metricMultiplierEU);
}

//DW
// DW=W*72,5%
let dryWeight;
let dryWeightKg;

function calcDryWeight() {
    let res = greenWeight * 0.725 * treeCount;
    dryWeight = Number(res);
    dryWeightKg = Number(res * metricMultiplierEU);
}

//WC
//WC = DW * 50%
let weightOfCarbon;
let weightOfCarbonKg;

function calcWeightOfCarbon() {
    let res = dryWeight * 0.5 * treeCount;
    weightOfCarbon = Number(res);
    weightOfCarbonKg = Number(res * metricMultiplierEU);
}

//WCO2
//WCO2=WC * 3.6663^6
let weightOfCarbonDioxide;
let weightOfCarbonDioxideKg;

function calcWeightOfCarbonDioxide() {
    let res = weightOfCarbon * Math.pow(3.6663, 6) * treeCount;
    weightOfCarbonDioxide = Number(res);
    weightOfCarbonDioxideKg = Number(res * metricMultiplierEU);
}

let weightOfCO2;
let weightOfCO2Kg;

// WCO2 / age of the tree
function calcWeightOfCO2() {
    let res = weightOfCarbonDioxide / age * treeCount;
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

function changeLanguage(lang) {
    if (lang === languageEN) {
        language = languageEN;
    } else {
        language = languageRU;
    }
    changeLanguageActive();
    translate();
}

function onMouseOverMetricMeters() {
    let metersLabel = document.getElementById("metersLabelId");
    let metersLabelLine = document.getElementById("metersLabelLineId");
    let feetLabel = document.getElementById("feetLabelId");
    let feetLabelLine = document.getElementById("feetLabelLineId");
    let engName = document.getElementById("engName");
    let engLine = document.getElementById("engLine");
    let rusName = document.getElementById("rusName");
    let rusLine = document.getElementById("rusLine");

    metersLabel.onmouseover = function () {
        metersLabelLine.setAttribute("class", "parameter-type-active-line");
    }
    metersLabel.onmouseout = function () {
        metersLabelLine.setAttribute("class", "parameter-type-inactive-line");
    }
    feetLabel.onmouseover = function () {
        feetLabelLine.setAttribute("class", "parameter-type-active-line");
    }
    feetLabel.onmouseout = function () {
        feetLabelLine.setAttribute("class", "parameter-type-inactive-line");
    }
    engName.onmouseover = function () {
        engLine.setAttribute("class", "lang-button-active-line");
    }
    engName.onmouseout = function () {
        engLine.setAttribute("class", "lang-button-inactive-line");
    }
    rusName.onmouseover = function () {
        rusLine.setAttribute("class", "lang-button-active-line");
    }
    rusName.onmouseout = function () {
        rusLine.setAttribute("class", "lang-button-inactive-line");
    }

}

function onMouseOverPartnerLogo() {
    let utmnLogo = document.getElementById("utmnLogoId");
    let carbonLogo = document.getElementById("carbonLogoId");
    let siburLogo = document.getElementById("siburLogoId");
    let cityLogo = document.getElementById("cityLogoId");

    utmnLogo.onmouseover = function () {
        utmnLogo.style.opacity = "1";
    }
    utmnLogo.onmouseout = function () {
        utmnLogo.style.opacity = "0.5";
    }
    carbonLogo.onmouseover = function () {
        carbonLogo.style.opacity = "1";
    }
    carbonLogo.onmouseout = function () {
        carbonLogo.style.opacity = "0.5";
    }
    siburLogo.onmouseover = function () {
        siburLogo.style.opacity = "1";
    }
    siburLogo.onmouseout = function () {
        siburLogo.style.opacity = "0.5";
    }
    cityLogo.onmouseover = function () {
        cityLogo.style.opacity = "1";
    }
    cityLogo.onmouseout = function () {
        cityLogo.style.opacity = "0.5";
    }
}

function changeMetricSystem(val) {
    if (val === metricUK) {
        metric = metricUK;
    } else {
        metric = metricEU;
    }
    changeMetricNaming();
    updateMetricValues();
    minMaxValuesInit();
    changeMetricActive();
    inputBackgroundUpdate();
}

function changeHeightSvgIcon() {
    let maxValue = heightMax - heightMin;
    let minSvgValue = maxValue / 3;
    let maxSvgValue = maxValue - minSvgValue;

    let smallSvgSrc = "icons/Property 1=tree, Property 2=height-1.svg";
    let mediumSvgSrc = "icons/Property 1=tree, Property 2=height-2.svg";
    let bigSvgSrc = "icons/Property 1=tree, Property 2=height-3.svg";

    if (height < minSvgValue) document.getElementById('heightImgId').src = smallSvgSrc;
    if (height >= minSvgValue) document.getElementById('heightImgId').src = mediumSvgSrc;
    if (height >= maxSvgValue) document.getElementById('heightImgId').src = bigSvgSrc;
}

function changeDiameterSvgIcon() {
    let maxValue = diameterMax - diameterMin;
    let minSvgValue = maxValue / 3;
    let maxSvgValue = maxValue - minSvgValue;

    let smallSvgSrc = "icons/Property 1=tree, Property 2=diameter-1.svg";
    let mediumSvgSrc = "icons/Property 1=tree, Property 2=diameter-2.svg";
    let bigSvgSrc = "icons/Property 1=tree, Property 2=diameter-3.svg";

    if (diameter < minSvgValue) document.getElementById('diameterImgId').src = smallSvgSrc;
    if (diameter >= minSvgValue) document.getElementById('diameterImgId').src = mediumSvgSrc;
    if (diameter >= maxSvgValue) document.getElementById('diameterImgId').src = bigSvgSrc;
}

function changeAgeSvgIcon() {
    let maxValue = ageMax - ageMin;
    let minSvgValue = maxValue / 3;
    let maxSvgValue = maxValue - minSvgValue;

    let smallSvgSrc = "icons/Property 1=tree, Property 2=age-1.svg";
    let mediumSvgSrc = "icons/Property 1=tree, Property 2=age-2.svg";
    let bigSvgSrc = "icons/Property 1=tree, Property 2=age-3.svg";

    if (age < minSvgValue) document.getElementById('ageImgId').src = smallSvgSrc;
    if (age >= minSvgValue) document.getElementById('ageImgId').src = mediumSvgSrc;
    if (age >= maxSvgValue) document.getElementById('ageImgId').src = bigSvgSrc;
}

function changeTreeCountSvgIcon() {
    let maxValue = treeCountMax - treeCountMin;
    let minSvgValue = maxValue / 3;
    let maxSvgValue = maxValue - minSvgValue;

    let smallSvgSrc = "icons/Property 1=tree, Property 2=numbers-1.svg";
    let mediumSvgSrc = "icons/Property 1=tree, Property 2=numbers-2.svg";
    let bigSvgSrc = "icons/Property 1=tree, Property 2=numbers-3.svg";

    if (treeCount < minSvgValue) document.getElementById('numbersImgId').src = smallSvgSrc;
    if (treeCount >= minSvgValue) document.getElementById('numbersImgId').src = mediumSvgSrc;
    if (treeCount >= maxSvgValue) document.getElementById('numbersImgId').src = bigSvgSrc;
}


function changeLanguageActive() {
    if (language === languageEN) {
        document.getElementById("engName").className = 'lang-button-active pointer translate-font-size';
        document.getElementById("engLine").className = 'lang-button-active-line';
        document.getElementById("rusName").className = 'lang-button-inactive pointer translate-font-size';
        document.getElementById("rusLine").className = 'lang-button-inactive-line';
    } else {
        document.getElementById("rusName").className = 'lang-button-active pointer translate-font-size';
        document.getElementById("rusLine").className = 'lang-button-active-line';
        document.getElementById("engName").className = 'lang-button-inactive pointer translate-font-size';
        document.getElementById("engLine").className = 'lang-button-inactive-line';
    }
}

function changeMetricActive() {
    if (metric === metricUK) {
        document.getElementById("metersLabelId").className = 'parameter-type-inactive pointer';
        document.getElementById("metersLabelLineId").className = '';
        document.getElementById("feetLabelId").className = 'parameter-type-active pointer';
        document.getElementById("feetLabelLineId").className = 'parameter-type-active-line';
    } else {
        document.getElementById("metersLabelId").className = 'parameter-type-active pointer';
        document.getElementById("metersLabelLineId").className = 'parameter-type-active-line';
        document.getElementById("feetLabelId").className = 'parameter-type-inactive pointer';
        document.getElementById("feetLabelLineId").className = '';
    }
}

function changeMetricNaming() {
    if (metric === metricEU && language === languageEN) {
        document.getElementsByName('weightResult').forEach(el => el.innerHTML = "kg");
    } else if (metric === metricEU && language === languageRU) {
        document.getElementsByName('weightResult').forEach(el => el.innerHTML = "кг");
    } else if (metric === metricUK && language === languageEN) {
        document.getElementsByName('weightResult').forEach(el => el.innerHTML = "pounds");
    } else if (metric === metricUK && language === languageRU) {
        document.getElementsByName('weightResult').forEach(el => el.innerHTML = "фунтов");
    }
}

function updateMetricValues() {
    if (metric === metricEU) {
        document.getElementById('greenWeight').innerHTML = round(greenWeightKg);
        document.getElementById('dryWeight').innerHTML = round(dryWeightKg);
        document.getElementById('weightOfCarbon').innerHTML = round(weightOfCarbonKg);
        document.getElementById('weightOfCarbonDioxide').innerHTML = round(weightOfCarbonDioxideKg);
        document.getElementById('weightOfCO2').innerHTML = round(weightOfCO2Kg);

    } else if (metric === metricUK) {
        document.getElementById('greenWeight').innerHTML = round(greenWeight);
        document.getElementById('dryWeight').innerHTML = round(dryWeight);
        document.getElementById('weightOfCarbon').innerHTML = round(weightOfCarbon);
        document.getElementById('weightOfCarbonDioxide').innerHTML = round(weightOfCarbonDioxide);
        document.getElementById('weightOfCO2').innerHTML = round(weightOfCO2);
    }
}

function translate() {
    if (language === languageEN) {
        document.getElementById('methodologyTextId').innerHTML = "<span class=\"methodology-link-link-txt\">" +
            "<a class=\"methodology-link-link-txt\" href=\"https://www.unm.edu/~jbrink/365/Documents/Calculating_tree_carbon.pdf\">Data and calculation</a>" +
            "</span> methodology provided by\n" +
            "                            the World Agroforestry Centre's \"Agroforestree Database and Trees for the Future.";

        document.getElementById('methodologyLabelId').innerHTML = "Methodology:";

        document.getElementById('treeParametersLabelId').innerHTML = "Tree parameters";
        document.getElementById('metersLabelId').innerHTML = "meters";
        document.getElementById('feetLabelId').innerHTML = "feet";

        document.getElementById('CO2absCalcNameId').innerHTML = "CO&#8322; absorption calculator";

        document.getElementById('resultsNameId').innerHTML = "Results:";
        document.getElementById('greenWeightNameId').innerHTML = "Green Weight:";
        document.getElementById('dryWeightNameId').innerHTML = "Dry weight:";
        document.getElementById('weightOfCarbonNameId').innerHTML = "Weight of carbon:";
        document.getElementById('weightOfCarbonDioxNameId').innerHTML = "Weight of carbon dioxide sequestered:";
        document.getElementById('weightOfCO2NameId').innerHTML = "Weight of CO&#8322; sequestered per year:";

    } else {
        document.getElementById('methodologyTextId').innerHTML = "<span class=\"methodology-link-link-txt\">" +
            "<a class=\"methodology-link-link-txt\" href=\"https://www.unm.edu/~jbrink/365/Documents/Calculating_tree_carbon.pdf\">Данные и расчёт</a>" +
            "</span> методологии предоставлены\n" +
            "                            всемирным центром агролесоводства \"База Данных Агролесоводства и Деревья Будущего\"";

        document.getElementById('methodologyLabelId').innerHTML = "Методология";

        document.getElementById('treeParametersLabelId').innerHTML = "Параметры дерева";
        document.getElementById('metersLabelId').innerHTML = "метры";
        document.getElementById('feetLabelId').innerHTML = "футы";

        document.getElementById('CO2absCalcNameId').innerHTML = "Калькулятор поглощения CO&#8322;";

        document.getElementById('resultsNameId').innerHTML = "Результаты:";
        document.getElementById('greenWeightNameId').innerHTML = "Зеленый вес:";
        document.getElementById('dryWeightNameId').innerHTML = "Сухой вес:";
        document.getElementById('weightOfCarbonNameId').innerHTML = "Вес углекислого газа:";
        document.getElementById('weightOfCarbonDioxNameId').innerHTML = "Вес выделенного углекислого газа:";
        document.getElementById('weightOfCO2NameId').innerHTML = "Вес CO&#8322; секвестрированного за год:";
    }
    changeMetricNaming();
    inputBackgroundUpdate();
}

function inputBackgroundUpdate() {
    let metersEN = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">meters</text></svg>\') no-repeat;';
    let feetEN = ' url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">feet</text></svg>\') no-repeat;';
    let inchesEN = ' url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">inches</text></svg>\') no-repeat;';
    let ageEN = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">years</text></svg>\') no-repeat;';
    let countEN = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">count</text></svg>\') no-repeat;';

    let metersRU = ' url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">метры</text></svg>\') no-repeat;';
    let feetRU = ' url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">футы</text></svg>\') no-repeat;';
    let inchesRU = ' url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">дюймы</text></svg>\') no-repeat;';
    let ageRU =' url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">годы</text></svg>\') no-repeat;';
    let countRU = ' url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="30"><text x="60" y="21" style="font: normal 16px Arial; opacity: 0.22; float: right;">кол-во</text></svg>\') no-repeat;';

    if (metric === metricEU && language === languageEN) {
        document.getElementById('height').setAttribute( 'style', 'background: ' + metersEN + ' ) !important' );
        document.getElementById('diameter').setAttribute( 'style', 'background: ' + metersEN + ' ) !important' );
        document.getElementById('age').setAttribute( 'style', 'background: ' + ageEN + ' ) !important' );
        document.getElementById('treeCount').setAttribute( 'style', 'background: ' + countEN + ' ) !important' );
    } else if (metric === metricEU && language === languageRU) {
        document.getElementById('height').setAttribute( 'style', 'background: ' + metersRU + ' ) !important' );
        document.getElementById('diameter').setAttribute( 'style', 'background: ' + metersRU + ' ) !important' );
        document.getElementById('age').setAttribute( 'style', 'background: ' + ageRU + ' ) !important' );
        document.getElementById('treeCount').setAttribute( 'style', 'background: ' + countRU + ' ) !important' );
    } else if (metric === metricUK && language === languageEN) {
        document.getElementById('height').setAttribute( 'style', 'background: ' + feetEN + ' ) !important' );
        document.getElementById('diameter').setAttribute( 'style', 'background: ' + inchesEN + ' ) !important' );
        document.getElementById('age').setAttribute( 'style', 'background: ' + ageEN + ' ) !important' );
        document.getElementById('treeCount').setAttribute( 'style', 'background: ' + countEN + ' ) !important' );
    } else if (metric === metricUK && language === languageRU) {
        document.getElementById('height').setAttribute( 'style', 'background: ' + feetRU + ' ) !important' );
        document.getElementById('diameter').setAttribute( 'style', 'background: ' + inchesRU + ' ) !important' );
        document.getElementById('age').setAttribute( 'style', 'background: ' + ageRU + ' ) !important' );
        document.getElementById('treeCount').setAttribute( 'style', 'background: ' + countRU + ' ) !important' );
    }
}

document.addEventListener("DOMContentLoaded", function () {
    inputInit();
    translate();
    changeMetricSystem(metric);
    calc();
    onMouseOverPartnerLogo();
});

function onMouseOverMetricMeters() {
    let metersLabel = document.getElementById("metersLabelId");
    let metersLabelLine = document.getElementById("metersLabelLineId");
    let feetLabel = document.getElementById("feetLabelId");
    let feetLabelLine = document.getElementById("feetLabelLineId");
    let engName = document.getElementById("engName");
    let engLine = document.getElementById("engLine");
    let rusName = document.getElementById("rusName");
    let rusLine = document.getElementById("rusLine");

    metersLabel.onmouseover = function () {
        metersLabelLine.setAttribute("class", "parameter-type-active-line");
    }
    metersLabel.onmouseout = function () {
        metersLabelLine.setAttribute("class", "parameter-type-inactive-line");
    }
    feetLabel.onmouseover = function () {
        feetLabelLine.setAttribute("class", "parameter-type-active-line");
    }
    feetLabel.onmouseout = function () {
        feetLabelLine.setAttribute("class", "parameter-type-inactive-line");
    }
    engName.onmouseover = function () {
        engLine.setAttribute("class", "lang-button-active-line");
    }
    engName.onmouseout = function () {
        engLine.setAttribute("class", "lang-button-inactive-line");
    }
    rusName.onmouseover = function () {
        rusLine.setAttribute("class", "lang-button-active-line");
    }
    rusName.onmouseout = function () {
        rusLine.setAttribute("class", "lang-button-inactive-line");
    }

}