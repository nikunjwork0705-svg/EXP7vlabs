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
      <div
        id="inductor-walkthrough-target"
        style={{ position: 'absolute', top: '0%', left: '25%', width: '50%', height: '90%', pointerEvents: 'none' }}
      />
    </article>
  )
}

export default Inductor