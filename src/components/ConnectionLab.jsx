import { useEffect, useRef, useState } from 'react'
import EquipmentPanel from './EquipmentPanel.jsx'

// 🚀 IMPORT ALERT MANAGER
import { playAlertSound } from '../utils/alertAudioManager.js'

import {
  addAllEndpoints,
  autoConnectDefaultCircuit,
  deleteConnectionsForTerminal,
  lockJsPlumbCircuit,
  resolveJsPlumb,
  wireHoverPaintStyles,
  wirePaintStyles,
} from '../utils/jsPlumbWiring.js'

const ConnectionLab = ({
  highlightedTerminals = [], // 🚀 1. ACCEPT THE NEW PROP
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
  setSwitchOn,
  isRVerified 
}) => {
  const containerRef = useRef(null)
  const instanceRef = useRef(null)
  const onCheckConnectionsRef = useRef(onCheckConnections)
  const selectedRef = useRef(selected)
  const [isLocked, setIsLocked] = useState(false)

  // We need to use refs for these so the jsPlumb event listener has access to the freshest values
  const autoConnectRef = useRef(autoConnect)
  const isLockedRef = useRef(isLocked)
  const hasPlayedCompleteAudio = useRef(false) // Prevents audio spam if they keep reconnecting

  useEffect(() => {
    onCheckConnectionsRef.current = onCheckConnections
  }, [onCheckConnections])

  useEffect(() => {
    selectedRef.current = selected
    setPowerOn(false)
    if (setIsVerified) {
      setIsVerified(false)
    }
  }, [selected, setPowerOn, setIsVerified])

  useEffect(() => {
    autoConnectRef.current = autoConnect;
    isLockedRef.current = isLocked;
  }, [autoConnect, isLocked])

  useEffect(() => {
    let cancelled = false
    const initJsPlumb = async () => {
      const jsPlumbModule = await import('jsplumb')
      const jsPlumb = resolveJsPlumb(jsPlumbModule)

      if (cancelled || !containerRef.current || !jsPlumb?.getInstance) return

      instanceRef.current?.reset()
      containerRef.current.classList.remove('connection-lab--locked')
      setIsLocked(false)
      hasPlayedCompleteAudio.current = false; // Reset the audio flag

      const instance = jsPlumb.getInstance({
        Container: containerRef.current,
        ConnectionsDetachable: true,
        ReattachConnections: true,
        Connector: ['Bezier', { curviness: 160 }],
        PaintStyle: { ...wirePaintStyles.positive },
        HoverPaintStyle: { ...wireHoverPaintStyles.positive },
        Endpoint: ['Dot', { radius: 5 }],
      })

      instanceRef.current = instance

      // Dynamically pass the app scale to jsPlumb
      const updateJsPlumbZoom = () => {
        if (!containerRef.current || !instanceRef.current) return;
        const scaleContainer = document.getElementById('app-scale');
        if (scaleContainer) {
          const transform = window.getComputedStyle(scaleContainer).transform;
          if (transform && transform !== 'none') {
            const matrix = transform.match(/^matrix\((.+)\)$/);
            if (matrix) {
              const scaleValue = parseFloat(matrix[1].split(', ')[0]);
              instanceRef.current.setZoom(scaleValue);
            }
          } else {
            instanceRef.current.setZoom(1);
          }
        }
      };

      updateJsPlumbZoom();

      instance.registerConnectionTypes({
        positive: { paintStyle: { ...wirePaintStyles.positive }, hoverPaintStyle: { ...wireHoverPaintStyles.positive } },
        negative: { paintStyle: { ...wirePaintStyles.negative }, hoverPaintStyle: { ...wireHoverPaintStyles.negative } },
      })

      instance.setSuspendDrawing(true)
      addAllEndpoints(instance)
      instance.setSuspendDrawing(false, true)

      // 🚀 2. HELPER FUNCTION TO UPDATE APP.JSX STATE
      const updateConnectionsState = () => {
        const currentConns = instance.getConnections().map(conn => [
          conn.sourceId,
          conn.targetId
        ]);
        setConnections(currentConns);
      };

      // 🚀 3. FIRE THE HELPER EVERY TIME A WIRE IS DRAGGED
      instance.bind("connection", () => {
        updateConnectionsState(); // Tells App.jsx a new wire was added!
        
        // If there are exactly 17 connections, it's not autoconnect, it's not locked yet, and we haven't played it already
        if (
          instance.getConnections().length === 17 && 
          !autoConnectRef.current && 
          !isLockedRef.current &&
          !hasPlayedCompleteAudio.current
        ) {
          hasPlayedCompleteAudio.current = true; // Stop it playing multiple times
          playAlertSound('guideAllComplete');
        }
      });

      // 🚀 4. FIRE THE HELPER EVERY TIME A WIRE IS REMOVED
      instance.bind("connectionDetached", () => {
         updateConnectionsState(); // Tells App.jsx a wire was removed!
         
         if (instance.getConnections().length < 17) {
            hasPlayedCompleteAudio.current = false;
         }
      });

      window.setTimeout(() => {
        instance.repaintEverything();
        updateJsPlumbZoom(); 
      }, 100)
    }

    initJsPlumb()

    const handleResize = () => {
      if (instanceRef.current) {
        const scaleContainer = document.getElementById('app-scale');
        if (scaleContainer) {
          const transform = window.getComputedStyle(scaleContainer).transform;
          if (transform && transform !== 'none') {
            const matrix = transform.match(/^matrix\((.+)\)$/);
            if (matrix) {
              const scaleValue = parseFloat(matrix[1].split(', ')[0]);
              instanceRef.current.setZoom(scaleValue);
            }
          }
        }
        window.setTimeout(() => instanceRef.current?.repaintEverything(), 100)
      }
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
    if (!autoConnect || !instanceRef.current || isLocked) return
    autoConnectDefaultCircuit(instanceRef.current)
    window.setTimeout(() => instanceRef.current?.repaintEverything(), 80)
  }, [autoConnect, isLocked])

  useEffect(() => {
    if (checkRequest === 0 || !instanceRef.current) return

    const rawConnections = instanceRef.current.getConnections().map(conn => [
      conn.sourceId,
      conn.targetId
    ]);

    onCheckConnectionsRef.current?.({ rawConnections })
  }, [checkRequest])

  useEffect(() => {
    if ((isVerified || autoConnect) && instanceRef.current && !isLocked) {
      lockJsPlumbCircuit(instanceRef.current, containerRef.current)
      setIsLocked(true)
    }
  }, [isVerified, autoConnect, isLocked])

  const handleLabelClick = (event) => {
    const label = event.target.closest('.terminal-number-label')
    if (!label || !containerRef.current?.contains(label)) return
    
    event.preventDefault()
    event.stopPropagation()
    
    if (isLocked || autoConnect) return
    
    const terminalId = label.dataset.terminalId
    if (!terminalId || !instanceRef.current) return

    deleteConnectionsForTerminal(instanceRef.current, terminalId)
    instanceRef.current.repaintEverything?.()
  }

 return (
    <div className="connection-lab" onClick={handleLabelClick} ref={containerRef}>
      <EquipmentPanel
        highlightedTerminals={highlightedTerminals} // 🚀 5. PASS IT DOWN TO YOUR DOM ELEMENTS
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
        setSwitchOn={setSwitchOn}
        isRVerified={isRVerified} 
      />
    </div>
  )
}

export default ConnectionLab