import React from 'react'
import resistorImg0 from '../assets/0ohm.png' 
import resistorImg100 from '../assets/100ohm.png'

const Resistor = ({ 
  isVerified = false, 
  mcbOn = false, 
  variacOn = false, 
  voltage = 0, 
  isRVerified = false 
}) => {
  
  // Directly base the image on whether the R value was verified from the CalculationsBoard
  const currentImg = isRVerified ? resistorImg100 : resistorImg0;

  return (
    <article id="resistor-component" className="relative w-full h-full" aria-label="Resistor">
      <div className="resistor-component__label">
        RESISTOR
      </div>
      <img 
        src={currentImg} 
        alt={isRVerified ? "100 Ohm Resistor" : "0 Ohm Resistor"} 
        className="w-full h-full object-contain transition-all duration-300" 
      />
    </article>
  )
}

export default Resistor