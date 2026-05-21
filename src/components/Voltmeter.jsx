import v1Img from '../assets/V1.png' 
import needleImg from '../assets/needle.png'

const meterMax = {
  V1: 300,
}

const voltmeterImages = {
  V1: v1Img,
}

const Voltmeter = ({ label = 'V1', value = 0 }) => {
  const max = meterMax[label] || 300
  const ratio = Math.min(Math.max(value / max, 0), 1)
  
  const angle = 180 + ratio * 180

  return (
    <article className={`voltmeter voltmeter--${label}`} aria-label={`${label} voltmeter`}>
      
      <img
        src={voltmeterImages[label]}
        alt={`${label} voltmeter`}
        className="voltmeter__image" 
      />

      <div
        className="voltmeter__needle" 
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <img
          src={needleImg}
          alt="Needle"
          className="voltmeter__needle-image"
        />
      </div>

      <span
        id="3-endpoint"
        className="connection-terminal connection-terminal--voltmeter-plus"
        data-polarity="plus"
      />
      <span className="terminal-number-label terminal-number-label--voltmeter-plus" data-terminal-id="3-endpoint">
        3
      </span>
      
      <span
        id="4-endpoint"
        className="connection-terminal connection-terminal--voltmeter-minus"
        data-polarity="minus"
      />
      <span className="terminal-number-label terminal-number-label--voltmeter-minus" data-terminal-id="4-endpoint">
        4
      </span>

    </article>
  )
}

export default Voltmeter