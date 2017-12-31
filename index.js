const crypto = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,LTC,ETH,QTUM,GEO,BTG,ETC,XRP,SWIFT,OMNI,IOT,XEM,DASH,BCH,ZEC&tsyms=USD&extraParams=your_app_name";
const starts = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
const histo = "https://api.coindesk.com/v1/bpi/historical/close.json";
const calcExchange = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,GBP,CNY,JPY,EUR,TWD,JPY,RUB,CHF,CAD,AUD,SGD";


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

// Clear form values
function resetHistoricData() {
   $("#startDate").val('');
   $("#endDate").val('');

   // Show and hide the specific HTML sections and buttons
   $("#enterDates").show();
   $("#difference").hide();
   $("#btnSubmitDates").show();
   $("#btnResetDates").hide();
}

// Clear form values
function resetBitcoinExchange() {
   $("#bitcoinAmount").val('');

   //show and hide
   $("#btnCalculateRates").show();
   $("#btnResetRates").hide();
   $('#press').show();
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

function showFirstValueOnScreenLoad(results) {
   var firstValue = results.RAW.BTC.USD.PRICE;
   $(`.firstValue`).text("Bitcoin current value: $" + firstValue.toFixed(2));
   let openday = results.RAW.BTC.USD.OPENDAY;
   $(`#openday`).text("$" + openday.toFixed(2));
   let todaysHigh = results.RAW.BTC.USD.HIGHDAY;
   $(`#todaysHigh`).text("$" + todaysHigh.toFixed(2));
   let todaysLow = results.RAW.BTC.USD.LOWDAY;
   $(`#todaysLow`).text("$" + todaysLow.toFixed(2));
   let twentyfour = results.RAW.BTC.USD.CHANGEDAY;
   $(`#twentyfour`).text("$" + twentyfour.toFixed(2));
   let pctChange = results.RAW.BTC.USD.CHANGEPCTDAY;
   $(`#pctChange`).text(pctChange.toFixed(2) + "%");
   let supply = results.RAW.BTC.USD.SUPPLY;
   $(`#supply`).text(supply);
   let marketCap = results.RAW.BTC.USD.MKTCAP;
   $(`#marketCap`).text(marketCap.toFixed(1));
}

function fetchBitcoinHistoricData() {
   const startField = $('input[name=startDate]');
   const endField = $('input[name=endDate]');

   const startDate = startField.val();
   const endDate = endField.val();

   let params = {
      start: startDate,
      end: endDate
   };

   $.getJSON(histo, params, function(data) {
      showHistoricData(data);
   });
}

function showHistoricData(results) {
   let firstKey, firstValue, lastKey, lastValue, difference;
   firstKey = Object.keys(results.bpi).shift();
   lastKey = Object.keys(results.bpi).pop();
   firstValue = Object.values(results.bpi).shift();
   lastValue = Object.values(results.bpi).pop();
   difference = (lastValue - firstValue);

   // Show and hide the specific HTML sections
   $("#difference").show();
   $("#btnResetDates").show();
   $('#btnSubmitDates').hide();

   $('.difference').text("The variance in the value of Bitcoin for the selected dates is:  $" + difference.toFixed(2));
}

// Get cryptocurrency exchange rates
function fetchCryptoExchangeRates() {
   $.getJSON(crypto, function(data) {
      showCryptoExchangeRates(data);
   });
}

function showCryptoExchangeRates(results) {
   let lite = results.LTC.USD;
   $(`#lite`).text("$" + lite.toFixed(2));
   let iot = results.IOT.USD;
   $(`#IOT`).text("$" + iot.toFixed(2));
   let omni = results.OMNI.USD;
   $(`#OMNI`).text("$" + omni);
   let swift = results.SWIFT.USD;
   $(`#SWIFT`).text("$" + swift.toFixed(2));
   let qtum = results.QTUM.USD;
   $(`#QTUM`).text("$" + qtum.toFixed(2));
   let xem = results.XEM.USD;
   $(`#XEM`).text("$" + xem.toFixed(2));
   let zec= results.ZEC.USD;
   $(`#ZEC`).text("$" + zec.toFixed(2));
   let bch = results.BCH.USD;
   $(`#BCH`).text("$" + bch.toFixed(2));
   let eth = results.ETH.USD;
   $(`#ETH`).text("$" + eth);
   let btg = results.BTG.USD;
   $(`#BTG`).text("$" + btg.toFixed(2));
   let geo = results.GEO.USD;
   $(`#GEO`).text("$" + geo.toFixed(2));
   let etc = results.ETC.USD;
   $(`#ETC`).text("$" + etc);
   let xrp = results.XRP.USD;
   $(`#XRP`).text("$" + xrp);
}

function fetchBitcoinExchangeData() {
   const amount = $('input[name=bitcoinAmount]');
   const amountValue = amount.val();

   $.getJSON(calcExchange, function(data) {
      showBitcoinExchangeData(data)()
   })
}

function showBitcoinExchangeData(results) {
   const amount = $('input[name=bitcoinAmount]').val();
   let usd = results.USD;
   let usd2 = (usd * amount);
   $(`#USD`).text("$" + usd2.toFixed(2));
   let gbp = results.GBP;
   let gbp2 = (gbp * amount);
   $(`#GBP`).text("£" + gbp2.toFixed(2));
   let cny = results.CNY;
   let cny2 = (cny * amount);
   $(`#CNY`).text("¥" + cny2);
   let jpy = results.JPY;
   let jpy2 = (jpy * amount);
   $(`#JPY`).text("¥" + jpy2);
   let eur = results.EUR;
   let eur2 = (eur * amount);
   $(`#EUR`).text("€" + eur2.toFixed(2));
   let twd = results.TWD;
   let twd2 = (twd * amount);
   $(`#TWD`).text("$" + twd2.toFixed(2));
   let rub = results.RUB;
   let rub2 = (rub * amount);
   $(`#RUB`).text("₽ " + rub2.toFixed(2));
   let chf = results.CHF;
   let chf2 = (chf * amount);
   $(`#CHF`).text("$" + chf2.toFixed(2));
   let aud = results.AUD;
   let aud2 = (aud * amount);
   $(`#AUD`).text("$" + aud2.toFixed(2));
   renderExchangeResults()
}

function renderExchangeResults() {
   $('#bitcoinAmount').val("");
   $('#btnCalculateRates').hide;
   $('#btnResetRates').show;
   showBitcoinExchangeData(data);
}

// On load event:
$(() => {
   setEventListeners();
   fetchOnScreenLoad();
   showStartPage();
})