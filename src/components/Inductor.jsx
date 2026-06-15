import React from 'react'
import inductorImg from '../assets/inductor.png' 

const Inductor = () => {
  return (
    <article id="inductor-component" className="relative w-full h-full" aria-label="Inductor">
      
      <div className="inductor-component__label">
        INDUCTOR
      </div>

      <img 
        src={inductorImg} 
        alt="Inductor" 
        className="w-full h-full object-contain" 
      />
    </article>
  )
}

export default Inductor