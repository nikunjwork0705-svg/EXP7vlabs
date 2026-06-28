import { useLabAlerts } from '../alerts/useLabAlerts.js'
import { playAlertSound } from '../utils/alertAudioManager.js' // 🚀 IMPORTED AUDIO MANAGER
import mcbOff from '../assets/mcb_off.png'
import mcbOnImg from '../assets/mcb_on.png'

const MCB = ({ mcbOn, setMcbOn, selected, isVerified }) => {
  const { showAlert } = useLabAlerts()

  const handleToggle = () => {
    // Silently return without showing an alert if MCB is already ON
    if (mcbOn) {
      return
    }

    if (!isVerified) {
      // 🚀 TRIGGER MCB ERROR AUDIO
      playAlertSound('mcbAlert')
      showAlert({
        title: 'Action Required',
        description: 'Make and check the connections before turning ON the MCB.',
        type: 'warning',
        icon: '⚠️',
        placement: 'center',
        requiresConfirmation: true,
        confirmLabel: 'OK'
      })
      return
    }

    setMcbOn(true)
    
    // 🚀 TRIGGER MCB SUCCESS AUDIO (Updated key to match alertAudioManager)
    playAlertSound('mcbOn')

    showAlert({
      title: 'MCB Turned ON',
      description: 'MCB has been turned ON. Now, click the power button of the autotransformer.',
      type: 'success',
      icon: '⚡',
      placement: 'top-right',
      duration: 5000
    })
  }

  return (
    <article className="mcb" style={{ position: 'relative', width: '100%', height: '100%' }}>
      
      <img
        alt={mcbOn ? 'MCB switched on' : 'MCB switched off'}
        className="mcb__image"
        src={mcbOn ? mcbOnImg : mcbOff}
        style={{ transform: 'scale(0.8, 0.87)' }}
      />

      <button
        aria-label={mcbOn ? 'Switch MCB off' : 'Switch MCB on'}
        aria-pressed={mcbOn}
        className="mcb__button"
        onClick={handleToggle}
        type="button"
        style={{ cursor: mcbOn ? 'default' : 'pointer' }} 
      />

      <div
        id="mcb-walkthrough-target"
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '68%',
          height: '84%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
    </article>
  )
}

export default MCB