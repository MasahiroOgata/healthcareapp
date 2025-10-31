//const dates = [];//"12/30", "12/31", "2015/1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/6", "1/7",  "1/8",  "1/9",];
const datesList = [[], [], [], [], []]
const times = [];
const bodyTemperatures = [];
const bloodSugerLevels = [];
const SpO2Levels = [];
const heartRates = [];
const bloodPressureHighs = [];
const bloodPressureLows = [];
const scatterBloodSugerLevels = [];
// const DATES_MAX = 31;

vitalData.reverse();

vitalData.forEach(element => {
  // console.log(element);
  const utcDateTimeStr = element.fields.checked_up_at;
  const date = new Date(utcDateTimeStr);
  const japanTimeStr = date.toLocaleString('ja-JP', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',});

  // console.log(japanTimeStr); 
  // console.log(japanTimeStr.substring(0, 5));
  // console.log(japanTimeStr.substring(6, 11));

  //dates.push(japanTimeStr.substring(0, 5));
  times.push(japanTimeStr.substring(6, 11));
  if (element.fields.body_temperature) {
    bodyTemperatures.push(element.fields.body_temperature);
    datesList[0].push(japanTimeStr.substring(0, 5));
  }
  if (element.fields.blood_sugar_level) {
    bloodSugerLevels.push(element.fields.blood_sugar_level);
    datesList[1].push(japanTimeStr.substring(0, 5));
  }
  if (element.fields.spo2_level) {
    SpO2Levels.push(element.fields.spo2_level);
    datesList[2].push(japanTimeStr.substring(0, 5));
  }
  if (element.fields.heart_rate) {
    heartRates.push(element.fields.heart_rate);
    datesList[3].push(japanTimeStr.substring(0, 5));
  }
  if (element.fields.blood_pressure_high) {
    bloodPressureHighs.push(element.fields.blood_pressure_high);
    bloodPressureLows.push(element.fields.blood_pressure_low);
    datesList[4].push(japanTimeStr.substring(0, 5));
  }
  //bodyTemperatures.push(element.fields.body_temperature);
  //bloodSugerLevels.push(element.fields.blood_sugar_level);
  //SpO2Levels.push(element.fields.spo2_level);
  // bloodPressureHighs.push(element.fields.blood_pressure_high);
  // bloodPressureLows.push(element.fields.blood_pressure_low);
  scatterBloodSugerLevels.push({x:japanTimeStr.substring(6, 11), y:element.fields.blood_sugar_level});
});


// console.log(bloodSugerLevels);
// console.log(datesList[1]);

// for (let i = 1; i <= DATES_MAX; i++) {
//   dates.push('7/' +  i);

//   let time = Math.round(Math.random() * 360)
//   let timeStr = (Math.floor(time / 60) + 10) + ':' + (time % 60);
//   //times.push(time);
//   times.push(timeStr);
  
//   let bloodSugerLevel = Math.round(Math.random() * 80 + 100);
//   bloodSugerLevels.push(bloodSugerLevel);
  
//   let bodyTemperature = Math.round((Math.random() * 1.2 + 35.9) * 10) / 10;
//   bodyTemperatures.push(bodyTemperature);
  
//   let SpO2 = Math.round((Math.random() * 5 + 95) * 100) / 100;
//   SpO2Levels.push(SpO2);
  
//   let high = Math.round((Math.random() * 70 + 90) * 10) / 10;
//   let low = Math.round((Math.random() * 50 + 60) * 10) / 10;
//   bloodPressureHighs.push(Math.max(high, low));
//   bloodPressureLows.push(Math.min(high, low));
// }

const suggestedMinAndMax = [[35.5, 37.5], [90, 200], [90, 100], [50, 150], [50, 200]];

const datasetsList = [
  [ //体温データ　datasetList[0]に格納
    {
      label: '体温', borderWidth: 2, fill: true,
      borderColor: '#FF9F40', backgroundColor: 'rgba(155, 208, 245, 0.1)', tension: 0.2,
      data: bodyTemperatures
    }    
  ],

  [ //血糖値データ　datasetList[1]に格納
    {
      label: '血糖値', borderWidth: 2, fill: true,
      borderColor: '#FFCD56', backgroundColor: 'rgba(155, 208, 245, 0.1)', tension: 0.2,
      data: bloodSugerLevels
    }
  ],

  [ //酸素飽和度データ　datasetList[2]に格納
    {
      label: '酸素飽和度', borderWidth: 2, fill: true,
      borderColor: '#9966FF', backgroundColor: 'rgba(155, 208, 245, 0.1)', tension: 0.2,
      data: SpO2Levels
    }
  ],

  [ //心拍数データ　datasetList[3]に格納
    {
      label: '心拍数', borderWidth: 2, fill: true,
      borderColor: '#FF9F40', backgroundColor: 'rgba(155, 208, 245, 0.1)', tension: 0.2,
      data: heartRates
    }
  ],
  
  [ //血圧データ　datasetList[4]に格納
    {
      label: '最高血圧', borderWidth: 2, fill: true,
      borderColor: '#FF6384', backgroundColor: 'rgba(155, 208, 245, 0.1)', tension: 0.2,
      data: bloodPressureHighs 
    },
    {
      label: '最低血圧', borderWidth: 2, fill: true,
      borderColor: '#36A2EB', backgroundColor: 'rgba(155, 208, 245, 0.1)', tension: 0.2,
      data: bloodPressureLows
    }
  ]
];

// const scatterBloodSugerLevels = [];
// for (let i = 0; i < DATES_MAX; i++) {
//   scatterBloodSugerLevels.push({x:times[i], y:bloodSugerLevels[i]})
// }


window.onload = function () {
  
  console.log(vitalData);
    
  drawChart(0, 30);
}

function drawChart(choice, period) {
  const ctx = document.getElementById('myChart');

  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: datesList[choice],//dates,//
      datasets: datasetsList[choice]
    },
    options: {
      scales: {
        x: {
          type: 'category',
          min: datesList[choice].at(-period),
          max: datesList[choice].at(-1)
        },
        y: {
          suggestedMin: suggestedMinAndMax[choice][0],
          suggestedMax: suggestedMinAndMax[choice][1]
        }
      }
    },
  });
}

