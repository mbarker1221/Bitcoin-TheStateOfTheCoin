const crypto = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD&tsyms=BTC,LITE,ETH,GIVE,SUP,GEO,WOLF,ALF,XPD,SWIFT,OMNI,IOTA,RIPPLE,TIT,DASH,BURST,POT&extraParams=your_app_name";
const starts = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
const histo = "https://api.coindesk.com/v1/bpi/historical/close.json";
const calcExchange = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,GBP,CNY,JPY,EUR,TWD,JPY,EUR,TWD,RUB";
const news ="https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=2a6c9a9df8ec4b7883dd8f6e40d75d50";
 const key="2a6c9a9df8ec4b7883dd8f6e40d75d50";
function handleNavigation() {
    // select nav elements on"click'
    $('nav a').click(function(event) {
        //prevent default
        event.preventDefault();
        //current page is current target using data method 
        const currentPage = $(this).data('page');
        //hiding elements using class
        $('.page').hide();
        //display current page
        $(`.${currentPage}`).show();
    });
}

function showStartPage() {
    $('.page').hide();
    $('.start-page').show();
}

function setEventListeners() {
    handleNavigation();
}

function fetchOnScreenLoad() {
    $.getJSON(starts, function(data) {
        showFirstValueOnScreenLoad(data);
    });
}
//change to a loop
function showFirstValueOnScreenLoad(results) {
    var firstValue = results.RAW.BTC.USD.PRICE;
    $(`.firstValue`).text("Bitcoin current value: $" + firstValue.toFixed(2));
    let openday = results.RAW.BTC.USD.OPENDAY;
    $(`#openday`).text("$" + openday);
    let todaysHigh = results.RAW.BTC.USD.HIGHDAY;
    $(`#todaysHigh`).text("$" + todaysHigh.toFixed(2));
    let todaysLow = results.RAW.BTC.USD.LOWDAY;
    $(`#todaysLow`).text("$" + todaysLow.toFixed(2));
    let twentyfour = results.RAW.BTC.USD.CHANGEDAY;
    $(`#twentyfour`).text("$" + twentyfour.toFixed(2));
    let pctChange = results.RAW.BTC.USD.CHANGEPCTDAY;
    $(`#pctChange`).text(pctChange.toFixed(2) +"%");
    let supply = results.RAW.BTC.USD.SUPPLY;
    $(`#supply`).text(supply);
    let marketCap = results.RAW.BTC.USD.MKTCAP;
    $(`#marketCap`).text(marketCap.toFixed(1));
}

function fetchBitData() {
    const startField = $('input[name=startDate]');
    const endField = $('input[name=endDate]');

    const startDate = startField.val();
    const endDate = endField.val();

   
    let params = {
        start: startDate,
        end: endDate
    };
    //const url=histo+"?start="+startDate+"&end="+endDate;
    $.getJSON(histo, params, function(data) {
        showInfo(data);
    });
}

function showInfo(results) {

    let firstKey, firstValue, lastKey, lastValue, difference;
    firstKey = Object.keys(results.bpi).shift();
    lastKey = Object.keys(results.bpi).pop();
    firstValue = Object.values(results.bpi).shift();
    lastValue = Object.values(results.bpi).pop();
    difference = (lastValue - firstValue);


    $('.difference').text("The variance in the value of Bitcoin for the selected dates is:  $" + difference.toFixed(2));
}
//get cryptocurrency exchange rates
function getCryptoExchange() {
    $.getJSON(crypto, function(data) {
        showCrypto(data);
    });
}
//change to a loop
function showCrypto(results) {
    let lite = results.USD.LITE;
    $(`#Lite`).text("$" + lite.toFixed(2));
    let iota = results.USD.IOTA;
    $(`#IOTA`).text("$" + iota.toFixed(2));
    let omni = results.USD.OMNI;
    $(`#OMNI`).text("$" + omni.toFixed(2));
    let swift = results.USD.SWIFT;
    $(`#SWIFT`).text("$" + swift.toFixed(2));
    let burst = results.USD.BURST;
    $(`#BURST`).text("$" + burst.toFixed(2));
    let tit = results.USD.TIT;
    $(`#TIT`).text("$" + tit.toFixed(2));
    let wolf = results.USD.WOLF;
    $(`#WOLF`).text("$" + wolf.toFixed(2));
    let pot = results.USD.POT;
    $(`#POT`).text("$" + pot.toFixed(2));
    let eth = results.USD.ETH;
    $(`#ETH`).text("$" + eth.toFixed(2));
}

function fetchExchangeData() {
    const amount = $('input[name=bitcoinAmount]');
    const amountValue = amount.val();
//edge case - fix
    if (!amountValue) {
        return;
    }
    else {
    $.getJSON(calcExchange, function(data) {
        showExchange(data);
    });}
}
//change to a loop
function showExchange(results) {
    const amount = $('input[name=bitcoinAmount]').val();
    let usd = results.USD;
    let usd2 = (usd * amount);
    $(`#USD`).text("$" + usd2.toFixed(2));
    let gbp = results.GBP;
    let gbp2 = (gbp * amount);
    $(`#GBP`).text("$" + gbp2.toFixed(2));
    let cny = results.CNY;
    let cny2 = (cny * amount);
    $(`#CNY`).text("$" + cny2.toFixed(2));
    let jpy = results.JPY;
    let jpy2 = (jpy * amount);
    $(`#JPY`).text("$" + jpy2.toFixed(2));
    let eur = results.EUR;
    let eur2 = (eur * amount);
    $(`#EUR`).text("$" + eur2.toFixed(2));
    let twd = results.TWD;
    let twd2 = (twd * amount);
    $(`#TWD`).text("$" + twd2.toFixed(2));
    let rub = results.RUB;
    let rub2 = (rub * amount);
    $(`#RUB`).text("$" + rub2.toFixed(2));
}


    function getResults() {
   
  $.getJSON(news, function(data) {
displayResults(data);
});
}


function displayResults(results) {
 
  return `
  <div>
    <h2>
    <a class="news-name" href="https://newsapi.org/v2/top-headlines?sources=crypto-coins-news=${result.articles.url}" target="_blank">${result.title}></a> 
    </h2>
  <a href="https://3bjir821uqix1xdupc2ey86g-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/Bitcoin-sand-brown.jpg" target="_blank"><img src="${result.urlToImage}"></a>
  </div>`;
}







//edge case - fix
$('#submit').on('click', function(e) {
    //e.preventDefault();
     if (!startDate || !endDate) {
       return;  }
     else {
    document.getElementById('submit').style.visibility = "hidden";
    $('#press').text("");
    $('#hist').text("");}
    //   fetchBitData(histo);
});


$('#calculate').on('click', function(e) {
    //e.preventDefault();
    document.getElementById('calculate').style.visibility = "hidden";
    document.getElementById('bitcoinAmount').style.visibility = "hidden";
    $('.calc-head').text("");
    $('label').text("");
    //    fetchExchangeData(calcExchange);
});

$(() => {
    setEventListeners();
    fetchOnScreenLoad();
    showStartPage();
    getResults();
})