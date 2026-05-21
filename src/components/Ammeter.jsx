// import a1Img from '../assets/A1.png'
// // import a2Img from '../assets/A2.png'
// // import a3Img from '../assets/A3.png'
// import needleImg from '../assets/needle.png'

// const meterMax = {
//   A1: 5,        //Max Value of the Ammeter A1
//   // A2: 0.3,   //Max Value of the Ammeter A2
//   // A3: 2.5,   //Max Value of the Ammeter A3
// }

// const ammeterImages = {
//   A1: a1Img,
//   // A2: a2Img,
//   //A3: a3Img,
// }

// const terminalNumbers = {
//   A1: { positive: 3, negative: 4 },
//   // A2: { positive: 18, negative: 9 },
//   // A3: { positive: 7, negative: 8 },
// }

// const Ammeter = ({ label, value = 0 }) => {
//   const terminals = terminalNumbers[label]
//   const max = meterMax[label] || 5
//   const ratio = Math.min(Math.max(value / max, 0), 1)
//   const angle = 180 + ratio * 180

//   return (
//     <article className={`ammeter ammeter--${label}`} aria-label={`${label} ammeter`}>
//       <img
//         src={ammeterImages[label]}
//         alt={`${label} ammeter`}
//         className="ammeter__image"
//       />
//       <span
//         id={`${terminals.positive}-endpoint`}
//         className="connection-terminal connection-terminal--meter connection-terminal--meter-plus"
//         data-polarity="plus"
//         aria-label={`${label} positive terminal ${terminals.positive}`}
//       />
//       <span
//         className="terminal-number-label terminal-number-label--meter-plus"
//         data-terminal-id={`${terminals.positive}-endpoint`}
//       >
//         {terminals.positive}
//       </span>

//       <span
//         id={`${terminals.negative}-endpoint`}
//         className="connection-terminal connection-terminal--meter connection-terminal--meter-minus"
//         data-polarity="minus"
//         aria-label={`${label} negative terminal ${terminals.negative}`}
//       />
//       <span
//         className="terminal-number-label terminal-number-label--meter-minus"
//         data-terminal-id={`${terminals.negative}-endpoint`}
//       >
//         {terminals.negative}
//       </span>

//       <div
//         className="ammeter__needle"
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

// export default Ammeter
import a1Img from '../assets/A1.png' // Change to your actual ammeter image
import needleImg from '../assets/needle.png'

const meterMax = {
  A1: 10, // Assuming 10A max for the ammeter based on your images
}

const ammeterImages = {
  A1: a1Img,
}

const Ammeter = ({ label = 'A1', value = 0 }) => {
  const max = meterMax[label] || 10
  const ratio = Math.min(Math.max(value / max, 0), 1)
  
  // Calculates the needle rotation (assuming 0 to 180 degrees sweep)
  const angle = 180 + ratio * 180

  return (
    <article className={`ammeter ammeter--${label}`} aria-label={`${label} ammeter`}>
      
      <img
        src={ammeterImages[label]}
        alt={`${label} ammeter`}
        className="ammeter__image" 
      />

      <div
        className="ammeter__needle" 
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <img
          src={needleImg}
          alt="Needle"
          className="ammeter__needle-image"
        />
      </div>

      {/* Terminal 5 (Blue/Plus) */}
      <span
        id="5-endpoint"
        className="connection-terminal connection-terminal--ammeter-plus"
        data-polarity="plus"
      />
      <span className="terminal-number-label terminal-number-label--ammeter-plus" data-terminal-id="5-endpoint">
        5
      </span>

      {/* Terminal 6 (Red/Minus) */}
      <span
        id="6-endpoint"
        className="connection-terminal connection-terminal--ammeter-minus"
        data-polarity="minus"
      />
      <span className="terminal-number-label terminal-number-label--ammeter-minus" data-terminal-id="6-endpoint">
        6
      </span>

    </article>
  )
}

export default Ammeter