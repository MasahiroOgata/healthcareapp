vital_keys = [
    'vitalTitle', 'vitalName',
    'fieldName', 'iconName',
    'defaultValue', 'step', 'floatDigit',
    'inputMin', 'inputMax', 'rangeMin', 'rangeMax',    
]

vital_values_lists = [
    [
        [
        '体温', 'bodyTemperature', 
        'body_temperature', 'fa-temperature-half',
        36.5, 0.1, 1,
        34.0, 42.0, 35.0, 38.5, 
        ],
    ],
    [
        [
        '血糖値', 'bloodSugerLevel', 
        'blood_sugar_level', 'fa-cubes-stacked',
        130, 1, 0,
        50, 300, 60, 200,
        ],
    ], 
    [
        [
        '酸素飽和度', 'SpO2Level',
        'spo2_level', 'fa-hand-point-up',
        98, 1, 0,
        50, 100, 90, 100,
        ],
    ], 
    [
        [
        '心拍数', 'heartRate',
        'heart_rate', 'fa-heart-pulse',
        80, 1, 0,
        40, 250, 50, 130
        ],
    ], 
]
"""
[
    [

    ],
    [
    
    ],
]

"""

vital_items = []
for vital_values_list in vital_values_lists:
    vital_item =[]
    for vital_values in vital_values_list:
        vital_item.append(dict(zip(vital_keys, vital_values)))
        vital_items.append(vital_item)

print(vital_items)