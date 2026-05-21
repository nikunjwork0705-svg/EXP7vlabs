import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import ConnectionLab from './components/ConnectionLab.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import HeaderBoard from './components/HeaderBoard.jsx'
import InstructionsTab from './components/InstructionsTab.jsx'
import CalculationsBoard from './components/CalculationsBoard.jsx'

import { calculateReadings } from './utils/circuitMath.js'

const BASE_WIDTH = 1440
const BASE_HEIGHT = 880
const CALC_SECTION_GAP = 28
const CALC_SECTION_HEIGHT = 800 

const CONTENT_HEIGHT = BASE_HEIGHT + CALC_SECTION_GAP + CALC_SECTION_HEIGHT
const PANEL_MAX_SCALE = 0.9
const PANEL_VIEWPORT_MARGIN = 24

const getScale = () => {
  if (typeof window === 'undefined') {
    return 1
  }

  const widthScale = (window.innerWidth - PANEL_VIEWPORT_MARGIN) / BASE_WIDTH
  const heightScale = (window.innerHeight - PANEL_VIEWPORT_MARGIN) / BASE_HEIGHT

  return Math.max(Math.min(widthScale, heightScale, PANEL_MAX_SCALE), 0.1)
}

const App = () => {
  const [scale, setScale] = useState(getScale)
  const [r1, setR1] = useState(10)
  const [r2, setR2] = useState(10)
  const [r3, setR3] = useState(10)
  const [voltage, setVoltage] = useState(10)
  const [powerOn, setPowerOn] = useState(false)
  const [observations, setObservations] = useState([])
  const [, setStatus] = useState('Adjust the sliders, click CHECK and observe the readings.')

  const [autoConnect, setAutoConnect] = useState(false)
  const [checkRequest, setCheckRequest] = useState(0)
  const [, setConnectionsVerified] = useState(false)
  const [resetRequest, setResetRequest] = useState(0)

  const [calculateRequest, setCalculateRequest] = useState(0) 

  useEffect(() => {
    const handleResize = () => setScale(getScale())

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const readings = useMemo(
    () => calculateReadings({ voltage: powerOn ? 230 : 0, r1, r2, r3 }),
    [powerOn, r1, r2, r3],
  )

  const recordObservation = (source) => {
    setObservations((current) => {
      const nextId = current.length > 0 ? current[current.length - 1].id + 1 : 1;

      const nextObservation = {
        id: nextId,
        voltage: powerOn ? 230 : 0,
        i1: readings.i1,
        i2: readings.i2,
        i3: 0, // Starts at 0, waits for Calculate button
      };

      return [...current.slice(-6), nextObservation]; 
    });

    setStatus(
      source === 'check'
        ? 'KCL verified: I1 equals I2 + I3 for the selected values.'
        : 'Reading added to the observation table.',
    )
  }

  const handleDeleteObservation = () => {
    setObservations((current) => {
      if (current.length === 0) {
        setStatus('No observations to delete.')
        return current
      }
      
      setStatus('Last observation deleted from the table.')
      return current.slice(0, -1) 
    })
  }

  const resetSimulation = () => {
    window.location.reload()
  }

  const handleCalculate = () => {
    if (observations.length === 0) {
      alert('Please add a reading to the observation table first!')
      return
    }

    setObservations((current) => {
      const updated = [...current]
      const lastIndex = updated.length - 1
      const lastRow = updated[lastIndex]

      if (lastRow.voltage > 0 && lastRow.i1 > 0) {
        const calculatedPf = lastRow.i2 / (lastRow.voltage * lastRow.i1)
        updated[lastIndex] = { ...lastRow, i3: calculatedPf } 
      }
      return updated
    })

    setCalculateRequest((prev) => prev + 1)
    setStatus('Power factor computed based on the latest observation.')
  }

  const handlePrint = () => {
    window.print()
  }

  const scaledWidth = Math.ceil(BASE_WIDTH * scale)
  const scaledHeight = Math.ceil(CONTENT_HEIGHT * scale)
  
  const handleCheckConnections = useCallback((result) => {
    if (result.isCorrect) {
      setConnectionsVerified(true)
      setStatus('Right connections!')
      alert('Right connections!') 
      return
    }

    setConnectionsVerified(false)

    if (result.totalConnections === 0) {
      setStatus('Please make the connections first.')
      alert('Please make the connections first.') 
      return
    }

    setStatus(`Invalid connections. Correct matched points: ${result.matchedCount}; total wires: ${result.totalConnections}.`)
    alert('Invalid Connections') 
  }, [])

  const handleCheck = () => {
    setCheckRequest((current) => current + 1)
  }
  
  const handleAutoConnect = () => {
    setAutoConnect(true)
    setConnectionsVerified(false)
    setStatus('Default connections added using jsPlumb. Click CHECK to validate and lock the circuit.')
  }

  return (
    <div id="app-wrapper">
      <div id="app-viewport" style={{ height: `${scaledHeight}px`, width: `${scaledWidth}px` }}>
        <div id="app-scale" style={{ transform: `scale(${scale})` }}>
          <main className="simulation-shell">
            <HeaderBoard />
            <InstructionsTab />

            <section className="workspace-grid">
              <aside className="left-panel">
                <ActionButtons
                  onAdd={() => recordObservation('add')}
                  onCheck={handleCheck}
                  onDelete={handleDeleteObservation}
                  onPrint={handlePrint}
                  onReset={resetSimulation}
                  onAutoConnect={handleAutoConnect}
                  onCalculate={handleCalculate}
                />

                <ControlPanel
                  observations={observations}
                  r1={r1}
                  r2={r2}
                  r3={r3}
                  setR1={setR1}
                  setR2={setR2}
                  setR3={setR3}
                />
              </aside>

              <section className="right-panel">
                <ConnectionLab
                  autoConnect={autoConnect}
                  checkRequest={checkRequest}
                  onCheckConnections={handleCheckConnections}
                  powerOn={powerOn}
                  r1={r1}
                  r2={r2}
                  r3={r3}
                  readings={readings}
                  resetRequest={resetRequest}
                  setPowerOn={setPowerOn}
                  setVoltage={setVoltage}
                  voltage={voltage}
                />
              </section>
            </section>
          </main>
          
          {/* Calculations Board */}
          <div style={{ width: '100%', marginTop: `${CALC_SECTION_GAP}px`, paddingBottom: '40px' }}>
            <CalculationsBoard 
              calculateRequest={calculateRequest} 
              latestObservation={observations.length > 0 ? observations[observations.length - 1] : null} 
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App