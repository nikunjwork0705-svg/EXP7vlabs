import Ammeter from './Ammeter.jsx'
import Voltmeter from './Voltmeter.jsx'
import Wattmeter from './Wattmeter.jsx'
import MCB from './MCB.jsx'

const EquipmentPanel = ({ powerOn, readings, setPowerOn }) => (
  <section className="equipment-panel">
    
    <div className="equipment-item">
      <MCB mcbOn={powerOn} setMcbOn={setPowerOn} />
    </div>

    <div className="equipment-item">
      <Voltmeter label="V1" value={readings.v} />
    </div>

    <div className="equipment-item">
      <Ammeter label="A1" value={readings.i} />
    </div>

    <div className="equipment-item">
      <Wattmeter label="W1" value={readings.w} />
    </div>

  </section>
)

export default EquipmentPanel