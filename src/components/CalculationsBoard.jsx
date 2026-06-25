// import { useState } from 'react'
// import { useLabAlerts } from '../alerts/useLabAlerts.js'

// const CalculationsBoard = ({ 
//   className = '', 
//   isVerified, 
//   powerOn, 
//   switchOn, 
//   voltage, 
//   observations = [], 
//   onWrongAttempt,
//   onRVerified 
// }) => {
//   const { showAlert } = useLabAlerts()

//   const [calcValues, setCalcValues] = useState({
//     r: '', xL: '', xC: '', l: '', c: '', z: '', powerFactor: '', s: '', q: ''
//   })

//   const [fieldErrors, setFieldErrors] = useState({
//     r: false, xL: false, xC: false, l: false, c: false, z: false, powerFactor: false, s: false, q: false
//   })

//   const [hasVerified, setHasVerified] = useState(false)
//   const [isFullyVerified, setIsFullyVerified] = useState(false)

//   const handleInputChange = (field, val) => {
//     const updatedValues = { ...calcValues, [field]: val };
//     setCalcValues(updatedValues);

//     // INSTANTLY KILL VERIFICATION ON TYPING
//     // Resets both Resistor Image and Report Button
//     if (onRVerified) {
//       onRVerified(false, false, updatedValues);
//     }

//     setIsFullyVerified(false);
//     setHasVerified(false);

//     if (hasVerified && !isFullyVerified) {
//       setFieldErrors((prev) => ({ ...prev, [field]: false }));
//     }
//   };

//   const checkExactValues = (val, validOptionsArray) => {
//     if (!val || val.trim() === '') return false;
//     const num = parseFloat(val);
//     if (isNaN(num)) return false;
//     return validOptionsArray.includes(num);
//   }

//   const handleVerify = (e) => {
//     e.preventDefault()

//     if (!isVerified || !powerOn || !switchOn || voltage !== 24 || observations.length === 0) {
//       showAlert({ title: 'Action Required', description: 'Please complete the circuit steps and add an observation first!', type: 'warning', icon: '⚠️', placement: 'center', duration: 3000 });
//       return;
//     }

//     const hasEmptyFields = Object.values(calcValues).some(val => val.trim() === '');
//     if (hasEmptyFields) {
//       showAlert({ title: 'Incomplete Calculations', description: 'First calculate all the components.', type: 'warning', icon: '⚠️', placement: 'center', duration: 3500 });
//       return;
//     }

//     const newErrors = {
//       r: !checkExactValues(calcValues.r, [100, 100.0, 100.00]),            
//       xL: !checkExactValues(calcValues.xL, [62.832, 62.83]),        
//       xC: !checkExactValues(calcValues.xC, [67.726, 67.73, 62.72]),        
//       l: !checkExactValues(calcValues.l, [0.20, 0.2]),          
//       c: !checkExactValues(calcValues.c, [47, 47.0, 47.00]),            
//       z: !checkExactValues(calcValues.z, [99.345, 99.34, 99.35]),        
//       powerFactor: !checkExactValues(calcValues.powerFactor, [0.993, 0.99]),
//       s: !checkExactValues(calcValues.s, [5.798, 5.79, 5.80]),           
//       q: !checkExactValues(calcValues.q, [0.662, 0.66])           
//     }

//     setCalcValues(prev => {
//       const clearedValues = { ...prev };
//       Object.keys(newErrors).forEach(key => {
//         if (newErrors[key] === true) { clearedValues[key] = ''; }
//       });
//       return clearedValues;
//     });

//     setFieldErrors(newErrors)
//     setHasVerified(true)

//     const hasAnyError = Object.values(newErrors).some(err => err === true);
    
//     // Check just the Resistor for the Image 
//     const isResistorCorrect = !newErrors.r && calcValues.r !== '';

//     // SEND BOTH FLAGS TO APP.JSX
//     if (onRVerified) {
//       onRVerified(isResistorCorrect, !hasAnyError, calcValues);
//     }

