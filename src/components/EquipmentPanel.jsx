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
  { id: '1-endpoint', label: '1', polarity: 'plus', left: 48, top: 157, lLeft: 62, lTop: 190 },
  { id: '2-endpoint', label: '2', polarity: 'minus', left: 96, top: 157, lLeft: 110, lTop: 190 },
]

const voltmeterTerminals = [
  { id: '3-endpoint', label: '3', polarity: 'plus', left: 37, top: 170, lLeft: 50, lTop: 205 },
  { id: '4-endpoint', label: '4', polarity: 'minus', left: 108, top: 170, lLeft: 122, lTop: 205 },
]

const ammeterTerminals = [
  { id: '5-endpoint', label: '5', polarity: 'plus', left: 36, top: 164.5, lLeft: 49, lTop: 200 },
  { id: '6-endpoint', label: '6', polarity: 'minus', left: 102, top: 164.5, lLeft: 117, lTop: 200 },
]

const wattmeterTerminals = [
  { id: '7-endpoint', label: '7', polarity: 'minus', left: 20, top: 170, lLeft: 33, lTop: 205 },
  { id: '8-endpoint', label: '8', polarity: 'plus', left: 56, top: 170, lLeft: 69, lTop: 205 },
  { id: '9-endpoint', label: '9', polarity: 'minus', left: 92, top: 170, lLeft: 105, lTop: 205 },
  { id: '10-endpoint', label: '10', polarity: 'minus', left: 128, top: 170, lLeft: 142, lTop: 205 },
]

const ammeter2Terminals = [
  { id: '11-endpoint', label: '11', polarity: 'plus', left: 36, top: 166, lLeft: 49, lTop: 200 },
  { id: '12-endpoint', label: '12', polarity: 'minus', left: 104, top: 166, lLeft: 119, lTop: 200 },
]

const ammeter3Terminals = [
  { id: '13-endpoint', label: '13', polarity: 'plus', left: 35, top: 165, lLeft: 49, lTop: 200 },
  { id: '14-endpoint', label: '14', polarity: 'minus', left: 104.5, top: 166, lLeft: 119, lTop: 200 },
]

const ammeter4Terminals = [
  { id: '15-endpoint', label: '15', polarity: 'plus', left: 35, top: 164.5, lLeft: 49, lTop: 200 },
  { id: '16-endpoint', label: '16', polarity: 'minus', left: 104.5, top: 165, lLeft: 119, lTop: 200 },
]

const resistorTerminals = [
  { id: '17-endpoint', label: '17', polarity: 'plus', left: 40, top: 90, lLeft: 52, lTop: 122 },
  { id: '18-endpoint', label: '18', polarity: 'minus', left: 280, top: 90, lLeft: 293, lTop: 122 },
]

const inductorTerminals = [
  { id: '19-endpoint', label: '19', polarity: 'plus', left: 124, top: 218, lLeft: 136, lTop: 252 },
  { id: '20-endpoint', label: '20', polarity: 'minus', left: 167, top: 218, lLeft: 181, lTop: 252 },
]

const capacitorTerminals = [
  { id: '21-endpoint', label: '21', polarity: 'plus', left: 120, top: 242, lLeft: 133, lTop: 278 },
  { id: '22-endpoint', label: '22', polarity: 'minus', left: 155, top: 242, lLeft: 171, lTop: 278 },
]

const variacTerminals = [
  { id: '23-endpoint', label: '23', polarity: 'plus', left: 213, top: 65, lLeft: 222, lTop: 108 },
  { id: '24-endpoint', label: '24', polarity: 'minus', left: 283, top: 65, lLeft: 301, lTop: 108 },
  { id: '25-endpoint', label: '25', polarity: 'plus', left: 213, top: 156, lLeft: 222, lTop: 198 },
  { id: '26-endpoint', label: '26', polarity: 'minus', left: 283, top: 156, lLeft: 301, lTop: 198 },
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

const EquipmentPanel = ({ powerOn, readings, setPowerOn, selected, isVerified, switchOn, setSwitchOn, setVoltage, voltage, isRVerified }) => ( 
  
  <section className="equipment-panel">

    <div className="equipment-item">
      <MCB
        mcbOn={powerOn}
        setMcbOn={setPowerOn}
        selected={selected}
        isVerified={isVerified}
      />
      {renderTerminals(mcbTerminals)}
    </div>

    <div className="equipment-item">
      <Voltmeter label="V1" value={voltage} switchOn={powerOn && switchOn} />
      {renderTerminals(voltmeterTerminals)}
    </div>

   <div className="equipment-item">
      <Ammeter label="A1" value={readings.i1 || 0} switchOn={powerOn && switchOn} />
      {renderTerminals(ammeterTerminals)}
    </div>

    <div className="equipment-item">
      <Wattmeter label="W1" value={readings.i2 || 0} switchOn={powerOn && switchOn} />
      {renderTerminals(wattmeterTerminals)}
    </div>

    <div className="equipment-item">
      <Ammeter label="A2" value={readings.iR || 0} switchOn={powerOn && switchOn} />
      {renderTerminals(ammeter2Terminals)}
    </div>

    <div className="equipment-item">
      <Ammeter label="A3" value={readings.iL || 0} switchOn={powerOn && switchOn} />
      {renderTerminals(ammeter3Terminals)}
    </div>

    <div className="equipment-item">
      <Ammeter label="A4" value={readings.iC || 0} switchOn={powerOn && switchOn} />
      {renderTerminals(ammeter4Terminals)}
    </div>

    <div className="equipment-item">
      <Resistor 
        isVerified={isVerified} 
        mcbOn={powerOn} 
        variacOn={switchOn} 
        voltage={voltage} 
        isRVerified={isRVerified} 
      />
      {renderTerminals(resistorTerminals)}
    </div>
    
    <div className="equipment-item">
      <Capacitor />
      {renderTerminals(capacitorTerminals)}
    </div>
    
    <div className="equipment-item">
      <Inductor />
      {renderTerminals(inductorTerminals)}
    </div>
   
    <div className="equipment-item">
      <Variac 
        voltage={voltage}
        setVoltage={setVoltage}
        mcbOn={powerOn}
        isVerified={isVerified}
        selected={selected}
        variacOn={switchOn}
        setVariacOn={setSwitchOn}
      />
      {renderTerminals(variacTerminals)}
    </div>
    
  </section>
)

export default EquipmentPanel