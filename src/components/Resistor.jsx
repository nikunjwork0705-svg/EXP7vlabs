import React from 'react'
import resistorImg0 from '../assets/0ohm.png' 
import resistorImg50 from '../assets/50ohm.png'

const Resistor = ({ isVerified = false, mcbOn = false, variacOn = false, voltage = 0 }) => {
  
  const isActive = isVerified && mcbOn && variacOn && (Number(voltage) >= 220);

  const currentImg = isActive ? resistorImg50 : resistorImg0;

  return (
    <article id="resistor-component" className="relative w-full h-full" aria-label="Resistor">
      <img 
        src={currentImg} 
        alt={isActive ? "50 Ohm Resistor" : "0 Ohm Resistor"} 
        className="w-full h-full object-contain" 
      />
    </article>
  )
}

export default Resistor