//     if (hasAnyError) {
//       if (onWrongAttempt) onWrongAttempt();
//       showAlert({ title: 'Verification Failed', description: 'Highlighted Values are Incorrect.', type: 'error', icon: '❌', placement: 'center', duration: 4000 });
//     } else {
//       setIsFullyVerified(true); 
//       showAlert({ title: 'Verification Complete', description: 'All theoretical calculations are exactly correct!', type: 'success', icon: '✅', placement: 'center', duration: 3500 });
//     }
//   }

//   const getInputStyle = (field) => {
//     if (!hasVerified) return {}; 
//     if (fieldErrors[field]) return { backgroundColor: '#cd2d1e', color: '#ffffff', borderColor: '#c33629' };
//     if (isFullyVerified) return { backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#166534' };
//     return { backgroundColor: 'transparent', color: 'inherit' };
//   }

//   return (
//     <section className={`calc-board-container ${className}`} id="calculations-board">
//       <header className="calc-board-header">
//         <div className="calc-board-title-wrapper">
//           <span className="header-board__ornament calc-board-ornament" />
//           <h2 className="calc-board-title">Theoretical Calculations</h2>
//           <span className="header-board__ornament header-board__ornament--right calc-board-ornament" />
//         </div>
//       </header>

//       <div className="calc-board-body">
//         <form onSubmit={handleVerify} className="calc-board-form">
//           <div className="calc-board-grid">
            
//             <div className="calc-input-group">
//               <label className="calc-input-label">R (Ω)</label>
//               <input step="any" placeholder="Resistance" value={calcValues.r} onChange={(e) => handleInputChange('r', e.target.value)} style={getInputStyle('r')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">X<sub>L</sub> (Ω)</label>
//               <input step="any" placeholder="Inductive Reactance" value={calcValues.xL} onChange={(e) => handleInputChange('xL', e.target.value)} style={getInputStyle('xL')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">X<sub>C</sub> (Ω)</label>
//               <input step="any" placeholder="Capacitive Reactance" value={calcValues.xC} onChange={(e) => handleInputChange('xC', e.target.value)} style={getInputStyle('xC')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">L (H)</label>
//               <input step="any" placeholder="Inductance" value={calcValues.l} onChange={(e) => handleInputChange('l', e.target.value)} style={getInputStyle('l')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">C (µF)</label>
//               <input step="any" placeholder="Capacitance" value={calcValues.c} onChange={(e) => handleInputChange('c', e.target.value)} style={getInputStyle('c')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">Z (Ω)</label>
//               <input step="any" placeholder="Impedence" value={calcValues.z} onChange={(e) => handleInputChange('z', e.target.value)} style={getInputStyle('z')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">cos(Φ)</label>
//               <input step="any" placeholder="Power Factor" value={calcValues.powerFactor} onChange={(e) => handleInputChange('powerFactor', e.target.value)} style={getInputStyle('powerFactor')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">S (VA)</label>
//               <input step="any" placeholder="Apparent Power" value={calcValues.s} onChange={(e) => handleInputChange('s', e.target.value)} style={getInputStyle('s')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">Q (VAR)</label>
//               <input step="any" placeholder="Reactive Power" value={calcValues.q} onChange={(e) => handleInputChange('q', e.target.value)} style={getInputStyle('q')} className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" disabled={isFullyVerified} />
//             </div>
            
//             <div className="calc-button-wrapper" style={{ alignItems: 'flex-end', marginTop: 0 }}>
//               <button type="submit" className="calc-verify-button disabled:opacity-50 disabled:cursor-not-allowed" style={{ width: '100%' }} disabled={isFullyVerified || observations.length === 0} title={observations.length === 0 ? "Add a reading to the observation table first" : ""}>
//                 {isFullyVerified ? 'VERIFIED' : 'VERIFY'}
//               </button>
//             </div>

//           </div>
//         </form>
//       </div>
//     </section>
//   )
// }

// export default CalculationsBoard


//2ND 
// import { useState } from 'react'
// import { useLabAlerts } from '../alerts/useLabAlerts.js'

