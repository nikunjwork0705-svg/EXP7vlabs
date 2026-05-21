// import w1Img from '../assets/W1.png' // Make sure you have this image!
// import needleImg from '../assets/needle.png'

// const meterMax = {
//   W1: 1000, // Adjust max wattage depending on how much power your lamps use
// }

// const wattmeterImages = {
//   W1: w1Img,
// }

// const Wattmeter = ({ label = 'W1', value = 0 }) => {
//   const max = meterMax[label] || 1000
//   const ratio = Math.min(Math.max(value / max, 0), 1)
//   const angle = 180 + ratio * 180

//   return (
//     <article className={`wattmeter wattmeter--${label}`} aria-label={`${label} wattmeter`}>
//       <img
//         src={wattmeterImages[label]}
//         alt={`${label} wattmeter`}
//         className="ammeter__image" // Re-using your ammeter CSS class
//       />

//       <div
//         className="ammeter__needle" // Re-using your ammeter CSS class
//         style={{ transform: `rotate(${angle}deg)` }}
//       >
//         <img
//           src={needleImg}
//           alt="Needle"
//           className="ammeter__needle-image"
//         />
//       </div>
//     </article>
//   )
// }

// export default Wattmeter

import w1Img from '../assets/W1.png' // Change to your actual wattmeter image
import needleImg from '../assets/needle.png'

const meterMax = {
  W1: 60, // Assuming 60W max based on your images
}

const wattmeterImages = {
  W1: w1Img,
}

const Wattmeter = ({ label = 'W1', value = 0 }) => {
  const max = meterMax[label] || 60
  const ratio = Math.min(Math.max(value / max, 0), 1)
  
  // Calculates the needle rotation (assuming 0 to 180 degrees sweep)
  const angle = 180 + ratio * 180

  return (
    <article className={`wattmeter wattmeter--${label}`} aria-label={`${label} wattmeter`}>
      
      <img
        src={wattmeterImages[label]}
        alt={`${label} wattmeter`}
        className="wattmeter__image" 
      />

      <div
        className="wattmeter__needle" 
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <img
          src={needleImg}
          alt="Needle"
          className="wattmeter__needle-image"
        />
      </div>

      {/* Terminal 7 (V - Red/Minus) */}
      <span
        id="7-endpoint"
        className="connection-terminal connection-terminal--wattmeter-7"
        data-polarity="minus"
      />
      <span className="terminal-number-label terminal-number-label--wattmeter-7" data-terminal-id="7-endpoint">
        7
      </span>

      {/* Terminal 8 (L - Blue/Plus) */}
      <span
        id="8-endpoint"
        className="connection-terminal connection-terminal--wattmeter-8"
        data-polarity="plus"
      />
      <span className="terminal-number-label terminal-number-label--wattmeter-8" data-terminal-id="8-endpoint">
        8
      </span>

      {/* Terminal 9 (M - Red/Minus) */}
      <span
        id="9-endpoint"
        className="connection-terminal connection-terminal--wattmeter-9"
        data-polarity="minus"
      />
      <span className="terminal-number-label terminal-number-label--wattmeter-9" data-terminal-id="9-endpoint">
        9
      </span>

      {/* Terminal 10 (C - Red/Minus) */}
      <span
        id="10-endpoint"
        className="connection-terminal connection-terminal--wattmeter-10"
        data-polarity="minus"
      />
      <span className="terminal-number-label terminal-number-label--wattmeter-10" data-terminal-id="10-endpoint">
        10
      </span>

    </article>
  )
}

export default Wattmeter