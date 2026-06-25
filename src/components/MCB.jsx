// import { useLabAlerts } from '../alerts/useLabAlerts.js'
// import mcbOff from '../assets/mcb_off.png'
// import mcbOnImg from '../assets/mcb_on.png'

// const MCB = ({ mcbOn, setMcbOn, selected, isVerified }) => {
//   // Pull in the custom alert system
//   const { showAlert } = useLabAlerts()

//   const handleToggle = () => {
//     if (mcbOn) {
//       showAlert({
//         title: 'MCB Locked',
//         description: 'The MCB is safely locked ON . It will Turn OFF when you RESET the Page.',
//         type: 'info',
//         icon: '🔒',
//         placement: 'center',
//         requiresConfirmation: true,
//         confirmLabel: 'OK'
//       })
//       return
//     }

//     if (!isVerified) {
//       showAlert({
//         title: 'Action Required',
//         description: 'Please verify your connections using the CHECK button first!',
//         type: 'warning',
//         icon: '⚠️',
//         placement: 'center',
//         requiresConfirmation: true,
//         confirmLabel: 'OK'
//       })
//       return
//     }

//     setMcbOn(true)

//     // Using a top-right toast for success so it feels fluid and doesn't interrupt workflow
//     showAlert({
//       title: 'MCB Turned ON',
//       description: 'MCB has been turned ON. Now, Power ON the Autotransformer.',
//       type: 'success',
//       icon: '⚡',
//       placement: 'top-right'
//     })
//   }

//   return (
//     <article id="mcb-supply" className="mcb">
//       <img
//         alt={mcbOn ? 'MCB switched on' : 'MCB switched off'}
//         className="mcb__image"
//         src={mcbOn ? mcbOnImg : mcbOff}
//       />
//       <button

//         aria-label={mcbOn ? 'Switch MCB off' : 'Switch MCB on'}
//         aria-pressed={mcbOn}
//         className="mcb__button"
//         onClick={handleToggle}
//         type="button"
//       />
//     </article>
//   )
// }

// export default MCB
// import { useLabAlerts } from '../alerts/useLabAlerts.js'
// import mcbOff from '../assets/mcb_off.png'
// import mcbOnImg from '../assets/mcb_on.png'

// const MCB = ({ mcbOn, setMcbOn, selected, isVerified }) => {
//   // Pull in the custom alert system
//   const { showAlert } = useLabAlerts()

//   const handleToggle = () => {
//     if (mcbOn) {
//       showAlert({
//         title: 'MCB Locked',
//         description: 'The MCB is safely locked ON . It will Turn OFF when you RESET the Page.',
//         type: 'info',
//         icon: '🔒',
//         placement: 'center',
//         requiresConfirmation: true,
//         confirmLabel: 'OK'
//       })
//       return
//     }

//     if (!isVerified) {
//       showAlert({
//         title: 'Action Required',
//         description: 'Please verify your connections using the CHECK button first!',
//         type: 'warning',
//         icon: '⚠️',
//         placement: 'center',
//         requiresConfirmation: true,
//         confirmLabel: 'OK'
//       })
//       return
//     }

//     setMcbOn(true)

//     // Using a top-right toast for success so it feels fluid and doesn't interrupt workflow
//     showAlert({
//       title: 'MCB Turned ON',
//       description: 'MCB has been turned ON. Now, Power ON the Autotransformer.',
//       type: 'success',
//       icon: '⚡',
//       placement: 'top-right'
//     })
//   }

//   return (
//     <article id="mcb-supply" className="mcb">
//       <img
//         alt={mcbOn ? 'MCB switched on' : 'MCB switched off'}
//         className="mcb__image"
//         src={mcbOn ? mcbOnImg : mcbOff}
//       />
//       <button

//         aria-label={mcbOn ? 'Switch MCB off' : 'Switch MCB on'}
//         aria-pressed={mcbOn}
//         className="mcb__button"
//         onClick={handleToggle}
//         type="button"
//       />
//     </article>
//   )
// }

// export default MCB
import { useLabAlerts } from '../alerts/useLabAlerts.js'
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

    showAlert({
      title: 'MCB Turned ON',
      description: 'MCB has been turned ON. Now, click the power button of the autotransformer.',
      type: 'success',
      icon: '⚡',
      placement: 'top-right'
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

      {/* 🚀 THE FIX: Change the cursor dynamically based on the MCB state */}
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