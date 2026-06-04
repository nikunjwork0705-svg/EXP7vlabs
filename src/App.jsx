import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import './ConnectionEndpoints.css'
import ConnectionLab from './components/ConnectionLab.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import HeaderBoard from './components/HeaderBoard.jsx'
import InstructionsTab from './components/InstructionsTab.jsx'
import { EXPERIMENT_ALERTS } from './alerts/experimentStepAlerts.js'
import { useLabAlerts } from './alerts/useLabAlerts.js'
import WalkthroughProvider from './walkthrough/WalkthroughProvider.jsx'
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
  if (typeof window === 'undefined') return 1
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
  const [connectionsVerified, setConnectionsVerified] = useState(false)
  const [resetRequest, setResetRequest] = useState(0)
  const [calculateRequest, setCalculateRequest] = useState(0)

  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)

  const [connections, setConnections] = useState([])
  const [selected, setSelected] = useState('null')

  const [variacOn, setVariacOn] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)

  useEffect(() => {
    const handleResize = () => setScale(getScale())
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const readings = useMemo(
    () => calculateReadings({
      voltage: powerOn ? voltage : 0,
      powerOn,
      selected
    }),
    [voltage, powerOn, selected],
  )

  const recordObservation = (source) => {
    if (!['CFL', 'Lamp', 'LED', 'Tubelight'].includes(selected)) {
      alert("Please select a valid load before taking a reading!");
      return;
    }

    if (!connectionsVerified) {
      alert("Please verify your connections using the CHECK button first!")
      return
    }
    if (!powerOn) {
      alert("Please turn ON the MCB first!")
      return
    }

    if (!variacOn) {
      alert("Please turn ON the Variac power button first!")
      return
    }

    if (voltage !== 230) {
      alert("Please set the Variac to 230V first!")
      return
    }

    if (!switchOn) {
      alert("Turn on the Switch first then add reading to the observation table!")
      return
    }

    const isDuplicate = observations.some((row) => row.load === selected);

    if (isDuplicate) {
      alert(`You have already recorded the reading for the ${selected}! Please change the load to take a new reading.`);
      return;
    }

    setObservations((current) => {
      const nextId = current.length > 0 ? current[current.length - 1].id + 1 : 1;
      const nextObservation = {
        id: nextId,
        load: selected,
        voltage: powerOn ? 230 : 0,
        i1: readings.i1,
        i2: readings.i2,
        i3: 0,
      };
      return [...current.slice(), nextObservation];
    });
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

  const handlePrint = () => window.print()

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
    const validLoads = ['CFL', 'Lamp', 'LED', 'Tubelight'];

    if (!validLoads.includes(selected)) {
      alert("Please choose a load for the experiment first!")
      return
    }

    setAutoConnect(true)
    setConnectionsVerified(false)
    setStatus('Default connections added using jsPlumb. Click CHECK to validate and lock the circuit.')
  }

  const scaledWidth = Math.ceil(BASE_WIDTH * scale)
  const scaledHeight = Math.ceil(CONTENT_HEIGHT * scale)

  return (
    <WalkthroughProvider>
      <div id="app-wrapper">
        <div id="app-viewport" style={{ height: `${scaledHeight}px`, width: `${scaledWidth}px` }}>
          <div id="app-scale" style={{ transform: `scale(${scale})` }}>

            <main className="simulation-shell">
              <HeaderBoard />

              <section className="workspace-grid">

                <aside className="left-panel flex flex-col gap-1">
                  <ActionButtons
                    onAdd={() => recordObservation('add')}
                    onCheck={handleCheck}
                    onDelete={handleDeleteObservation}
                    onPrint={handlePrint}
                    onReset={resetSimulation}
                    onAutoConnect={handleAutoConnect}
                    onCalculate={handleCalculate}
                    onInstruction={() => setIsInstructionsOpen(!isInstructionsOpen)}
                  />

                  <div className="relative w-full flex-grow flex flex-col gap-6.5 mt-2">

                    <ControlPanel observations={observations} />

                    <InstructionsTab
                      isOpen={isInstructionsOpen}
                      toggleOpen={() => setIsInstructionsOpen(false)}
                    />

                  </div>
                </aside>

               <section className="right-panel">
                  <ConnectionLab
                    autoConnect={autoConnect}
                    checkRequest={checkRequest}
                    onCheckConnections={handleCheckConnections}
                    powerOn={powerOn}
                    isVerified={connectionsVerified}
                    readings={readings}
                    resetRequest={resetRequest}
                    setPowerOn={setPowerOn}
                    setVoltage={setVoltage}
                    voltage={voltage}
                    connections={connections}
                    setConnections={setConnections}
                    selected={selected}
                    setSelected={setSelected}
                    setIsVerified={setConnectionsVerified} 
                    
                    variacOn={variacOn}
                    setVariacOn={setVariacOn}
                    switchOn={switchOn}
                    setSwitchOn={setSwitchOn}
                  />
                </section>
              </section>
            </main>

            <div style={{ width: '100%', marginTop: `${CALC_SECTION_GAP}px`, paddingBottom: '40px' }}>
              <CalculationsBoard
                calculateRequest={calculateRequest}
                latestObservation={observations.length > 0 ? observations[observations.length - 1] : null}
              />
            </div>

          </div>
        </div>
      </div>
    </WalkthroughProvider>
  )
}

export default App