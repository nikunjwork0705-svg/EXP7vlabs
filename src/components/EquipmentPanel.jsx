import { Fragment } from 'react'
import Ammeter from './Ammeter.jsx'
import Voltmeter from './Voltmeter.jsx'
import Wattmeter from './Wattmeter.jsx'
import MCB from './MCB.jsx'

import Resistor from './Resistor.jsx'
import Capacitor from './Capacitor.jsx'
import Inductor from './Inductor.jsx'
import Variac from './Variac.jsx'

const mcbTerminals = [
  { id: '1-endpoint', label: '1', polarity: 'plus', left: 46, top: 153, lLeft: 59, lTop: 185 },
  { id: '2-endpoint', label: '2', polarity: 'minus', left: 99, top: 153, lLeft: 115, lTop: 185 },
]

const voltmeterTerminals = [
  { id: '3-endpoint', label: '3', polarity: 'plus', left: 35, top: 179, lLeft: 50, lTop: 210 },
  { id: '4-endpoint', label: '4', polarity: 'minus', left: 110, top: 178, lLeft: 125, lTop: 210 },
]

const ammeterTerminals = [
  { id: '5-endpoint', label: '5', polarity: 'plus', left: 35, top: 174, lLeft: 49, lTop: 205 },
  { id: '6-endpoint', label: '6', polarity: 'minus', left: 109, top: 174, lLeft: 122, lTop: 205 },
]

const wattmeterTerminals = [
  { id: '7-endpoint', label: '7', polarity: 'minus', left: 20, top: 177, lLeft: 34, lTop: 205 },
  { id: '8-endpoint', label: '8', polarity: 'plus', left: 56, top: 177, lLeft: 70, lTop: 205 },
  { id: '9-endpoint', label: '9', polarity: 'minus', left: 92, top: 177, lLeft: 106, lTop: 205 },
  { id: '10-endpoint', label: '10', polarity: 'minus', left: 128, top: 177, lLeft: 142, lTop: 205 },
]

const ammeter2Terminals = [
  { id: '11-endpoint', label: '11', polarity: 'plus', left: 35, top: 174, lLeft: 49, lTop: 205 },
  { id: '12-endpoint', label: '12', polarity: 'minus', left: 109, top: 174, lLeft: 122, lTop: 205 },
]

/* --- RIGHT COLUMN AMMETERS --- */
const ammeter3Terminals = [
  { id: '13-endpoint', label: '13', polarity: 'plus', left: 35, top: 174, lLeft: 49, lTop: 205 },
  { id: '14-endpoint', label: '14', polarity: 'minus', left: 109, top: 174, lLeft: 122, lTop: 205 },
]

const ammeter4Terminals = [
  { id: '15-endpoint', label: '15', polarity: 'plus', left: 35, top: 174, lLeft: 49, lTop: 205 },
  { id: '16-endpoint', label: '16', polarity: 'minus', left: 109, top: 174, lLeft: 122, lTop: 205 },
]

/* --- CENTER & BOTTOM COMPONENTS --- */
const resistorTerminals = [
  { id: '17-endpoint', label: '17', polarity: 'plus', left: 10, top: 60, lLeft: 10, lTop: 90 },
  { id: '18-endpoint', label: '18', polarity: 'minus', left: 180, top: 60, lLeft: 180, lTop: 90 },
]

const inductorTerminals = [
  { id: '19-endpoint', label: '19', polarity: 'plus', left: 30, top: 100, lLeft: 30, lTop: 130 },
  { id: '20-endpoint', label: '20', polarity: 'minus', left: 80, top: 100, lLeft: 80, lTop: 130 },
]

const capacitorTerminals = [
  { id: '21-endpoint', label: '21', polarity: 'plus', left: 20, top: 120, lLeft: 20, lTop: 150 },
  { id: '22-endpoint', label: '22', polarity: 'minus', left: 70, top: 120, lLeft: 70, lTop: 150 },
]

