export const calculateReadings = ({ voltage, powerOn }) => {
  if (!powerOn || voltage === 0) {
    return { i1: 0, i2: 0, iL: 0, iR: 0, iC: 0 };
  }

  const f = 50;         
  const R = 100;        
  const L = 0.20;       
  const C = 47e-6;      // (47 µF)

  const XL = 2 * Math.PI * f * L;       // ~62.832 Ω
  const XC = 1 / (2 * Math.PI * f * C); // ~67.726 Ω

  const IR = voltage / R;
  const IL = voltage / XL;
  const IC = voltage / XC;

  const totalCurrent = Math.sqrt(Math.pow(IR, 2) + Math.pow(IL - IC, 2));

  const truePower = voltage * IR; 

  return {
    i1: Number(totalCurrent.toFixed(3)), // Ammeter reading (Total Current)
    i2: Number(truePower.toFixed(2)),    // Wattmeter reading (True Power)
    iL: Number(IL.toFixed(3)),           // Inductor branch current
    iR: Number(IR.toFixed(3)),           // Resistor branch current
    iC: Number(IC.toFixed(3)),           // Capacitor branch current
  };
}