function drawScatterChart() {
  const ctx = document.getElementById('myChart');

  window.myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: '血糖値',
        data: scatterBloodSugerLevels,   
        backgroundColor: 'rgb(255, 99, 132)' 
        }]
      },
    options: {
    // responsive: true,
    // plugins: {
    //   title: {
    //     display: true,
    //     text: '時刻をx軸にした散布図'
    //   }
    // },
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'HH:mm',
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm'
          },
          tooltipFormat: 'HH:mm'
        },
        // title: {
        //   display: true,
        //   text: '時刻'
        // },
        suggestedMin: '10:00',
        suggestedMax: '16:00'
      },
       y: {

        suggestedMin: '100',
        suggestedMax: '180'
      //   title: {
      //     display: true,
      //     text: '値'
      //   }
       }
    }
  }
    
  });

}

function changeChartItem() {
  var choice;
  var period;    
  
  const periodSelector = document.getElementById('periodSelector');  

  const healthRadioElement = document.getElementById('healthRadio');
  const isHealthRadioVisible = window.getComputedStyle(healthRadioElement).display !== 'none';

  const periodRadioElement = document.getElementById('periodRadio');
  const isPeriodRadioVisible = window.getComputedStyle(periodRadioElement).display !== 'none';

  if (isHealthRadioVisible) {
    choice = document.querySelector('input[name="healthRadioOptions"]:checked').value;
    document.querySelector('select[name="healthSelectOptions"]').value = choice
  } else {
    choice = document.querySelector('select[name="healthSelectOptions"]').value;
    document.querySelector(`input[name="healthRadioOptions"][value="${choice}"]`).checked = true;
  }

  if (isPeriodRadioVisible) {
    period = document.querySelector('input[name="periodRadioOptions"]:checked').value;
    document.querySelector('select[name="periodSelectOptions"]').value = period
  } else {
    period = document.querySelector('select[name="periodSelectOptions"]').value;
    document.querySelector(`input[name="periodRadioOptions"][value="${period}"]`).checked = true;
  }

  if (myChart) {
    myChart.destroy();
  }

  if (choice == 5) {
    periodSelector.style.display = 'none';
    drawScatterChart();
  } else {
    periodSelector.style.display = 'inline-flex';
    drawChart(choice, period);
  }
  
}

// function changeHealthItem() {
//   const choice = document.querySelector('input[name="healthRadioOptions"]:checked').value;
//   const period = document.querySelector('input[name="chatrtPeriodOptions"]:checked').value;
//   console.log('changed!', choice);

//   if (myChart) {
//     myChart.destroy();
//   }
//   drawChart(choice, period);
// }

// function changeChartPeriod() {
//   const choice = document.querySelector('input[name="healthRadioOptions"]:checked').value;
//   const period = document.querySelector('input[name="chatrtPeriodOptions"]:checked').value;
//   console.log('changed!', period);

//   if (myChart) {
//     myChart.destroy();
//   }
//   drawChart(choice, period);

// }