const variacTerminals = [
  { id: '23-endpoint', label: '23', polarity: 'plus', left: 180, top: 30, lLeft: 210, lTop: 30 },
  { id: '24-endpoint', label: '24', polarity: 'minus', left: 220, top: 30, lLeft: 250, lTop: 30 },
  { id: '25-endpoint', label: '25', polarity: 'plus', left: 180, top: 140, lLeft: 210, lTop: 140 },
  { id: '26-endpoint', label: '26', polarity: 'minus', left: 220, top: 140, lLeft: 250, lTop: 140 },
]

const renderTerminals = (terminals) => (
  terminals.map(({ id, label, polarity, left, top, lLeft, lTop }) => (
    <Fragment key={id}>
      <span
        id={id}
        className="connection-terminal"
        data-polarity={polarity}
        aria-label={`Terminal ${label}`}
        style={{
          position: 'absolute',
          left: `${left}px`,
          top: `${top}px`,
          zIndex: 50,
          cursor: 'crosshair'
        }}
      />
      <span
        className="terminal-number-label"
        data-terminal-id={id}
        style={{
          position: 'absolute',
          left: `${lLeft}px`,
          top: `${lTop}px`,
          zIndex: 50
        }}
      >
        {label}
      </span>
    </Fragment>
  ))
)

const EquipmentPanel = ({ powerOn, readings, setPowerOn, selected, isVerified, switchOn }) => (
  <section className="equipment-panel">

    {/* 1. MCB */}
    <div className="equipment-item relative">
      <MCB
        mcbOn={powerOn}
        setMcbOn={setPowerOn}
        selected={selected}
        isVerified={isVerified}
      />
      {renderTerminals(mcbTerminals)}
    </div>

    {/* 2. V1 */}
    <div className="equipment-item relative">
      <Voltmeter label="V1" value={readings.v} switchOn={switchOn} />
      {renderTerminals(voltmeterTerminals)}
    </div>

    {/* 3. A1 */}
    <div className="equipment-item relative">
      <Ammeter label="A1" value={readings.i1} switchOn={switchOn} />
      {renderTerminals(ammeterTerminals)}
    </div>

    {/* 4. W1 */}
    <div className="equipment-item relative">
      <Wattmeter label="W1" value={readings.power} switchOn={switchOn} />
      {renderTerminals(wattmeterTerminals)}
    </div>

    {/* 5. A2 */}
    <div className="equipment-item relative">
      <Ammeter label="A2" value={readings.i2} switchOn={switchOn} />
      {renderTerminals(ammeter2Terminals)}
    </div>

    {/* 6. A3 */}
    <div className="equipment-item relative">
      <Ammeter label="A3" value={readings.i3 || 0} switchOn={switchOn} />
      {renderTerminals(ammeter3Terminals)}
    </div>

    {/* 7. A4 */}
    <div className="equipment-item relative">
      <Ammeter label="A4" value={readings.i4 || 0} switchOn={switchOn} />
      {renderTerminals(ammeter4Terminals)}
    </div>

    {/* 8. Resistor */}
    {/* 8. Resistor */}
<div className="equipment-item relative">
  <Resistor 
    isVerified={isVerified} 
    mcbOn={powerOn} 
    variacOn={switchOn} 
    voltage={readings.v} 
  />
  {renderTerminals(resistorTerminals)}
</div>
    {/* 9. Capacitor */}
    <div className="equipment-item relative">
      {/* <Capacitor /> */}
      {renderTerminals(capacitorTerminals)}
    </div>

    {/* 10. Inductor */}
    <div className="equipment-item relative">
      {/* <Inductor /> */}
      {renderTerminals(inductorTerminals)}
    </div>

    {/* 11. Variac */}
    <div className="equipment-item relative">
      {/* <Variac /> */}
      {renderTerminals(variacTerminals)}
    </div>
    
  </section>
)

export default EquipmentPanel