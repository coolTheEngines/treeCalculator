
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