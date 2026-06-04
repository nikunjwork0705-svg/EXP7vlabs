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
      const loadName = latestObservation.load || ''

      setVariac(v.toString())
      setVoltmeter(v.toString())
      setAmmeter(a.toFixed(4))
      setWattmeter(w.toFixed(4))

      if (v > 0 && a > 0) {
        const vi = v * a
        const pf = w / vi

        setCalcPower(w.toFixed(2))
        setCalcResult(pf.toFixed(2))
        setDeviceName(loadName)
      } else {
        alert("The latest observation has 0 Volts, 0 Amps or 0 Watts. Please check your circuit connections!")
      }
    }
  }, [calculateRequest, latestObservation])

  const handleVerify = () => {
    const calculatedValue = parseFloat(calcResult)
    const enteredValue = parseFloat(finalPf)

    if (!finalDevice || finalDevice.trim() === '') {
      alert('Please enter the Device Name to verify.')
      return
    }
    if (isNaN(enteredValue)) {
      alert('Please enter a valid Power Factor number to verify.')
      return
    }
    const isDeviceCorrect = finalDevice.trim().toLowerCase() === deviceName.trim().toLowerCase()

    const isExactMatch = calculatedValue === enteredValue
    const isRoundedMatch2 = calculatedValue.toFixed(2) === enteredValue.toFixed(2)
    const isRoundedMatch3 = calculatedValue.toFixed(3) === enteredValue.toFixed(3)
    const isPfCorrect = isExactMatch || isRoundedMatch2 || isRoundedMatch3

    if (isDeviceCorrect && isPfCorrect) {
      alert('Verification complete! Both Device Name and Power Factor are correct.')
    } else if (!isDeviceCorrect && isPfCorrect) {
      alert('Almost there! The Power Factor is correct, but the Device Name is incorrect.')
    } else if (isDeviceCorrect && !isPfCorrect) {
      alert('The Device Name is correct, but the Power Factor does not match the calculations.')
    } else {
      alert('Not verified. Both the Device Name and Power Factor are incorrect.')
    }
  }

  return (
    <section className={`bg-white rounded-lg shadow-md overflow-hidden mt-8 ${className}`}>

     <header className="calculations-board bg-[#1a1a1a] text-white flex justify-center items-center gap-[36px] py-3 relative">
        <span className="header-board__ornament" style={{ width: '420px' }} />
        <h1
          className="m-0 tracking-wider"
          style={{ fontSize: '34px', fontWeight: 900, textShadow: '0 3px 0 rgba(0, 0, 0, 0.45)' }}
        >
          Theoretical Calculations
        </h1>
        <span className="header-board__ornament header-board__ornament--right" style={{ width: '420px' }} />
      </header>

      <div id="calculations-board" className="p-12 text-xl font-bold text-[#111]">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 max-w-4xl">
          
          {/* left column */}
          <div className="space-y-8">
            <div className="flex items-center">
              <span className="w-10">R</span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
              <span className="ml-3">Ω</span>
            </div>
            
            <div className="flex items-center">
              <span className="w-10">X<sub>L</sub></span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
              <span className="ml-3">Ω</span>
            </div>
            
            <div className="flex items-center">
              <span className="w-10">X<sub>C</sub></span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
              <span className="ml-3">Ω</span>
            </div>
            
            <div className="flex items-center">
              <span className="w-10">L</span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
              <span className="ml-3">mH</span>
            </div>
            
            <div className="flex items-center">
              <span className="w-10">C</span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
              <span className="ml-3">μF</span>
            </div>
          </div>

          {/* right column*/}
          <div className="space-y-8">
            <div className="flex items-center">
              <span className="w-14">Z</span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
              <span className="ml-3">Ω</span>
            </div>
            
            <div className="flex items-center">
              <span className="w-14">cosΦ</span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
            </div>
            
            <div className="flex items-center">
              <span className="w-14">S</span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
              <span className="ml-3">kVA</span>
            </div>
            
            <div className="flex items-center">
              <span className="w-14">Q</span> 
              <span className="mx-3">=</span> 
              <input type="text" className="border border-gray-200 rounded px-2 py-1 w-24 font-normal outline-none shadow-sm" /> 
              <span className="ml-3">kVAr</span>
            </div>
            
            <div className="flex items-center pt-2">
              <button 
                onClick={handleVerify}
                className="bg-[#d1d5db] text-gray-600 px-6 py-2 rounded-xl text-lg font-normal tracking-wide hover:bg-gray-300 transition-colors"
              >
                VERIFY
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CalculationsBoard