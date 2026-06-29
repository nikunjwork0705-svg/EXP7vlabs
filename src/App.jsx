import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import './ConnectionEndpoints.css'
import ConnectionLab from './components/ConnectionLab.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import HeaderBoard from './components/HeaderBoard.jsx'
import InstructionsTab from './components/InstructionsTab.jsx'
import { useLabAlerts } from './alerts/useLabAlerts.js'
import WalkthroughProvider from './walkthrough/WalkthroughProvider.jsx'
import WalkthroughStartButton from './walkthrough/components/WalkthroughStartButton.jsx'
import CalculationsBoard from './components/CalculationsBoard.jsx'
import { useAiGuideNarration } from './aiGuide/useAiGuideNarration.js'

import { calculateReadings } from './utils/circuitMath.js'
import ReportControls from './components/ReportControls.jsx'
import { generateKclReport } from './utils/reportGenerator.js'

// 🚀 IMPORT THE ALERT AUDIO MANAGER
import { playAlertSound, stopAlertSound } from './utils/alertAudioManager.js'

const BASE_WIDTH = 1440
const BASE_HEIGHT = 880
const CALC_SECTION_GAP = 28
const CALC_SECTION_HEIGHT = 460
const CONTENT_HEIGHT = BASE_HEIGHT + CALC_SECTION_GAP + CALC_SECTION_HEIGHT
const PANEL_MAX_SCALE = 1
const PANEL_VIEWPORT_MARGIN = 24

const initialDPR = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;

const getScale = () => {
  if (typeof window === 'undefined') return 1;
  const currentZoom = window.devicePixelRatio / initialDPR;
  const effectiveWidth = window.innerWidth * currentZoom;
  const effectiveHeight = window.innerHeight * currentZoom;

  const widthScale = (effectiveWidth - PANEL_VIEWPORT_MARGIN) / BASE_WIDTH;
  const heightScale = (effectiveHeight - PANEL_VIEWPORT_MARGIN) / BASE_HEIGHT;
  
  return Math.max(Math.min(widthScale, heightScale, PANEL_MAX_SCALE), 0.1);
}

const CORRECT_CONNECTIONS = [
  ['1-endpoint', '23-endpoint'], ['2-endpoint', '24-endpoint'],
  ['3-endpoint', '25-endpoint'], ['4-endpoint', '26-endpoint'],
  ['5-endpoint', '25-endpoint'], ['6-endpoint', '9-endpoint'],
  ['9-endpoint', '10-endpoint'], ['7-endpoint', '18-endpoint'],
  ['8-endpoint', '11-endpoint'], ['11-endpoint', '13-endpoint'],
  ['13-endpoint', '15-endpoint'], ['12-endpoint', '17-endpoint'],
  ['18-endpoint', '20-endpoint'], ['14-endpoint', '19-endpoint'],
  ['16-endpoint', '21-endpoint'], ['20-endpoint', '22-endpoint'],
  ['26-endpoint', '7-endpoint']
];

const MIN_READINGS = 1;