// // Define the acceptable min and max ranges for each input field
// const FIELD_RANGES = {
//   r: { min: 50, max: 150, name: "Resistance (R)" },
//   xL: { min: 10, max: 120, name: "Inductive Reactance (XL)" },
//   xC: { min: 10, max: 120, name: "Capacitive Reactance (XC)" },
//   l: { min: 0.1, max: 0.5, name: "Inductance (L)" },
//   c: { min: 10, max: 100, name: "Capacitance (C)" },
//   z: { min: 80, max: 120, name: "Impedance (Z)" },
//   powerFactor: { min: 0.1, max: 1.0, name: "Power Factor (cos Φ)" },
//   s: { min: 1.0, max: 7.0, name: "Apparent Power (S)" },
//   q: { min: 0.1, max: 2.0, name: "Reactive Power (Q)" }
// };

// const CalculationsBoard = ({ 
//   className = '', 
//   isVerified, 
//   powerOn, 
//   switchOn, 
//   voltage, 
//   observations = [], 
//   onWrongAttempt,
//   onRVerified 
// }) => {
//   const { showAlert } = useLabAlerts()

//   const [calcValues, setCalcValues] = useState({
//     r: '', xL: '', xC: '', l: '', c: '', z: '', powerFactor: '', s: '', q: ''
//   })

//   const [fieldErrors, setFieldErrors] = useState({
//     r: false, xL: false, xC: false, l: false, c: false, z: false, powerFactor: false, s: false, q: false
//   })

//   const [hasVerified, setHasVerified] = useState(false)
//   const [isFullyVerified, setIsFullyVerified] = useState(false)

//   const handleInputChange = (field, val) => {
//     const updatedValues = { ...calcValues, [field]: val };
//     setCalcValues(updatedValues);

//     if (onRVerified) {
//       onRVerified(false, false, updatedValues);
//     }

//     setIsFullyVerified(false);
//     setHasVerified(false);

//     if (hasVerified && !isFullyVerified) {
//       setFieldErrors((prev) => ({ ...prev, [field]: false }));
//     }
//   };

//   // NEW: Validate ranges when the user clicks away from the input field
//   // const handleBlur = (field, val) => {
//   //   if (!val || val.trim() === '') return;
    
//   //   const num = parseFloat(val);
//   //   if (isNaN(num)) return;

//   //   const range = FIELD_RANGES[field];
//   //   if (range && (num < range.min || num > range.max)) {
//   //     showAlert({ 
//   //       title: 'Value Out of Range', 
//   //       description: `The value for ${range.name} must be between ${range.min} and ${range.max}.`, 
//   //       type: 'warning', 
//   //       icon: '⚠️', 
//   //       placement: 'center', 
//   //       duration: 4000 
//   //     });
      
//   //     // Clear the invalid input so the user is forced to re-enter a valid number
//   //     setCalcValues((prev) => ({ ...prev, [field]: '' }));
//   //   }
//   // };
//   // NEW: Validate ranges when the user clicks away from the input field
//   const handleBlur = (field, val) => {
//     if (!val || val.trim() === '') return;
    
//     const num = parseFloat(val);
//     if (isNaN(num)) return;

//     const range = FIELD_RANGES[field];
//     if (range && (num < range.min || num > range.max)) {
//       showAlert({ 
//         title: 'Value Out of Range', 
//         description: `The value for ${range.name} must be between ${range.min} and ${range.max}.`, 
//         type: 'warning', 
//         icon: '⚠️', 
//         placement: 'center', 
//         duration: 4000,
//         // 🚀 THE FIX: Add a unique timestamp so the alert system never ignores it!
//         dedupeKey: `range-error-${field}-${Date.now()}` 
//       });
      
//       // Clear the invalid input so the user is forced to re-enter a valid number
//       setCalcValues((prev) => ({ ...prev, [field]: '' }));
//     }
//   };

//   const checkExactValues = (val, validOptionsArray) => {
//     if (!val || val.trim() === '') return false;
//     const num = parseFloat(val);
//     if (isNaN(num)) return false;
//     return validOptionsArray.includes(num);
//   }

//   const handleVerify = (e) => {
//     e.preventDefault()

//     if (!isVerified || !powerOn || !switchOn || voltage !== 24 || observations.length === 0) {
//       showAlert({ title: 'Action Required', description: 'Please complete the circuit steps and add an observation first!', type: 'warning', icon: '⚠️', placement: 'center', duration: 3000 });
//       return;
//     }

//     const hasEmptyFields = Object.values(calcValues).some(val => val.trim() === '');
//     if (hasEmptyFields) {
//       showAlert({ title: 'Incomplete Calculations', description: 'First calculate all the components.', type: 'warning', icon: '⚠️', placement: 'center', duration: 3500 });
//       return;
//     }

