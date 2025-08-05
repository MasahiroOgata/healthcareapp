const colorList = ["#de7a22", "#fd3c3c", "#061283", "#138d90"]

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
  ['checkBoxBodyTemperature', 'bodyTemperatureInput', 'bodyTemperatureRange'],
  ['checkBoxBloodSugerLevel', 'bloodSugerLevelInput', 'bloodSugerLevelRange'],
  ['checkBoxSpO2Level', 'SpO2LevelInput', 'SpO2LevelRange'],
];

const initialValues = [36.5, 130, 98.00, ];

function enableVitalInput(vital) {
  
  if (!document.getElementById(formIdList[vital][0]).checked) {
    document.getElementById(formIdList[vital][1]).value = null;
  } else {
    document.getElementById(formIdList[vital][1]).value = initialValues[vital];
    document.getElementById(formIdList[vital][2]).value = initialValues[vital];
  }
}

function enableBloodPressureInput() {
  if (!document.getElementById('checkBoxBloodPressure').checked) {
    document.getElementById('bloodPressureHighInput').value = null;
    document.getElementById('bloodPressureLowInput').value = null;
  } else {
    document.getElementById('bloodPressureHighInput').value = 110;
    document.getElementById('bloodPressureHighRange').value = 110;
    document.getElementById('bloodPressureLowInput').value = 60;
    document.getElementById('bloodPressureLowRange').value = 60;

  }

}