const colorList = ["#de7a22", "#fd3c3c", "#061283", "#fd3c3c", "#138d90"]

let labels = document.getElementsByTagName("label");
for (let i=0; i<labels.length; i++) {
    
    labels[i].style.color = colorList[Math.min(i, colorList.length-1)];
}


function setRangeTrackColor(rangeElement, color) {
  //console.log(rangeElement.classList);
  const className = `range-track-${color.substring(1)}`; // ${Math.random().toString(36).substr(2, 5)}`;
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
  ['bodyTemperatureCheckBox', 'bodyTemperatureInput', 'bodyTemperatureRange'],
  ['bloodSugerLevelCheckBox', 'bloodSugerLevelInput', 'bloodSugerLevelRange'],
  ['SpO2LevelCheckBox', 'SpO2LevelInput', 'SpO2LevelRange'],
  ['heartRateCheckBox', 'heartRateInput', 'heartRateRange'],
];

const initialValues = [36.5, 130, 98, 80, ];
let tempValues = [null, null, null, null, null, null, ];

function enableVitalInput(vital) {

  if (vital == 4) {
    enableBloodPressureInput();
    return;
  }
  
  if (!document.getElementById(formIdList[vital][0]).checked) {
    tempValues[vital] = document.getElementById(formIdList[vital][1]).value;
    document.getElementById(formIdList[vital][1]).value = null;
  } else {
    document.getElementById(formIdList[vital][1]).value = tempValues[vital] || initialValues[vital];
    document.getElementById(formIdList[vital][2]).value = tempValues[vital] || initialValues[vital];
    tempValues[vital] = null;
  }
}

function enableBloodPressureInput() {
  if (!document.getElementById('bloodPressureHighCheckBox').checked) {
    tempValues[4] = document.getElementById('bloodPressureHighInput').value;
    tempValues[5] = document.getElementById('bloodPressureLowInput').value;
    document.getElementById('bloodPressureHighInput').value = null;
    document.getElementById('bloodPressureLowInput').value = null;
  } else {
    document.getElementById('bloodPressureHighInput').value = tempValues[4] || 110;
    document.getElementById('bloodPressureHighRange').value = tempValues[4] || 110;
    document.getElementById('bloodPressureLowInput').value = tempValues[5] || 70;
    document.getElementById('bloodPressureLowRange').value = tempValues[5] || 70;
    tempValues[4] = null;
    tempValues[4] = null;
  }

}