const App = () => {
  const { clearAlerts, showAlert } = useLabAlerts()

  const [scale, setScale] = useState(getScale)
  const [r1, setR1] = useState(10)
  const [r2, setR2] = useState(10)
  const [r3, setR3] = useState(10)
  const [voltage, setVoltage] = useState(0)
  const [powerOn, setPowerOn] = useState(false)
  const [observations, setObservations] = useState([])
  const [status, setStatus] = useState('Adjust the sliders, click CHECK and observe the readings.')

  const [autoConnect, setAutoConnect] = useState(false)
  const [checkRequest, setCheckRequest] = useState(0)
  const [resetRequest, setResetRequest] = useState(0)
  const [calculateRequest, setCalculateRequest] = useState(0)
  
  const [connectionsVerified, setConnectionsVerified] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)
  const [connections, setConnections] = useState([])
  const [selected, setSelected] = useState('null')
  const [variacOn, setVariacOn] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)
  const hasAlerted24V = useRef(false);
  const [wrongAttempts, setWrongAttempts] = useState(0)

  const [isRCorrect, setIsRCorrect] = useState(false)
  const [isAllCalculationsVerified, setIsAllCalculationsVerified] = useState(false) 
  const [verifiedCalcValues, setVerifiedCalcValues] = useState(null)
  
  const [currentStep, setCurrentStep] = useState(1);
  const readingCount = observations.length;
  const sessionStart = useMemo(() => new Date().toISOString(), []);

  // 🚀 AI GUIDE REACTIVE STATE
  const [isAiGuideMode, setIsAiGuideMode] = useState(false);
  const lastPlayedStepRef = useRef(null); 

  const nextMissingConnectionIndex = useMemo(() => {
    const isSameConnection = (c1, c2) => {
      if (!c1 || !c2) return false;
      return (c1[0] === c2[0] && c1[1] === c2[1]) || (c1[0] === c2[1] && c1[1] === c2[0]);
    };
    return CORRECT_CONNECTIONS.findIndex(
      correctConn => !connections.some(currConn => isSameConnection(currConn, correctConn))
    );
  }, [connections]);

  const highlightedTerminals = (isAiGuideMode && currentStep === 2 && nextMissingConnectionIndex !== -1 && !autoConnect)
    ? CORRECT_CONNECTIONS[nextMissingConnectionIndex]
    : [];

  const handleWalkthroughComplete = useCallback(() => {
    setCurrentStep(2);
    setStatus('Interface walkthrough completed. AI Guide taking over.');
  }, []);

  const { isPlaying: isAiAudioPlaying, playStep, stop: stopAiGuide } = useAiGuideNarration({
    onError: () => setStatus('AI Guide narration could not start.'), 
    onStart: () => setStatus('AI Guide narration started.'), 
    onFinish: () => setStatus('AI Guide narration completed.') 
  });

  // 🚀 THE FIX: A centralized function that aggressively kills old audio before starting new audio
  const triggerAiGuideStepRef = useRef(null);
  triggerAiGuideStepRef.current = (step) => {
    if (!isAiGuideMode || !playStep) return;
    
    // Stop the AI Guide hook audio
    stopAiGuide(); 
    
    // Tiny delay ensures the browser flushes the old audio buffer before starting the new one
    setTimeout(() => {
      playStep(step);
      lastPlayedStepRef.current = step;
    }, 20); 
  };

  const handleAiGuide = useCallback(() => {
    // 🚀 NEW: Shout to the Walkthrough popup to stop its audio!
    window.dispatchEvent(new CustomEvent('force-stop-walkthrough'));

    if (isAiGuideMode) {
      setIsAiGuideMode(false);
      stopAiGuide();
      lastPlayedStepRef.current = null;
    } else {
      setIsAiGuideMode(true);
      if (currentStep === 1 && playStep) {
        stopAiGuide();
        playStep(1);
        lastPlayedStepRef.current = 1;
      }
    }
  }, [isAiGuideMode, stopAiGuide, currentStep, playStep]);

  // 🚀 NEW: If the Walkthrough popup opens, instantly kill the AI Guide
