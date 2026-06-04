import v1Img from '../assets/V1.png' 
//import needleImg from '../assets/needle.png'

const meterMax = { V1: 240 }
const voltmeterImages = { V1: v1Img }

const Voltmeter = ({ label = 'V1', value = 0, switchOn = false }) => {
  const max = meterMax[label] || 240
  
  const pivotTop = 122     
  const needleLength = 75 
  const startAngle = 174.2   
  const endAngle = 360     

  const ratio = switchOn ? 1 : 0
  const angle = startAngle + (ratio * (endAngle - startAngle))

  return (
    <article id="ac-voltage-v" className={`voltmeter voltmeter--${label}`} aria-label={`${label} voltmeter`}>
      <img src={voltmeterImages[label]} alt={`${label} voltmeter`} className="voltmeter__image" />
      
      {/* <div
        className="voltmeter__needle" 
        style={{ 
          transform: `rotate(${angle}deg)`,
          top: `${pivotTop}px`,     
          width: `${needleLength}px`,
          transition: 'transform 0.5s ease-out' 
        }}
      >
        <img src={needleImg} alt="Needle" className="voltmeter__needle-image" />
      </div> */}
    </article>
  )
}

export default Voltmeter