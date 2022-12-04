
document.addEventListener("DOMContentLoaded", function () {
    cssStyleListener();
});

function cssStyleListener() {
    const mq = window.matchMedia("(max-width:768px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}

function WidthChange(mq) {
    if (mq.matches) {
        document.getElementById("blockWrapper").className = "container";
    } else {
        document.getElementById("blockWrapper").className = "container row";
    }
}

function openCalcPage() {
    window.location =  "http://" + window.location.host + '/treeCalculator/index2.html';
}

const languageEN = "EN";
const languageRU = "RU";
let language = languageEN;

function changeLanguage(lang) {
    if (lang === languageEN) {
        language = languageEN;
    } else {
        language = languageRU;
    }
    changeLanguageActive();
    translate();
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

function translate() {
    if (language === languageEN) {
        // document.getElementById('methodologyTextId').innerHTML = "<span class=\"methodology-link-link-txt\">" +
        //     "<a class=\"methodology-link-link-txt\" href=\"https://www.unm.edu/~jbrink/365/Documents/Calculating_tree_carbon.pdf\">Data and calculation</a>" +
        //     "</span> methodology provided by\n" +
        //     "                            the World Agroforestry Centre's \"Agroforestree Database and Trees for the Future.";
        //
        // document.getElementById('methodologyLabelId').innerHTML = "Methodology:";
        //
        // document.getElementById('treeParametersLabelId').innerHTML = "Tree parameters";
        // document.getElementById('metersLabelId').innerHTML = "meters";
        // document.getElementById('feetLabelId').innerHTML = "feet";
        //
        // document.getElementById('CO2absCalcNameId').innerHTML = "co2 absorption calculator";
        //
        // document.getElementById('resultsNameId').innerHTML = "Results:";
        // document.getElementById('greenWeightNameId').innerHTML = "Green Weight:";
        // document.getElementById('dryWeightNameId').innerHTML = "Dry weight:";
        // document.getElementById('weightOfCarbonNameId').innerHTML = "Weight of carbon:";
        // document.getElementById('weightOfCarbonDioxNameId').innerHTML = "Weight of carbon dioxide sequestered:";
        // document.getElementById('weightOfCO2NameId').innerHTML = "Weight of co2 sequestered per year:";

    } else {
        // document.getElementById('methodologyTextId').innerHTML = "<span class=\"methodology-link-link-txt\">" +
        //     "<a class=\"methodology-link-link-txt\" href=\"https://www.unm.edu/~jbrink/365/Documents/Calculating_tree_carbon.pdf\">Данные и расчёт</a>" +
        //     "</span> методологии предоставлены\n" +
        //     "                            всемирным центром агролесоводства \"База Данных Агролесоводства и Деревья Будущего\"";
        //
        // document.getElementById('methodologyLabelId').innerHTML = "Методология";
        //
        // document.getElementById('treeParametersLabelId').innerHTML = "Параметры дерева";
        // document.getElementById('metersLabelId').innerHTML = "метры";
        // document.getElementById('feetLabelId').innerHTML = "футы";
        //
        // document.getElementById('CO2absCalcNameId').innerHTML = "Калькулятор поглощения co2";
        //
        // document.getElementById('resultsNameId').innerHTML = "Результаты:";
        // document.getElementById('greenWeightNameId').innerHTML = "Зеленый вес:";
        // document.getElementById('dryWeightNameId').innerHTML = "Сухой вес:";
        // document.getElementById('weightOfCarbonNameId').innerHTML = "Вес углекислого газа:";
        // document.getElementById('weightOfCarbonDioxNameId').innerHTML = "Вес выделенного углекислого газа:";
        // document.getElementById('weightOfCO2NameId').innerHTML = "Вес СО2, секвестрированного за год:";
    }
    // changeMetricNaming();
    // inputBackgroundUpdate();
}