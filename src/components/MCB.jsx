import mcbOff from '../assets/mcb_off.png'
import mcbOnImg from '../assets/mcb_on.png'

const MCB = ({ mcbOn, setMcbOn }) => {
  const displayedVoltage = mcbOn ? 230 : 0

  return (
    <article className="mcb">

      <img
        alt={mcbOn ? 'MCB switched on' : 'MCB switched off'}
        className="mcb__image"
        src={mcbOn ? mcbOnImg : mcbOff}
      />
    
      <span
        id="1-endpoint"
        className="connection-terminal connection-terminal--mcb connection-terminal--mcb-minus"
        data-polarity="minus"
        aria-label="MCB negative terminal 1"
      />
      <span
        className="terminal-number-label terminal-number-label--mcb-minus"
        data-terminal-id="1-endpoint"
      >
        1
      </span>

    
      <span
        id="2-endpoint"
        className="connection-terminal connection-terminal--mcb connection-terminal--mcb-plus"
        data-polarity="plus"
        aria-label="MCB positive terminal 2"
      />
      <span
        className="terminal-number-label terminal-number-label--mcb-plus"
        data-terminal-id="2-endpoint"
      >
        2
      </span>

    
      <button
        aria-label={mcbOn ? 'Switch MCB off' : 'Switch MCB on'}
        aria-pressed={mcbOn}
        className="mcb__button"
        onClick={() => setMcbOn((current) => !current)}
        type="button"
      />

    </article>
  )
}

export default MCB