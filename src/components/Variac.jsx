import { useEffect } from 'react' 
import variacOffImg from '../assets/Variacoff.png'
import variacOnImg from '../assets/Variacon.png'
import knob from '../assets/knob.png'

const Variac = ({ voltage = 0, setVoltage, mcbOn, isVerified, selected, variacOn, setVariacOn }) => {
  
  useEffect(() => {
    setVariacOn(false)
  }, [selected])

  const handleToggle = () => {

    if (!isVerified) {
      alert("Please verify your connections using the CHECK button first!")
      return
    }

    if (!mcbOn) {
      alert("Please turn ON the MCB before turning on the Variac!")
      return
    }

    setVariacOn(true)
  }

  const handleKnobClick = () => {
    if (!variacOn) {
      alert("Turn the Variac ON first before adjusting the voltage!");
      return;
    }
    
    if (voltage !== 230) {
      setVoltage(230);
    }
  }

  const startingAngle = 0; 
  const totalSweepDegrees = 390; 
  const knobRotation = startingAngle + (voltage / 250) * totalSweepDegrees;

  return (
    <div id="variac-button" className="absolute left-[35px] top-[70px] w-[330px] z-0">
      <img 
        src={variacOn ? variacOnImg : variacOffImg} 
        alt="Variac" 
        className="w-full h-auto object-contain"
      />
      
      <button 
        onClick={handleToggle}
        className="absolute top-[46.5%] left-[72%] w-[10%] h-[15%] bg-transparent cursor-pointer z-50 rounded-full"
        aria-label="Toggle Variac"
      />

      <div className="absolute top-[66px] left-[35px] w-[110px] h-[110px] pointer-events-none z-20 flex items-center justify-center">
        <img 
          src={knob}
          alt="Variac Knob"
          className="w-full h-full object-contain transition-transform duration-[3500ms] ease-out"
          style={{ 
            transform: `rotate(${knobRotation}deg)`,
            transformOrigin: '50% 50%' 
          }}
          draggable="false"
        />
      </div>

      <button
        onClick={handleKnobClick}
        className={`absolute top-[66px] left-[35px] w-[110px] h-[110px] bg-transparent z-30 rounded-full transition-colors ${variacOn && voltage === 0 ? 'cursor-pointer hover:bg-transparent' : 'cursor-default'}`}
        title={variacOn ? (voltage === 0 ? "Click to set to 230V" : "Voltage is locked at 230V") : "Variac is OFF"}
        aria-label="Set Variac Voltage"
      />
    </div>
  )
}

export default Variac