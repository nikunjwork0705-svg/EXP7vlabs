import a1Img from '../assets/A1.png'
import a2Img from '../assets/A2.png'
import a3Img from '../assets/A3.png'
import a4Img from '../assets/A4.png'

//import needleImg from '../assets/needle.png' 

const meterMax = {
  A1: 50,
  A2: 50,
  A3: 50,
  A4: 50,
}

const ammeterImages = {
  A1: a1Img,
  A2: a2Img,
  A3: a3Img,
  A4: a4Img,
}

const Ammeter = ({ label = 'A1', value = 0, switchOn = false }) => {
  const max = meterMax[label] || 50

  const pivotTop = 118
  const needleLength = 75
  const startAngle = 180.2
  const endAngle = 360

  const safeValue = Number(value) || 0;
  const ratio = switchOn ? Math.min(Math.max(safeValue / max, 0), 1) : 0
  const angle = startAngle + (ratio * (endAngle - startAngle))

  return (
    <article id={`ac-ammeter-${label.toLowerCase()}`} className={`ammeter ammeter--${label}`} aria-label={`${label} ammeter`}>
      
      <img src={ammeterImages[label]} alt={`${label} ammeter`} className="ammeter__image" />
{/*       
      <div
        className="ammeter__needle"
        style={{
          transform: `rotate(${angle}deg)`,
          top: `${pivotTop}px`,
          width: `${needleLength}px`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <img src={needleImg} alt="Needle" className="ammeter__needle-image" />
      </div> */}

    </article>
  )
}

export default Ammeter