//     const newErrors = {
//       r: !checkExactValues(calcValues.r, [100, 100.0, 100.00]),            
//       xL: !checkExactValues(calcValues.xL, [62.832, 62.83]),        
//       xC: !checkExactValues(calcValues.xC, [67.726, 67.73, 62.72]),        
//       l: !checkExactValues(calcValues.l, [0.20, 0.2]),          
//       c: !checkExactValues(calcValues.c, [47, 47.0, 47.00]),            
//       z: !checkExactValues(calcValues.z, [99.345, 99.34, 99.35]),        
//       powerFactor: !checkExactValues(calcValues.powerFactor, [0.993, 0.99]),
//       s: !checkExactValues(calcValues.s, [5.798, 5.79, 5.80]),           
//       q: !checkExactValues(calcValues.q, [0.662, 0.66])           
//     }

//     setCalcValues(prev => {
//       const clearedValues = { ...prev };
//       Object.keys(newErrors).forEach(key => {
//         if (newErrors[key] === true) { clearedValues[key] = ''; }
//       });
//       return clearedValues;
//     });

//     setFieldErrors(newErrors)
//     setHasVerified(true)

//     const hasAnyError = Object.values(newErrors).some(err => err === true);
//     const isResistorCorrect = !newErrors.r && calcValues.r !== '';

//     if (onRVerified) {
//       onRVerified(isResistorCorrect, !hasAnyError, calcValues);
//     }

//     if (hasAnyError) {
//       if (onWrongAttempt) onWrongAttempt();
//       showAlert({ title: 'Verification Failed', description: 'Highlighted Values are Incorrect.', type: 'error', icon: '❌', placement: 'center', duration: 4000 });
//     } else {
//       setIsFullyVerified(true); 
//       showAlert({ title: 'Verification Complete', description: 'All theoretical calculations are exactly correct!', type: 'success', icon: '✅', placement: 'center', duration: 3500 });
//     }
//   }

//   const getInputStyle = (field) => {
//     if (!hasVerified) return {}; 
//     if (fieldErrors[field]) return { backgroundColor: '#cd2d1e', color: '#ffffff', borderColor: '#c33629' };
//     if (isFullyVerified) return { backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#166534' };
//     return { backgroundColor: 'transparent', color: 'inherit' };
//   }

//   return (
//     <section className={`calc-board-container ${className}`} id="calculations-board">
//       <header className="calc-board-header">
//         <div className="calc-board-title-wrapper">
//           <span className="header-board__ornament calc-board-ornament" />
//           <h2 className="calc-board-title">Theoretical Calculations</h2>
//           <span className="header-board__ornament header-board__ornament--right calc-board-ornament" />
//         </div>
//       </header>

//       <div className="calc-board-body">
//         <form onSubmit={handleVerify} className="calc-board-form">
//           <div className="calc-board-grid">
            
