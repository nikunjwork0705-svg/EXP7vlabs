import { useState, useEffect } from 'react'

const CalculationsBoard = ({ className = '', calculateRequest = 0, latestObservation }) => {
  const [deviceName, setDeviceName] = useState('')
  const [variac, setVariac] = useState('')
  const [ammeter, setAmmeter] = useState('')
  const [voltmeter, setVoltmeter] = useState('')
  const [wattmeter, setWattmeter] = useState('')
  const [calcPower, setCalcPower] = useState('')
  const [calcResult, setCalcResult] = useState('')
  const [finalDevice, setFinalDevice] = useState('')
  const [finalPf, setFinalPf] = useState('')

  useEffect(() => {
    if (calculateRequest > 0 && latestObservation) {
      const v = latestObservation.voltage || 0
      const a = latestObservation.i1 || 0
      const w = latestObservation.i2 || 0

      setVariac(v.toString())
      setVoltmeter(v.toString())
      setAmmeter(a.toFixed(4))
      setWattmeter(w.toFixed(4))

      if (v > 0 && a > 0) {
        const vi = v * a
        const pf = w / vi

        setCalcPower(w.toFixed(4))
        setCalcResult(pf.toFixed(4)) 
        
        setFinalDevice(deviceName)
        setFinalPf(pf.toFixed(4))
      } else {
        alert("The latest observation has 0 Volts, 0 Amps or 0 Watts. Please check your circuit connections!")
      }
    }
  }, [calculateRequest, latestObservation, deviceName])

  const handleVerify = () => {
    // Convert both strings to numbers so 0.5 matches 0.5000
    const calculatedValue = parseFloat(calcResult)
    const enteredValue = parseFloat(finalPf)

    // Check if they are valid numbers and if they match
    if (!isNaN(calculatedValue) && !isNaN(enteredValue) && calculatedValue === enteredValue) {
      alert('Verification complete! Values match.')
    } else {
      alert('Not verified, Values do not match, Please check the Calculations')
    }
  }

  // Synchronizes all the voltage boxes
  const handleVoltageChange = (value) => {
    setVariac(value)
    setVoltmeter(value)
  }

  // Synchronizes the Wattmeter and the Power Factor Numerator
  const handleWattageChange = (value) => {
    setWattmeter(value)
    setCalcPower(value)
  }

  return (
    <section className={`bg-white rounded-lg shadow-md overflow-hidden mt-8 ${className}`}>
      
      <header className="calculations-board bg-[#1a1a1a] text-white flex justify-center items-center gap-[36px] py-3 relative">
        <span className="header-board__ornament" style={{ width: '500px' }} />
        <h1 
          className="m-0 tracking-wider" 
          style={{ fontSize: '34px', fontWeight: 900, textShadow: '0 3px 0 rgba(0, 0, 0, 0.45)' }}
        >
          Calculations
        </h1>
        <span className="header-board__ornament header-board__ornament--right" style={{ width: '500px' }} />
      </header>

      <div className="p-8 space-y-8 text-lg font-bold text-gray-800">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label>Device Name :</label>
            <input 
              type="text" 
              className="border border-gray-300 rounded px-2 py-1 w-48 font-normal" 
              value={deviceName} 
              onChange={e => setDeviceName(e.target.value)} 
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Variac Reading :</label>
            <input 
              type="text" 
              className="border border-gray-300 rounded px-2 py-1 w-32 font-normal outline-none" 
              value={variac} 
              onChange={e => handleVoltageChange(e.target.value)} 
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl mb-4">OBSERVATIONS :</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="w-32">Ammeter :</label>
              <input 
                type="text" 
                className="border border-gray-300 rounded px-2 py-1 w-24 font-normal outline-none" 
                value={ammeter} 
                onChange={e => setAmmeter(e.target.value)} 
              /> A
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Voltmeter :</label>
              <input 
                type="text" 
                className="border border-gray-300 rounded px-2 py-1 w-24 font-normal outline-none" 
                value={voltmeter} 
                onChange={e => handleVoltageChange(e.target.value)} 
              /> V
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Wattmeter :</label>
              <input 
                type="text" 
                className="border border-gray-300 rounded px-2 py-1 w-24 font-normal outline-none" 
                value={wattmeter} 
                onChange={e => handleWattageChange(e.target.value)} 
              /> W
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <div>Power Factor = Watts/(Voltage*Current)</div>
          
          <div className="flex items-center gap-4">
            <span>Power Factor =</span>
            <div className="flex flex-col items-center">
              {/* Numerator: Watts */}
              <input 
                type="text" 
                className="border border-gray-300 rounded px-2 py-1 w-24 text-center font-normal outline-none" 
                value={calcPower} 
                onChange={e => handleWattageChange(e.target.value)} 
              />
              
              <div className="w-full h-[2px] bg-black my-1"></div>
              
              {/* Denominator: Voltage x Current */}
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  className="border border-gray-300 rounded px-2 py-1 w-24 text-center font-normal outline-none" 
                  value={voltmeter} 
                  onChange={e => handleVoltageChange(e.target.value)} 
                />
                <span>×</span>
                <input 
                  type="text" 
                  className="border border-gray-300 rounded px-2 py-1 w-24 text-center font-normal outline-none" 
                  value={ammeter} 
                  onChange={e => setAmmeter(e.target.value)} 
                />
              </div>
            </div>
            <span>=</span>
            <input 
              type="text" 
              className="border border-gray-300 rounded px-2 py-1 w-24 font-normal outline-none" 
              value={calcResult} 
              onChange={e => setCalcResult(e.target.value)} 
            />
          </div>

          <div className="flex items-center gap-3">
            <span>Power Factor (Cosθ) of</span>
            <input 
              type="text" 
              className="border border-gray-300 rounded px-2 py-1 w-32 font-normal outline-none" 
              value={finalDevice} 
              onChange={e => setFinalDevice(e.target.value)} 
            />
            <span>is :</span>
            <input 
              type="text" 
              className="border border-gray-300 rounded px-2 py-1 w-24 font-normal outline-none" 
              value={finalPf}  
              onChange={e => setFinalPf(e.target.value)} 
            />
            <button 
              onClick={handleVerify}
              className="ml-4 px-4 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 active:bg-gray-100 text-sm font-normal cursor-pointer"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default CalculationsBoard