const colorList = ["#de7a22", "#fd3c3c", "#061283", "#fd3c3c", "#138d90"]

let labels = document.getElementsByTagName("label");
for (let i=0; i<labels.length; i++) {
    
    labels[i].style.color = colorList[Math.min(i, colorList.length-1)];
}

function setRangeTrackColor(rangeElement, color) {  
  const className = `range-track-${color.substring(1)}`;
  rangeElement.classList.add(className);

  const toRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const trackColor = toRGBA(color, 0.25);
  const focusRingColor = toRGBA(color, 0.7);

  const style = document.createElement('style');
  style.innerHTML = `
    .${className}::-webkit-slider-thumb {
      background: ${color};
      
      width: 1rem; 
      height: 1rem; 
      border-radius: 50%; 
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); 
      transition: box-shadow 0.2s;
    }
    .${className}::-webkit-slider-runnable-track {
      background: ${trackColor};     
      height: 0.5rem;
      border-radius: 10px;      
    }
    .${className}:focus {
      outline: none;
    }
    .${className}:focus::-webkit-slider-thumb {
      background: ${color};
      box-shadow:
        0px 0px 0px 4px ${focusRingColor},
        0px 3px 6px rgba(0, 0, 0, 0.15);
    }
  `;
  document.head.appendChild(style);
}

let ranges = document.getElementsByClassName("form-range");

for (let i = 0; i < ranges.length; i++) {
  setRangeTrackColor(ranges[i], colorList[Math.min(i, colorList.length-1)]);
}

const formIdList = [
  ['bodyTemperatureCheckBox', ['bodyTemperatureInput'], ['bodyTemperatureRange']],
  ['bloodSugerLevelCheckBox', ['bloodSugerLevelInput'], ['bloodSugerLevelRange']],
  ['SpO2LevelCheckBox', ['SpO2LevelInput'], ['SpO2LevelRange']],
  ['heartRateCheckBox', ['heartRateInput'], ['heartRateRange']],
  ['bloodPressureCheckBox', ['bloodPressureHighInput', 'bloodPressureLowInput'],
   ['bloodPressureHighRange', 'bloodPressureLowRange']]
];

const initialValues = [36.5, 130, 98, 80, 110, 70, ];
let tempValues = [null, null, null, null, null, null, ];

function enableVitalInput(vital) {
  
  if (!document.getElementById(formIdList[vital][0]).checked) {
    for (let i = 0; i < formIdList[vital][1].length; i++) {
      tempValues[vital + i] = document.getElementById(formIdList[vital][1][i]).value;
      document.getElementById(formIdList[vital][1][i]).value = null;
    }
  } else {
    for (let i = 0; i < formIdList[vital][1].length; i++) {
      document.getElementById(formIdList[vital][1][i]).value = tempValues[vital + i] || initialValues[vital + i];
      document.getElementById(formIdList[vital][2][i]).value = tempValues[vital + i] || initialValues[vital + i];
      tempValues[vital + i] = null;
    }
  }
}

function enableGroupInput(vital) {
  if (vital == 4 && document.getElementById('bloodPressureCheckBox').checked) {
    if (!document.getElementById('bloodPressureHighInput').value) {
      document.getElementById('bloodPressureHighInput').value = tempValues[4] || initialValues[4];
    }
    if (!document.getElementById('bloodPressureLowInput').value) {
      document.getElementById('bloodPressureLowInput').value = tempValues[5] || initialValues[5];
    }
  }
}
