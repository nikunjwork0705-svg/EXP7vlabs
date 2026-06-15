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
      <div
        id="capacitor-walkthrough-target"
        style={{ position: 'absolute', top: '5%', left: '33%', width: '30%', height: '93%', pointerEvents: 'none' }}
      />
    </article>
  )
}

export default Capacitor

