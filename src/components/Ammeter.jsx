
import a1Img from '../assets/A1.png' 
import a2Img from '../assets/A2.png' 
import a3Img from '../assets/A3.png' 
import a4Img from '../assets/A4.png' 
import needleImg from '../assets/needle.png'

const ammeterImages = {
  A1: a1Img,
  A2: a2Img,
  A3: a3Img,
  A4: a4Img
}

const meterConfig = { 
  A1: { max: 1, startAngle: 180.2, endAngle: 330 }, 
  A2: { max: 1, startAngle: 179.5, endAngle: 334.5 }, 
  A3: { max: 1, startAngle: 181.5, endAngle: 342 }, 
  A4: { max: 1, startAngle: 181.9, endAngle: 343 } 
}

const Ammeter = ({ label = 'A1', value = 0, switchOn = false }) => {
  const config = meterConfig[label] || meterConfig.A1
  const bgImage = ammeterImages[label] || a1Img;
  const pivotTop = 115     
  const needleLength = 77 

  let ratio = 0;
  if (switchOn && value > 0) {
    ratio = Math.min(value / config.max, 1);
  }

  const angle = config.startAngle + (ratio * (config.endAngle - config.startAngle))

  return (
    <>
      <article 
        id={`ac-current-${label.toLowerCase()}`} 
        className={`ammeter ammeter--${label}`} 
        aria-label={`${label} ammeter`}
        title={`${label} : ${value} A`}
      >
        <img src={bgImage} alt={`${label} ammeter`} className="ammeter__image" />
        
        <div
          className="ammeter__needle" 
          style={{ 
            transform: `rotate(${angle}deg)`,
            top: `${pivotTop}px`,     
            width: `${needleLength}px`,
            transition: 'transform 2s ease-out' 
          }}
        >
          <img src={needleImg} alt="Needle" className="ammeter__needle-image" />
        </div>
      </article>

      {/* FIXED: Moved OUTSIDE the article tag to prevent overflow scrolling bugs! */}
      <div
        id={`ammeter-${label.toLowerCase()}-walkthrough-target`}
        style={{
          position: 'absolute',
          top: '0%',      /* Adjust these as needed to perfectly hug the meter */
          left: '0%',     
          width: '98%',    
          height: '105%',   
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
    </>
  )
}

export default Ammeter