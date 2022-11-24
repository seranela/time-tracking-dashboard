(() => {
const jsonFile = 'data.json';

let data;
let timeframeLabel = 'Yesterday - ';

const buttonDaily = document.getElementById('button-daily');
const buttonWeekly = document.getElementById('button-weekly');
const buttonMonthly = document.getElementById('button-monthly');

// Process JSON data into chart
function processData(timeframe) {
  for (let i = 0; i < data.length; i++) {
    let section = data[i].title.toLowerCase().replace(' ', '');

    let hours = document.getElementById(section + '-hours');
    hours.innerHTML = data[i].timeframes[timeframe].current + 'hrs';

    let hoursPrevious = document.getElementById(section + '-hours-previous');
    hoursPrevious.innerHTML = timeframeLabel + data[i].timeframes[timeframe].previous + 'hrs';
  }
}

// Load the JSON data file
if (window.fetch) {
  // Fetch API
  // Load 'daily' data by default
  fetch(jsonFile)
    .then((response) => response.json())
    .then((json) => data = json)
    .then(() => processData('daily'));
} else {
  // XMLHttpRequest (Fallback)
  var xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.overrideMimeType('application/json');
  xmlHttpReq.open('GET', jsonFile, true);
  xmlHttpReq.onreadystatechange = function () {
    if (xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200) {
      data = JSON.parse(xmlHttpReq.responseText);
    }
  };
  xmlHttpReq.send(null);
}

function setTimeframe(e) {
  switch (e.target.id) {
    case 'button-daily':
      buttonDaily.classList.add('button-selected');
      buttonWeekly.classList.remove('button-selected');
      buttonMonthly.classList.remove('button-selected');
      timeframeLabel = 'Yesterday - ';
      processData('daily');
      break;
    case 'button-weekly':
      buttonDaily.classList.remove('button-selected');
      buttonWeekly.classList.add('button-selected');
      buttonMonthly.classList.remove('button-selected');
      timeframeLabel = 'Last Week - ';
      processData('weekly');
      break;
    case 'button-monthly':
      buttonDaily.classList.remove('button-selected');
      buttonWeekly.classList.remove('button-selected');
      buttonMonthly.classList.add('button-selected');
      timeframeLabel = 'Last Month - ';
      processData('monthly');
      break;
  }
}

buttonDaily.addEventListener('click', setTimeframe, false);
buttonWeekly.addEventListener('click', setTimeframe, false);
buttonMonthly.addEventListener('click', setTimeframe, false);
})();