//             <div className="calc-input-group">
//               <label className="calc-input-label">R (Ω)</label>
//               <input 
//                 step="any" 
//                 placeholder="Resistance" 
//                 value={calcValues.r} 
//                 onChange={(e) => handleInputChange('r', e.target.value)} 
//                 onBlur={(e) => handleBlur('r', e.target.value)}
//                 style={getInputStyle('r')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">X<sub>L</sub> (Ω)</label>
//               <input 
//                 step="any" 
//                 placeholder="Inductive Reactance" 
//                 value={calcValues.xL} 
//                 onChange={(e) => handleInputChange('xL', e.target.value)} 
//                 onBlur={(e) => handleBlur('xL', e.target.value)}
//                 style={getInputStyle('xL')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">X<sub>C</sub> (Ω)</label>
//               <input 
//                 step="any" 
//                 placeholder="Capacitive Reactance" 
//                 value={calcValues.xC} 
//                 onChange={(e) => handleInputChange('xC', e.target.value)} 
//                 onBlur={(e) => handleBlur('xC', e.target.value)}
//                 style={getInputStyle('xC')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">L (H)</label>
//               <input 
//                 step="any" 
//                 placeholder="Inductance" 
//                 value={calcValues.l} 
//                 onChange={(e) => handleInputChange('l', e.target.value)} 
//                 onBlur={(e) => handleBlur('l', e.target.value)}
//                 style={getInputStyle('l')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">C (µF)</label>
//               <input 
//                 step="any" 
//                 placeholder="Capacitance" 
//                 value={calcValues.c} 
//                 onChange={(e) => handleInputChange('c', e.target.value)} 
//                 onBlur={(e) => handleBlur('c', e.target.value)}
//                 style={getInputStyle('c')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">Z (Ω)</label>
//               <input 
//                 step="any" 
//                 placeholder="Impedence" 
//                 value={calcValues.z} 
//                 onChange={(e) => handleInputChange('z', e.target.value)} 
//                 onBlur={(e) => handleBlur('z', e.target.value)}
//                 style={getInputStyle('z')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">cos(Φ)</label>
//               <input 
//                 step="any" 
//                 placeholder="Power Factor" 
//                 value={calcValues.powerFactor} 
//                 onChange={(e) => handleInputChange('powerFactor', e.target.value)} 
//                 onBlur={(e) => handleBlur('powerFactor', e.target.value)}
//                 style={getInputStyle('powerFactor')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">S (VA)</label>
//               <input 
//                 step="any" 
//                 placeholder="Apparent Power" 
//                 value={calcValues.s} 
//                 onChange={(e) => handleInputChange('s', e.target.value)} 
//                 onBlur={(e) => handleBlur('s', e.target.value)}
//                 style={getInputStyle('s')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>

//             <div className="calc-input-group">
//               <label className="calc-input-label">Q (VAR)</label>
//               <input 
//                 step="any" 
//                 placeholder="Reactive Power" 
//                 value={calcValues.q} 
//                 onChange={(e) => handleInputChange('q', e.target.value)} 
//                 onBlur={(e) => handleBlur('q', e.target.value)}
//                 style={getInputStyle('q')} 
//                 className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
//                 disabled={isFullyVerified} 
//               />
//             </div>
            
//             <div className="calc-button-wrapper" style={{ alignItems: 'flex-end', marginTop: 0 }}>
//               <button type="submit" className="calc-verify-button disabled:opacity-50 disabled:cursor-not-allowed" style={{ width: '100%' }} disabled={isFullyVerified || observations.length === 0} title={observations.length === 0 ? "Add a reading to the observation table first" : ""}>
//                 {isFullyVerified ? 'VERIFIED' : 'VERIFY'}
//               </button>
//             </div>

//           </div>
//         </form>
//       </div>
//     </section>
//   )
// }

// export default CalculationsBoard

//3rd

import { useState } from 'react'
import { useLabAlerts } from '../alerts/useLabAlerts.js'

// Define the acceptable min and max ranges for each input field
const FIELD_RANGES = {
  r: { min: 50, max: 150, name: "Resistance (R)" },
  xL: { min: 10, max: 120, name: "Inductive Reactance (XL)" },
  xC: { min: 10, max: 120, name: "Capacitive Reactance (XC)" },
  l: { min: 0.1, max: 0.5, name: "Inductance (L)" },
  c: { min: 10, max: 100, name: "Capacitance (C)" },
  z: { min: 80, max: 120, name: "Impedance (Z)" },
  powerFactor: { min: 0.1, max: 1.0, name: "Power Factor (cos Φ)" },
  s: { min: 1.0, max: 7.0, name: "Apparent Power (S)" },
  q: { min: 0.1, max: 2.0, name: "Reactive Power (Q)" }
};

