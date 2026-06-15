import wImg from '../assets/W1.png'
import needleImg from '../assets/needle.png'

const Wattmeter = ({ label = 'W', value = 0, switchOn = false }) => {
  const max = 60

  const pivotTop = 120
  const needleLength = 77
  const startAngle = 175.2
  const endAngle = 367

  const safeValue = Number(value) || 0;
  const ratio = switchOn ? Math.min(Math.max(safeValue / max, 0), 1) : 0
  const angle = startAngle + (ratio * (endAngle - startAngle))

  return (
    <article 
      id="ac-wattmeter-w" 
      className={`wattmeter wattmeter--${label}`}
      title={`${label} Live Value: ${value} W`}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <img src={wImg} alt={`${label} wattmeter`} className="wattmeter__image" />
      <div
        className="wattmeter__needle"
        style={{
          transform: `rotate(${angle}deg)`,
          top: `${pivotTop}px`,
          width: `${needleLength}px`,
          transition: 'transform 2s ease-out'
        }}
      >
        <img src={needleImg} alt="Needle" className="wattmeter__needle-image" />
      </div>

      {/* THE INVISIBLE TARGET BOX 
        Tweak top, left, width, and height to manually crop the highlight box! 
      */}
      <div
        id="wattmeter-walkthrough-target"
        style={{
          position: 'absolute',
          top: '0%',       /* Adjust to move top edge up/down */
          left: '0%',      /* Adjust to move left edge left/right */
          width: '100%',   /* Squeeze or expand overall width */
          height: '102%',   /* Squeeze or expand overall height */
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
    </article>
  )
}

export default Wattmeter