import React from 'react'
import capacitorImg from '../assets/capacitor.png' 

const Capacitor = () => {
  return (
    <article id="capacitor-component" className="relative w-full h-full" aria-label="Capacitor">
      <img 
        src={capacitorImg} 
        alt="Capacitor" 
        className="w-full h-full object-contain" 
      />
    </article>
  )
}

export default Capacitor