// 🚀 NEW: If the Walkthrough popup opens, instantly kill the AI Guide audio
  // BUT keep AI Mode ON so the Walkthrough knows it's allowed to autoplay!
  useEffect(() => {
    const handleStopAiGuide = () => {
      // ❌ REMOVED: setIsAiGuideMode(false); 
      stopAiGuide(); // Just kill the audio so they don't overlap
    };
    
    window.addEventListener('force-stop-ai-guide', handleStopAiGuide);
    return () => window.removeEventListener('force-stop-ai-guide', handleStopAiGuide);
  }, [stopAiGuide]);

  // 🚀 AI GUIDE: THE REACTIVE OBSERVER
  useEffect(() => {
    if (!isAiGuideMode || !playStep) return;
    let stepToPlay = null;

    if (currentStep === 1 && lastPlayedStepRef.current !== 1) {
      stepToPlay = 1;
    }
    else if (currentStep === 2 && connections.length === 0 && lastPlayedStepRef.current !== 2 && lastPlayedStepRef.current !== 3 && lastPlayedStepRef.current !== 24) {
      stepToPlay = 2; 
    }
    else if (currentStep === 2 && connections.length === 0 && lastPlayedStepRef.current === 2 && !isAiAudioPlaying) {
      stepToPlay = 3;
    }
    else if (currentStep === 2 && !autoConnect) {
      if (nextMissingConnectionIndex !== -1) {
        const targetStep = nextMissingConnectionIndex + 3;
        if (lastPlayedStepRef.current !== targetStep) {
          stepToPlay = targetStep;
        }
      } else if (nextMissingConnectionIndex === -1 && lastPlayedStepRef.current !== 20) {
        stepToPlay = 20; 
      }
    }
    else if (currentStep === 3 && lastPlayedStepRef.current !== 28) {
      stepToPlay = 28;
    }
    else if (currentStep === 4 && lastPlayedStepRef.current !== 29) {
      stepToPlay = 29;
    }

    if (stepToPlay !== null && lastPlayedStepRef.current !== stepToPlay) {
      // 🚀 Use the new strict function here
      triggerAiGuideStepRef.current(stepToPlay);
    }
  }, [isAiGuideMode, playStep, currentStep, connections, isAiAudioPlaying, autoConnect, nextMissingConnectionIndex]); 

  // VOLTAGE EFFECT
  useEffect(() => {
    if (voltage === 24 && !hasAlerted24V.current) {
      hasAlerted24V.current = true;
      setCurrentStep(6);
      
      // 🚀 Use the new strict function here
      triggerAiGuideStepRef.current(30);

      setTimeout(() => {
        playAlertSound('afterVolSet');
        showAlert({ 
          title: 'Voltage Reached', 
          description: 'The voltage has been set to 24 V to ensure safe operation of the RLC circuit experiment. The readings are now displayed on the voltmeter, ammeter, and wattmeter. Now, click on the Add button to add the readings to the observation table.',
          type: 'success', icon: '⚡', placement: 'center', 
          duration: 18000, 
          onClose: () => stopAlertSound()
        });
      }, 50);
      setStatus("Variac voltage set to 24V.");
    } else if (voltage === 0) {
      hasAlerted24V.current = false;
    }
  }, [voltage, showAlert, isAiGuideMode, playStep]);

  const readings = useMemo(() => calculateReadings({ voltage: powerOn ? voltage : 0, powerOn, selected }), [voltage, powerOn, selected])

  const recordObservation = (source) => {
    if (observations.length >= 1) {
      // 🚀 Use the new strict function here
      triggerAiGuideStepRef.current(32);
      
      playAlertSound('afterReadAddClick');
      showAlert({ 
        title: 'Already Added', description: 'The readings are already added to the table. Calculate the required circuit parameters and click the verify button to verify them.', type: 'info', icon: 'ℹ️', placement: 'center', duration: 8200, onClose: () => stopAlertSound()
      });
      return; 
    }

    if (!connectionsVerified) { showAlert({ title: 'Action Required', description: 'Please verify your connections using the CHECK button first.', type: 'warning', icon: '⚠️', placement: 'center', duration: 5000, onClose: () => stopAlertSound() }); return }
    if (!powerOn) { showAlert({ title: 'Action Required', description: 'Please turn ON the MCB first.', type: 'warning', icon: '⚡', placement: 'center', duration: 5000, onClose: () => stopAlertSound() }); return }
    if (!switchOn) { showAlert({ title: 'Action Required', description: 'Please turn ON the Autotransformer power button first.', type: 'warning', icon: '🔌', placement: 'center', duration: 5000, onClose: () => stopAlertSound() }); return }
    if (voltage !== 24) { showAlert({ title: 'Action Required', description: 'Please rotate the Autotransformer first.', type: 'warning', icon: '🎛️', placement: 'center', duration: 5000, onClose: () => stopAlertSound() }); return }

    setObservations((current) => {
      const nextId = current.length > 0 ? current[current.length - 1].id + 1 : 1;
      const nextObservation = { id: nextId, voltage: 24, current: 0.242, iL: 0.382, iR: 0.240, iC: 0.354, power: 5.76 };
      return [...current.slice(), nextObservation];
    });

    setCurrentStep(7);

    // 🚀 Use the new strict function here
    triggerAiGuideStepRef.current(31);
    
    playAlertSound('firstReadAdded');
    showAlert({ 
      title: 'Success', description: 'Readings added successfully. Now, calculate the required circuit parameters using the measured readings and the provided formulas. Once you have entered the calculated values, click the Verify button to compare your calculated values with the evaluated values.', type: 'success', icon: '📊', placement: 'top-right', duration: 15000, onClose: () => stopAlertSound()
    });
  }

  const handleDeleteObservation = () => {
    setObservations((current) => {
      if (current.length === 0) { setStatus('No observations to delete.'); return current }
      setStatus('Last observation deleted from the table.')
      return current.slice(0, -1)
    })
  }

  const resetSimulation = () => {
    stopAiGuide();
    clearAlerts();
    setCurrentStep(1);
    
    // 🚀 Use the new strict function here
    triggerAiGuideStepRef.current(39);
    
    playAlertSound('reset');
    
    const executeReset = () => {
      stopAlertSound();
      window.location.reload(); 
    };

    showAlert({ title: 'Simulation Reset', description: 'The Simulation has been RESET. You can start again.', type: 'info', icon: '🔄', placement: 'center', duration: 5000, onClose: executeReset });
  }

  const handleCalculate = () => {
    if (observations.length === 0) { showAlert({ title: 'Action Required', description: 'Please add a reading to the observation table first!', type: 'warning', icon: '⚠️', placement: 'center', duration: 5000, onClose: () => stopAlertSound() }); return }
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
    // 🚀 Use the new strict function here
    triggerAiGuideStepRef.current(40);
    
    playAlertSound('print');
    const executePrint = () => { stopAlertSound(); setTimeout(() => { window.print(); }, 100); };
    showAlert({ title: 'Printing', description: 'Opening the Print dialog.', type: 'info', icon: '🖨️', placement: 'center', duration: 5000, onClose: executePrint });
  }

  const handleGenerateReport = () => {
    if (readingCount < MIN_READINGS) {
      const remainingReadings = MIN_READINGS - readingCount
      showAlert({ title: 'More Data Needed', description: `Please add ${remainingReadings} more reading(s) to the table before generating the report.`, type: 'warning', icon: '⚠️', placement: 'center', duration: 5000, onClose: () => stopAlertSound() });
      return
    }

    if (!isAllCalculationsVerified) {
      showAlert({ title: 'Verification Required', description: 'You must successfully verify ALL calculated values on the Calculations Board before generating the report.', type: 'warning', icon: '⚠️', placement: 'center', duration: 5000, onClose: () => stopAlertSound() });
      return
    }

    // 🚀 Use the new strict function here
    triggerAiGuideStepRef.current(38);
    
    playAlertSound('genRepBtnClick');

    const executeGenerate = () => {
      stopAlertSound();
      const isSuccess = generateKclReport({ observations: observations, resistances: { r1, r2, r3 }, sessionStart: sessionStart, calcValues: verifiedCalcValues });
      if (isSuccess) { setReportGenerated(true); setStatus('Experiment report generated successfully.'); } 
    };

    showAlert({ title: 'Report Generated', description: 'Your report has been generated successfully. Click OK to view your report.', type: 'success', icon: '✅', placement: 'center', requiresConfirmation: true, confirmLabel: 'OK', onConfirm: executeGenerate });
  }

  const handleAutoConnect = () => {
    setAutoConnect(true); setConnectionsVerified(false); setCurrentStep(2);
    setStatus('Default connections added using jsPlumb. Click CHECK to validate and lock the circuit.')
    
    // 🚀 Use the new strict function here
    triggerAiGuideStepRef.current(24);

    setTimeout(() => { 
      playAlertSound('autoConnect');
      showAlert({ title: 'Autoconnect Completed', description: 'Autoconnect Completed. Click on the CHECK button to verify the connections.', type: 'info', icon: '🔌', duration: 5000, onClose: () => stopAlertSound() }) 
    }, 150);
  }

  const handleCheck = () => { setCheckRequest((current) => current + 1) }

  const handleCheckConnections = useCallback((result) => {
    if (!result || !result.rawConnections) return;
    const currentConns = result.rawConnections;

    if (currentConns.length === 0) {
      setConnectionsVerified(false);
      // 🚀 Use the new strict function here
      triggerAiGuideStepRef.current(23);
      
      playAlertSound('firstCheck');
      showAlert({ title: 'Alert', description: 'Please make the required connections as per the given instructions.', type: 'warning', icon: '⚠️', placement: 'center', dedupeKey: 'no-connections-error', duration: 6000, onClose: () => stopAlertSound() });
      return; 
    }

    const formatNode = (nodeId) => nodeId ? nodeId.toString().replace('-endpoint', '') : '';
    const isSameConnection = (c1, c2) => {
      if (!c1 || !c2) return false;
      return (c1[0] === c2[0] && c1[1] === c2[1]) || (c1[0] === c2[1] && c1[1] === c2[0]);
    };

    const wrongConnections = [];
    const missingConnections = [];

    currentConns.forEach(currConn => {
      const isRight = CORRECT_CONNECTIONS.some(rightConn => isSameConnection(currConn, rightConn));
      if (!isRight) { wrongConnections.push(`${formatNode(currConn[0])} - ${formatNode(currConn[1])}`); }
    });

    CORRECT_CONNECTIONS.forEach(rightConn => {
      const isPresent = currentConns.some(currConn => isSameConnection(currConn, rightConn));
      if (!isPresent) { missingConnections.push(`${formatNode(rightConn[0])} - ${formatNode(rightConn[1])}`); }
    });

    if (wrongConnections.length === 0 && missingConnections.length === 0) {
      setConnectionsVerified(true); setCurrentStep(3); setStatus('Right connections. Now, turn ON the MCB.');
      
      // 🚀 Use the new strict function here
      triggerAiGuideStepRef.current(27);
      
      playAlertSound('forCorrConnCheckClick');
      showAlert({ title: 'Connections Verified', description: 'Connections Verified successfully. Now turn ON the MCB by clicking the MCB lever.', type: 'success', icon: '✅', placement: 'center', duration: 7000, onClose: () => stopAlertSound() });
    } else {
      setConnectionsVerified(false);
      if (wrongConnections.length === 1) {
        // 🚀 Use the new strict function here
        triggerAiGuideStepRef.current(21);
        playAlertSound('wrongConn');
      } else if (wrongConnections.length > 1) {
        // 🚀 Use the new strict function here
        triggerAiGuideStepRef.current(22);
        playAlertSound('multiWrong');
      }

      let wrongText = ''; let missingText = '';
      if (wrongConnections.length > 0) {
        if (wrongConnections.length === 1) { wrongText = `Wrong Connection: ${wrongConnections[0]}.`; } 
        else { wrongText = `Wrong Connections: ${wrongConnections.map((conn, index) => `Connection ${index + 1}: ${conn}`).join(', ')}.`; }
      }
      if (missingConnections.length > 0) {
        missingText = `Missing Connections: `;
        const visibleMissing = missingConnections.slice(0, 3);
        const hiddenCount = missingConnections.length - 3;
        missingText += visibleMissing.map((conn, index) => `Connection ${index + 1}: ${conn}`).join(', ');
        if (hiddenCount > 0) { missingText += ` and ${hiddenCount} more.`; } else { missingText += '.'; }
      }
      const finalDescription = [wrongText, missingText].filter(Boolean).join('\n\n');
      showAlert({ title: 'Alert', description: finalDescription, type: 'warning', icon: '⚠️', placement: 'center', dedupeKey: 'connection-check-error', duration: 8000, onClose: () => stopAlertSound() });
    }
  }, [showAlert, isAiGuideMode, playStep]); 

  const scaledWidth = Math.ceil(BASE_WIDTH * scale)
  const scaledHeight = Math.ceil(CONTENT_HEIGHT * scale)

  return (
    <WalkthroughProvider 
      onComplete={handleWalkthroughComplete} 
      onExit={handleWalkthroughComplete}
      isAudioEnabled={isAiGuideMode} 
    >
      <div id="app-wrapper" className="flex justify-center w-full min-h-screen">
        <div id="app-viewport" style={{ height: `${scaledHeight}px`, width: `${scaledWidth}px`, position: 'relative' }}>
          <div id="app-scale" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
            <main className="simulation-shell">
              <HeaderBoard />
              <WalkthroughStartButton />
              <span className="sr-only" role="status" aria-live="polite">{status}</span>

              <section className="workspace-grid">
                <aside className="left-panel flex flex-col gap-1">
                  <ActionButtons
                    activeButtons={{ onAiGuide: isAiGuideMode }} 
                    disabledButtons={{ onAdd: voltage < 24, onAutoConnect: connectionsVerified || powerOn, onCheck: connectionsVerified, onPlot: false, onPrint: false }}
                    onAdd={() => recordObservation('add')}
                    onCheck={handleCheck}
                    onDelete={handleDeleteObservation}
                    onPrint={handlePrint}
                    onReset={resetSimulation}
                    onAutoConnect={handleAutoConnect}
                    onCalculate={handleCalculate}
                    onAiGuide={handleAiGuide} 
                    onInstruction={() => setIsInstructionsOpen(!isInstructionsOpen)}
                  />

                  <div className="relative w-full flex-grow flex flex-col gap-6.5 mt-2.5">
                    <ControlPanel observations={observations} wrongAttempts={wrongAttempts} />
                    <div className="w-full flex justify-center mt-4 z-50">
                      <ReportControls
                        minReadings={MIN_READINGS}
                        onGenerateReport={handleGenerateReport}
                        readingCount={readingCount}
                        reportGenerated={reportGenerated}
                        isCalculationsVerified={isAllCalculationsVerified} 
                      />
                    </div>
                    <InstructionsTab isOpen={isInstructionsOpen} toggleOpen={() => setIsInstructionsOpen(false)} currentStep={currentStep} />
                  </div>
                </aside>

                <section className="right-panel">
                  <ConnectionLab
                    highlightedTerminals={highlightedTerminals} 
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
                    isRVerified={isRCorrect} 
                  />
                </section>
              </section>
            </main>

            <div style={{ width: '100%', marginTop: `${CALC_SECTION_GAP}px`, paddingBottom: '40px' }}>
              <CalculationsBoard
                isVerified={connectionsVerified}
                powerOn={powerOn}
                switchOn={switchOn}
                voltage={voltage}
                observations={observations}
                onWrongAttempt={() => setWrongAttempts(prev => prev + 1)}
                onRVerified={(rCorrect, allCorrect, values) => {
                  setIsRCorrect(prev => prev ? true : rCorrect);
                  setIsAllCalculationsVerified(allCorrect);
                  if (allCorrect) { 
                    setVerifiedCalcValues(values); 
                    // 🚀 Use the new strict function here
                    triggerAiGuideStepRef.current(33);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </WalkthroughProvider>
  )
}

export default App