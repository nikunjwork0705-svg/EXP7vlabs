export const calculateReadings = ({ voltage, powerOn, selected }) => {
  // If power is off, voltage is 0, or no load is selected, meters read 0
  if (!powerOn || voltage === 0 || !selected) {
    return { i1: 0, i2: 0 };
  }

  let basePower = 0; // True Power in Watts
  let pf = 1;        // Power Factor

  switch (selected) {
    case 'CFL':
      basePower = 24; 
      pf = 0.8843; 
      break;
    case 'Lamp':
      basePower = 59.8; 
      pf = 0.9630; 
      break;
    case 'LED':
      basePower = 8; 
      pf = 0.7729; 
      break;
    case 'Tubelight':
      basePower = 52.8; 
      pf = 0.7064;
      break;
    default:
      return { i1: 0, i2: 0 };
  }

  // Calculate how the Variac's voltage changes the current and power
  const voltageRatio = voltage / 230;
  
  const truePower = basePower * (voltageRatio * voltageRatio); // Power scales quadratically
  const apparentPowerBase = basePower / pf;
  const currentBase = apparentPowerBase / 230;
  
  const current = currentBase * voltageRatio; // Current scales linearly

  return {
    i1: Number(current.toFixed(3)),  // i1 is Amps (Current)
    i2: Number(truePower.toFixed(2)) // i2 is Watts (True Power)
  };
}