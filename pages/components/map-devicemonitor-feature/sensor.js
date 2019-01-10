const passTrans = {
  '1H': 'sensor1h',
  '1V': 'sensor2v',
  '2H': 'sensor3h',
  '2V': 'sensor4v',
  '3H': 'sensor5h',
  '3V': 'sensor6v',
  '4H': 'sensor7h',
  '4V': 'sensor8v'

};
const speedOrAccel = {
  '1-1H': 'accel',
  '1-2H': 'speed',
  '2-1V': 'accel',
  '2-2V': 'speed',
  '3-1H': 'accel',
  '3-2H': 'speed',
  '4-1V': 'accel',
  '4-2V': 'speed'
};
const speedOrAccel1 = {
  'speed': 'speedseries',
  'acceleration': 'accelseries'
};
export {
  passTrans,
  speedOrAccel,
  speedOrAccel1
};
