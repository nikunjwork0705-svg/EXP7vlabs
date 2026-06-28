import { useLabAlerts } from '../alerts/useLabAlerts.js'
import { playAlertSound, stopAlertSound } from '../utils/alertAudioManager.js' 
import mcbOff from '../assets/mcb_off.png'
import mcbOnImg from '../assets/mcb_on.png'

const MCB = ({ mcbOn, setMcbOn, selected, isVerified }) => {
  const { showAlert } = useLabAlerts()

  const handleToggle = () => {
    if (mcbOn) return;

    if (!isVerified) {
      playAlertSound('mcbAlert')
      showAlert({
        title: 'Action Required',
        description: 'Make and check the connections before turning ON the MCB.',
        type: 'warning',
        icon: '⚠️',
        placement: 'center',
        requiresConfirmation: true, // Warnings usually keep the OK button
        confirmLabel: 'OK',
        onConfirm: () => stopAlertSound(), 
        onClose: () => stopAlertSound()
      })
      return
    }

    setMcbOn(true)
    playAlertSound('mcbOn')

    showAlert({
      title: 'MCB Turned ON',
      description: 'MCB has been turned ON. Now, click the power button of the autotransformer.',
      type: 'success',
      icon: '⚡',
      placement: 'top-right',
      duration: 6000, // ⏳ Duration is back! (No requiresConfirmation)
      onClose: () => stopAlertSound() // 🚀 Stops audio when timer ends or 'X' is clicked
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
        style={{ position: 'absolute', top: '10%', left: '15%', width: '68%', height: '84%', pointerEvents: 'none', zIndex: 0 }}
      />
    </article>
  )
}

export default MCB