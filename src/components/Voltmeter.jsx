import v1Img from '../assets/V1.png' 
import needleImg from '../assets/needle.png'

const meterMax = { V: 50 }
const voltmeterImages = { V1: v1Img }

const Voltmeter = ({ label = 'V', value = 0, switchOn = false }) => {
  const max = meterMax[label] || 50
  
  const pivotTop = 122     
  const needleLength = 77
  const startAngle = 174.5   
  const endAngle = 363.9

  let ratio = 0;
  if (switchOn && value > 0) {
    ratio = Math.min(value / max, 1);
  }

  const angle = startAngle + (ratio * (endAngle - startAngle))

  return (
    <article id="ac-voltage-v" 
    className={`voltmeter voltmeter--${label}`}
     aria-label={`${label} voltmeter`}
     title={`${label} Live Value: ${value} V`}
     >
      <img src={voltmeterImages[label]} alt={`${label} voltmeter`} className="voltmeter__image" />
      
      <div
        className="voltmeter__needle" 
        style={{ 
          transform: `rotate(${angle}deg)`,
          top: `${pivotTop}px`,     
          width: `${needleLength}px`,
          transition: 'transform 2s ease-out' 
        }}
      >
        <img src={needleImg} alt="Needle" className="voltmeter__needle-image" />
      </div>
    </article>
  )
}

export default Voltmeter