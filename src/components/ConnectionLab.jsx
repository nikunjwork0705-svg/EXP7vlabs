import { useEffect, useRef, useState } from 'react'

import CircuitDiagram from './CircuitDiagram.jsx'
import EquipmentPanel from './EquipmentPanel.jsx'

import {
  addAllEndpoints,
  autoConnectDefaultCircuit,
  deleteConnectionsForTerminal,
  lockJsPlumbCircuit,
  resolveJsPlumb,
  validateOldExperimentConnections,
  wireHoverPaintStyles,
  wirePaintStyles,
} from '../utils/jsPlumbWiring.js'

const ConnectionLab = ({
  autoConnect,
  checkRequest,
  onCheckConnections,
  powerOn,
  isVerified,
  setIsVerified,
  r1,
  r2,
  r3,
  readings,
  resetRequest,
  setPowerOn,
  setVoltage,
  voltage,
  selected,
  setSelected,
  connections,
  setConnections,
  variacOn,
  setVariacOn,
  switchOn,
  setSwitchOn
}) => {
  const containerRef = useRef(null)
  const instanceRef = useRef(null)
  const onCheckConnectionsRef = useRef(onCheckConnections)

  const selectedRef = useRef(selected)

  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    onCheckConnectionsRef.current = onCheckConnections
  }, [onCheckConnections])

  useEffect(() => {
    selectedRef.current = selected

    setPowerOn(false)

    if (setIsVerified) {
      setIsVerified(false)
    }
  }, [selected])


  useEffect(() => {
    let cancelled = false

    const initJsPlumb = async () => {
      const jsPlumbModule = await import('jsplumb')
      const jsPlumb = resolveJsPlumb(jsPlumbModule)

      if (cancelled || !containerRef.current || !jsPlumb?.getInstance) {
        return
      }

      instanceRef.current?.reset()

      containerRef.current.classList.remove('connection-lab--locked')
      setIsLocked(false)

      const instance = jsPlumb.getInstance({
        Container: containerRef.current,
        ConnectionsDetachable: true,
        ReattachConnections: true,
        Connector: ['Bezier', { curviness: 20 }],
        PaintStyle: {
          ...wirePaintStyles.positive,
        },
        HoverPaintStyle: {
          ...wireHoverPaintStyles.positive,
        },
        Endpoint: ['Dot', { radius: 5 }],
      })

      instanceRef.current = instance

      instance.registerConnectionTypes({
        positive: {
          paintStyle: {
            ...wirePaintStyles.positive,
          },
          hoverPaintStyle: {
            ...wireHoverPaintStyles.positive,
          },
        },
        negative: {
          paintStyle: {
            ...wirePaintStyles.negative,
          },
          hoverPaintStyle: {
            ...wireHoverPaintStyles.negative,
          },
        },
      })

      const validLoads = ['CFL', 'Lamp', 'LED', 'Tubelight'];

      instance.bind('beforeDrag', (params) => {
        if (!validLoads.includes(selectedRef.current)) {
          alert("Please choose a load for the experiment first!")
          return false
        }
        return true
      })
      instance.bind('beforeDrop', (info) => {
        if (!validLoads.includes(selectedRef.current)) {
          return false
        }
        return true
      })

      instance.bind('connection', (info) => {
        if (!validLoads.includes(selectedRef.current)) {
          instance.deleteConnection(info.connection);
        }
      })

      instance.setSuspendDrawing(true)

      addAllEndpoints(instance)

      instance.setSuspendDrawing(false, true)

      window.setTimeout(() => {
        instance.repaintEverything()
      }, 100)
    }

    initJsPlumb()

    const handleResize = () => {
      window.setTimeout(() => {
        instanceRef.current?.repaintEverything()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelled = true
      window.removeEventListener('resize', handleResize)

      instanceRef.current?.reset()
      instanceRef.current = null
    }
  }, [resetRequest])

  useEffect(() => {
    if (!autoConnect || !instanceRef.current || isLocked) {
      return
    }

    autoConnectDefaultCircuit(instanceRef.current)

    window.setTimeout(() => {
      instanceRef.current?.repaintEverything()
    }, 80)
  }, [autoConnect, isLocked])

  useEffect(() => {
    if (checkRequest === 0 || !instanceRef.current) {
      return
    }

    const result = validateOldExperimentConnections(instanceRef.current)

    if (result.isCorrect) {
      lockJsPlumbCircuit(instanceRef.current, containerRef.current)
      setIsLocked(true)
    }

    onCheckConnectionsRef.current?.(result)
  }, [checkRequest])

  const handleLabelClick = (event) => {
    const label = event.target.closest('.terminal-number-label')

    if (!label || !containerRef.current?.contains(label)) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    if (isLocked) {
      return
    }

    const terminalId = label.dataset.terminalId

    if (!terminalId || !instanceRef.current) {
      return
    }

    deleteConnectionsForTerminal(instanceRef.current, terminalId)
    instanceRef.current.repaintEverything?.()
  }

 return (
    <div className="connection-lab" onClick={handleLabelClick} ref={containerRef}>
      <EquipmentPanel
        powerOn={powerOn}
        readings={readings}
        setPowerOn={setPowerOn}
        setVoltage={setVoltage}
        voltage={voltage}
        selected={selected}
        setSelected={setSelected}
        connections={connections}
        setConnections={setConnections}
        isVerified={isVerified}
        switchOn={switchOn} 
      />

      <CircuitDiagram
        r1={r1}
        r2={r2}
        r3={r3}
        selected={selected}
        setSelected={setSelected}
        connections={connections}
        setConnections={setConnections}
        voltage={voltage}
        setVoltage={setVoltage}
        mcbOn={powerOn}
        isVerified={isVerified}
        variacOn={variacOn}
        setVariacOn={setVariacOn}
        switchOn={switchOn}
        setSwitchOn={setSwitchOn}
      />
    </div>
  )
}

export default ConnectionLab