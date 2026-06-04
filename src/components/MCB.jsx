import mcbOff from '../assets/mcb_off.png'
import mcbOnImg from '../assets/mcb_on.png'

const MCB = ({ mcbOn, setMcbOn, selected, isVerified }) => {

  const handleToggle = () => {
    if (mcbOn) {
      alert("The MCB is safely locked ON for this load. It will automatically turn off when you change the load!")
      return
    }

    if (!isVerified) {
      alert("Please verify your connections using the CHECK button first!")
      return
    }

    setMcbOn(true)
  }

  return (
    <article id="mcb-supply" className="mcb">
      <img
        alt={mcbOn ? 'MCB switched on' : 'MCB switched off'}
        className="mcb__image"
        src={mcbOn ? mcbOnImg : mcbOff}
      />
      <button
        aria-label={mcbOn ? 'Switch MCB off' : 'Switch MCB on'}
        aria-pressed={mcbOn}
        className="mcb__button"
        onClick={handleToggle}
        type="button"
      />
    </article>
  )
}

export default MCB