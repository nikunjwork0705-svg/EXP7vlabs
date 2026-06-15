import { useEffect } from 'react' 
import { useLabAlerts } from '../alerts/useLabAlerts.js'
import variacOffImg from '../assets/Variacoff.png'
import variacOnImg from '../assets/Variacon.png'
import knob from '../assets/knob.png'

const Variac = ({ voltage = 0, setVoltage, mcbOn, isVerified, selected, variacOn, setVariacOn }) => {
  const { showAlert } = useLabAlerts()

  useEffect(() => {
    setVariacOn(false)
  }, [selected, setVariacOn])

  const handleToggle = () => {
    // FREEZE: If it's already on, do absolutely nothing.
    if (variacOn) return;

    if (!isVerified) {
      showAlert({
        title: 'Action Required',
        description: 'Please verify your connections using the CHECK button first.',
        type: 'warning',
        icon: '⚠️',
        placement: 'center',
        requiresConfirmation: true,
        confirmLabel: 'OK'
      })
      return
    }
    if (!mcbOn) {
      showAlert({
        title: 'Action Required',
        description: 'Please turn ON the MCB before turning on the Autotransformer.',
        type: 'warning',
        icon: '⚡',
        placement: 'center',
        requiresConfirmation: true,
        confirmLabel: 'OK'
      })
      return
    }
    
    // Normal turning-on sequence
    setVariacOn(true)
    
    showAlert({
      title: 'Autotransformer ON',
      description: 'Now, set the voltage to 24V by turning the Autotransformer Knob.',
      type: 'success',
      icon: '🎛️',
      placement: 'top-right'
    })
  }

  const handleKnobClick = () => {
    if (!variacOn) {
      showAlert({
        title: 'Action Required',
        description: 'Turn the Autotransformer ON first before adjusting the voltage!',
        type: 'warning',
        icon: '⚠️',
        placement: 'center',
        requiresConfirmation: true,
        confirmLabel: 'OK'
      })
      return;
    }
    
    if (voltage !== 24) {
      setVoltage(24);
    }
  }

  const startingAngle = -64; 
  const totalSweepDegrees = 162; 
  const maxVoltageOnDial = 140;
  
  const knobRotation = startingAngle + (voltage / maxVoltageOnDial) * totalSweepDegrees;

  return (
    <div id="variac-button" className="relative w-full h-full z-0">
      <img 
        src={variacOn ? variacOnImg : variacOffImg} 
        alt="Variac" 
        className="w-full h-auto object-contain"
      />
      
      {/* POWER BUTTON */}
      <button 
        onClick={handleToggle}
        disabled={variacOn}
        className={`absolute top-[46.5%] left-[72%] w-[10%] h-[15%] bg-transparent z-50 rounded-full ${variacOn ? 'cursor-default' : 'cursor-pointer'}`}
        title={variacOn ? "Autotransformer is locked ON" : "Turn ON Autotransformer"}
        aria-label="Toggle Variac"
      />

      <div className="absolute top-[74px] left-[85px] w-[80px] h-[108px] pointer-events-none z-20 flex items-center justify-center">
        <img 
          src={knob}
          alt="Variac Knob"
          className="w-full h-full object-contain"
          style={{ 
            transform: `rotate(${knobRotation}deg)`,
            transformOrigin: '50% 50%',
            transition: 'transform 1.5s ease-out' 
          }}
          draggable="false"
        />
      </div>

      {/* KNOB BUTTON */}
      <button
        onClick={handleKnobClick}
        disabled={voltage === 24}
        className={`absolute top-[81px] left-[32px] w-[110px] h-[110px] bg-transparent z-30 rounded-full transition-colors ${variacOn && voltage !== 24 ? 'cursor-pointer hover:bg-transparent' : 'cursor-default'}`}
        title={variacOn ? (voltage === 24 ? "Voltage is locked at 24V" : "Click to set to 24V") : "Variac is OFF"}
        aria-label="Set Variac Voltage"
      />

      {/* THE INVISIBLE TARGET BOX 
        Tweak top, left, width, and height to manually crop the highlight box! 
      */}
      <div
        id="variac-walkthrough-target"
        style={{
          position: 'absolute',
          top: '5%',       /* Adjust to move top edge up/down */
          left: '5%',      /* Adjust to move left edge left/right */
          width: '90%',    /* Squeeze or expand overall width */
          height: '95%',   /* Squeeze or expand overall height */
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
    </div>
  )
}

export default Variac