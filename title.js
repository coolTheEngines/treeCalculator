
document.addEventListener("DOMContentLoaded", function () {
    cssStyleListener();
    onMouseOverPartnerLogo();
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
        document.getElementById("metricSystemId").innerHTML = "Metric system";
        document.getElementById('calculateName').innerHTML = "Calculate";

        document.getElementById('unipccText').innerHTML = "UN IPCC CO&#8322; absorption calculator";
        document.getElementById('unipccTextDescription1').innerHTML = "We at Trees for the\n" +
            "                            <a href=\"https://trees.org/\" class=\"right-words-link\">Future</a>\n" +
            "                            estimate that our\n" +
            "                            <a href=\"https://www.fao.org/forestry/agroforestry/80338/en/#:~:text=Definition,spatial%20arrangement%20or%20temporal%20sequence\" class=\"right-words-link\">agroforestry trees</a>, planted in tropical\n" +
            "                            climates, will sequester atmospheric carbon dioxide at an average of 50 pounds of carbon\n" +
            "                            dioxide per tree per year.";

        document.getElementById('unipccTextDescription2').innerHTML = "You can <a onclick=\"openCalcPage()\"\n" +
            "                                       class=\"right-words-link\">calculate</a> the amount of carbon dioxide that can be\n" +
            "                            absorbed by\n" +
            "                            your landing over a selected period of time in any country in the world.";

        document.getElementById("calcBtnLine").style.width = '88px';
        document.getElementById("calcBtnBack").style.paddingLeft = '63px';
    } else {
        document.getElementById("metricSystemId").innerHTML = "Метрическая система";
        document.getElementById('calculateName').innerHTML = "Рассчитать";

        document.getElementById('unipccText').innerHTML = "Калькулятор поглощения CO&#8322; МГЭИК ООН";

        document.getElementById('unipccTextDescription1').innerHTML = "По оценкам компании \"Деревья для \n" +
            "                            <a href=\"https://trees.org/\" class=\"right-words-link\">Будущего</a>\", высаженные в тропическом климате\n" +
            "                            <a href=\"https://www.fao.org/forestry/agroforestry/80338/en/#:~:text=Definition,spatial%20arrangement%20or%20temporal%20sequence\" class=\"right-words-link\">агролесные деревья</a>\n" +
            "                             будут поглащать в среднем 50 фунтов атмосферного углекислого газа на дерево в год.";

        document.getElementById('unipccTextDescription2').innerHTML = "Здесь вы можете <a onclick=\"openCalcPage()\"\n" +
            "                                       class=\"right-words-link\">рассчитать</a> количество углекислого газа,\n" +
            "                            которое может быть поглощено вашей лесопосадкой за выбранный период времени в любой стране мира.";

        document.getElementById("calcBtnLine").style.width = '112px';
        document.getElementById("calcBtnBack").style.paddingLeft = '51px';
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