const CalculationsBoard = ({ 
  className = '', 
  isVerified, 
  powerOn, 
  switchOn, 
  voltage, 
  observations = [], 
  onWrongAttempt,
  onRVerified 
}) => {
  const { showAlert } = useLabAlerts()

  const [calcValues, setCalcValues] = useState({
    r: '', xL: '', xC: '', l: '', c: '', z: '', powerFactor: '', s: '', q: ''
  })

  const [fieldErrors, setFieldErrors] = useState({
    r: false, xL: false, xC: false, l: false, c: false, z: false, powerFactor: false, s: false, q: false
  })

  const [hasVerified, setHasVerified] = useState(false)
  const [isFullyVerified, setIsFullyVerified] = useState(false)

  // 🚀 THE FIX: Determine if inputs should be disabled based on observation table length
  const isInputDisabled = isFullyVerified || observations.length === 0;
  const disabledTitle = observations.length === 0 ? "Add a reading to the observation table first" : "";

  const handleInputChange = (field, val) => {
    const updatedValues = { ...calcValues, [field]: val };
    setCalcValues(updatedValues);

    if (onRVerified) {
      onRVerified(false, false, updatedValues);
    }

    setIsFullyVerified(false);
    setHasVerified(false);

    if (hasVerified && !isFullyVerified) {
      setFieldErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleBlur = (field, val) => {
    if (!val || val.trim() === '') return;
    
    const num = parseFloat(val);
    if (isNaN(num)) return;

    const range = FIELD_RANGES[field];
    if (range && (num < range.min || num > range.max)) {
      showAlert({ 
        title: 'Value Out of Range', 
        description: `The value for ${range.name} must be between ${range.min} and ${range.max}.`, 
        type: 'warning', 
        icon: '⚠️', 
        placement: 'center', 
        duration: 4000,
        dedupeKey: `range-error-${field}-${Date.now()}` 
      });
      
      // Clear the invalid input so the user is forced to re-enter a valid number
      setCalcValues((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const checkExactValues = (val, validOptionsArray) => {
    if (!val || val.trim() === '') return false;
    const num = parseFloat(val);
    if (isNaN(num)) return false;
    return validOptionsArray.includes(num);
  }

  const handleVerify = (e) => {
    e.preventDefault()

    if (!isVerified || !powerOn || !switchOn || voltage !== 24 || observations.length === 0) {
      showAlert({ title: 'Action Required', description: 'Please complete the circuit steps and add an observation first!', type: 'warning', icon: '⚠️', placement: 'center', duration: 3000 });
      return;
    }

    const hasEmptyFields = Object.values(calcValues).some(val => val.trim() === '');
    if (hasEmptyFields) {
      showAlert({ title: 'Incomplete Calculations', description: 'First calculate all the components.', type: 'warning', icon: '⚠️', placement: 'center', duration: 3500 });
      return;
    }

    const newErrors = {
      r: !checkExactValues(calcValues.r, [100, 100.0, 100.00]),            
      xL: !checkExactValues(calcValues.xL, [62.832, 62.83]),        
      xC: !checkExactValues(calcValues.xC, [67.726, 67.73, 62.72]),        
      l: !checkExactValues(calcValues.l, [0.20, 0.2]),          
      c: !checkExactValues(calcValues.c, [47, 47.0, 47.00]),            
      z: !checkExactValues(calcValues.z, [99.345, 99.34, 99.35]),        
      powerFactor: !checkExactValues(calcValues.powerFactor, [0.993, 0.99]),
      s: !checkExactValues(calcValues.s, [5.798, 5.79, 5.80]),           
      q: !checkExactValues(calcValues.q, [0.662, 0.66])           
    }

    setCalcValues(prev => {
      const clearedValues = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (newErrors[key] === true) { clearedValues[key] = ''; }
      });
      return clearedValues;
    });

    setFieldErrors(newErrors)
    setHasVerified(true)

    const hasAnyError = Object.values(newErrors).some(err => err === true);
    const isResistorCorrect = !newErrors.r && calcValues.r !== '';

    if (onRVerified) {
      onRVerified(isResistorCorrect, !hasAnyError, calcValues);
    }

    if (hasAnyError) {
      if (onWrongAttempt) onWrongAttempt();
      showAlert({ title: 'Verification Failed', description: 'Highlighted Values are Incorrect.', type: 'error', icon: '❌', placement: 'center', duration: 4000 });
    } else {
      setIsFullyVerified(true); 
      showAlert({ title: 'Verification Complete', description: 'Theoretical calculations verified successfully. All entered values are correct. Your simulation is now complete. You may view the report by clicking on the generate report button.',
         type: 'success', icon: '✅', placement: 'center', duration: 3500 });
    }
  }

  const getInputStyle = (field) => {
    if (!hasVerified) return {}; 
    if (fieldErrors[field]) return { backgroundColor: '#cd2d1e', color: '#ffffff', borderColor: '#c33629' };
    if (isFullyVerified) return { backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#166534' };
    return { backgroundColor: 'transparent', color: 'inherit' };
  }

  return (
    <section className={`calc-board-container ${className}`} id="calculations-board">
      <header className="calc-board-header">
        <div className="calc-board-title-wrapper">
          <span className="header-board__ornament calc-board-ornament" />
          <h2 className="calc-board-title">Theoretical Calculations</h2>
          <span className="header-board__ornament header-board__ornament--right calc-board-ornament" />
        </div>
      </header>

      <div className="calc-board-body">
        <form onSubmit={handleVerify} className="calc-board-form">
          <div className="calc-board-grid">
            
            <div className="calc-input-group">
              <label className="calc-input-label">R (Ω)</label>
              <input 
                step="any" 
                placeholder="Resistance" 
                value={calcValues.r} 
                onChange={(e) => handleInputChange('r', e.target.value)} 
                onBlur={(e) => handleBlur('r', e.target.value)}
                style={getInputStyle('r')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-input-label">X<sub>L</sub> (Ω)</label>
              <input 
                step="any" 
                placeholder="Inductive Reactance" 
                value={calcValues.xL} 
                onChange={(e) => handleInputChange('xL', e.target.value)} 
                onBlur={(e) => handleBlur('xL', e.target.value)}
                style={getInputStyle('xL')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-input-label">X<sub>C</sub> (Ω)</label>
              <input 
                step="any" 
                placeholder="Capacitive Reactance" 
                value={calcValues.xC} 
                onChange={(e) => handleInputChange('xC', e.target.value)} 
                onBlur={(e) => handleBlur('xC', e.target.value)}
                style={getInputStyle('xC')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-input-label">L (H)</label>
              <input 
                step="any" 
                placeholder="Inductance" 
                value={calcValues.l} 
                onChange={(e) => handleInputChange('l', e.target.value)} 
                onBlur={(e) => handleBlur('l', e.target.value)}
                style={getInputStyle('l')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-input-label">C (µF)</label>
              <input 
                step="any" 
                placeholder="Capacitance" 
                value={calcValues.c} 
                onChange={(e) => handleInputChange('c', e.target.value)} 
                onBlur={(e) => handleBlur('c', e.target.value)}
                style={getInputStyle('c')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-input-label">Z (Ω)</label>
              <input 
                step="any" 
                placeholder="Impedence" 
                value={calcValues.z} 
                onChange={(e) => handleInputChange('z', e.target.value)} 
                onBlur={(e) => handleBlur('z', e.target.value)}
                style={getInputStyle('z')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-input-label">cos(Φ)</label>
              <input 
                step="any" 
                placeholder="Power Factor" 
                value={calcValues.powerFactor} 
                onChange={(e) => handleInputChange('powerFactor', e.target.value)} 
                onBlur={(e) => handleBlur('powerFactor', e.target.value)}
                style={getInputStyle('powerFactor')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-input-label">S (VA)</label>
              <input 
                step="any" 
                placeholder="Apparent Power" 
                value={calcValues.s} 
                onChange={(e) => handleInputChange('s', e.target.value)} 
                onBlur={(e) => handleBlur('s', e.target.value)}
                style={getInputStyle('s')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-input-label">Q (VAR)</label>
              <input 
                step="any" 
                placeholder="Reactive Power" 
                value={calcValues.q} 
                onChange={(e) => handleInputChange('q', e.target.value)} 
                onBlur={(e) => handleBlur('q', e.target.value)}
                style={getInputStyle('q')} 
                className="calc-input-field disabled:opacity-75 disabled:cursor-not-allowed" 
                disabled={isInputDisabled} 
                title={disabledTitle}
              />
            </div>
            
            <div className="calc-button-wrapper" style={{ alignItems: 'flex-end', marginTop: 0 }}>
              <button type="submit" className="calc-verify-button disabled:opacity-50 disabled:cursor-not-allowed" style={{ width: '100%' }} disabled={isInputDisabled} title={disabledTitle}>
                {isFullyVerified ? 'VERIFIED' : 'VERIFY'}
              </button>
            </div>

          </div>
        </form>
      </div>
    </section>
  )
}

export default CalculationsBoard