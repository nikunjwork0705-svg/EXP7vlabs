import wImg from '../assets/W1.png'
//import needleImg from '../assets/needle.png'

const Wattmeter = ({ label = 'W1', value = 0, switchOn = false }) => {
  const max = 60

  const pivotTop = 118
  const needleLength = 75
  const startAngle = 180.5
  const endAngle = 358.5

  const safeValue = Number(value) || 0;
  const ratio = switchOn ? Math.min(Math.max(safeValue / max, 0), 1) : 0
  const angle = startAngle + (ratio * (endAngle - startAngle))

  return (
    <article id="ac-wattmeter-w" className={`wattmeter wattmeter--${label}`}>
      <img src={wImg} alt={`${label} wattmeter`} className="wattmeter__image" />
      {/* <div
        className="wattmeter__needle"
        style={{
          transform: `rotate(${angle}deg)`,
          top: `${pivotTop}px`,
          width: `${needleLength}px`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <img src={needleImg} alt="Needle" className="wattmeter__needle-image" />
      </div> */}
    </article>
  )
}

export default Wattmeter