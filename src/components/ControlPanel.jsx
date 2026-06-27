import React, { useState } from 'react'
import ObservationTable from './ObservationTable.jsx'
import SectionCard from './SectionCard.jsx'
// 🚀 THE FIX: Import your alert hook
import { useLabAlerts } from '../alerts/useLabAlerts.js' 

const ControlPanel = ({
  locked,
  observations,
  onShowCorrectedValues,
  wrongAttempts = 0
}) => {
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [showValuesModal, setShowValuesModal] = useState(false);
  
  // 🚀 THE FIX: Initialize the showAlert function
  const { showAlert } = useLabAlerts(); 

  const isUnlocked = wrongAttempts >= 2;

  return (
    <div className="flex flex-col gap-6 relative">
      <div id="control-panel">
        <SectionCard className="h-[212px]" icon="sliders" title="MATHEMATICAL EXPRESSIONS">
          <div className="flex flex-col gap-[14px] px-[26px] pt-[20px]">

            <button
              className="formula-btn"
              onMouseEnter={() => setShowFormulaModal(true)}
              onMouseLeave={() => setShowFormulaModal(false)}
              onClick={() => setShowFormulaModal(!showFormulaModal)}
            >
              Formulas
            </button>

            <button
              className={`formula-btn transition-opacity ${!isUnlocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
              onClick={() => {
                if (isUnlocked) {
                  setShowValuesModal(!showValuesModal);
                  if (onShowCorrectedValues) onShowCorrectedValues();
                } else {
                  // 🚀 THE FIX: Replace standard alert with custom showAlert
                  showAlert({ 
                    title: 'Locked', 
                    description: `Corrected Values will unlock after ${2 - wrongAttempts} incorrect calculation attempts.`, 
                    type: 'warning', 
                    icon: '🔒', 
                    placement: 'center', 
                    duration: 4000 
                  });
                }
              }}
            >
              Evaluated Values {isUnlocked ? (showValuesModal ? ' ' : ' ') : ' '}
            </button>

          </div>
        </SectionCard>
      </div>

      <ObservationTable observations={observations} />

      {/* 1. FLOATING FORMULA CARD OVERLAY */}
      {showFormulaModal && (
        <div className="formula-modal">
          <div className="formula-modal__grid">
            {/* Row 1 */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1">
                <span className="italic">R</span> =
                <div className="formula-modal__fraction">
                  <span className="formula-modal__fraction-top italic">V</span>
                  <span className="formula-modal__fraction-bottom italic">I<sub>R</sub></span>
                </div>
              </span>
            </div>
            <span className="inline-flex items-center gap-1">
              <span className="italic">Z</span> =
              <div className="formula-modal__fraction">
                <span className="formula-modal__fraction-top px-8">1</span>
                <span className="formula-modal__fraction-bottom pt-1 flex items-center">
                  √
                  <span className="border-t border-[#41291d] pl-1 ml-[-2px] flex items-center gap-[2px]">
                    (
                    <div className="formula-modal__fraction text-[16px]">
                      <span className="formula-modal__fraction-top px-1">1</span>
                      <span className="formula-modal__fraction-bottom italic">R</span>
                    </div>
                    )² + (
                    <div className="formula-modal__fraction text-[16px]">
                      <span className="formula-modal__fraction-top px-1">1</span>
                      <span className="formula-modal__fraction-bottom italic">X<sub>L</sub></span>
                    </div>
                    -
                    <div className="formula-modal__fraction text-[16px]">
                      <span className="formula-modal__fraction-top px-1">1</span>
                      <span className="formula-modal__fraction-bottom italic">X<sub>C</sub></span>
                    </div>
                    )²
                  </span>
                </span>
              </div>
            </span>

            {/* Row 2 */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1">
                <span className="italic">X<sub>L</sub></span> =
                <div className="formula-modal__fraction">
                  <span className="formula-modal__fraction-top italic">V</span>
                  <span className="formula-modal__fraction-bottom italic">I<sub>L</sub></span>
                </div>
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1">
                cos<span>(𝜙)</span> =
                <div className="formula-modal__fraction">
                  <span className="formula-modal__fraction-top italic">Z</span>
                  <span className="formula-modal__fraction-bottom italic">R</span>
                </div>
              </span>
            </div>

            {/* Row 3 */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1">
                <span className="italic">X<sub>C</sub></span> =
                <div className="formula-modal__fraction">
                  <span className="formula-modal__fraction-top italic">V</span>
                  <span className="formula-modal__fraction-bottom italic">I<sub>C</sub></span>
                </div>
              </span>
            </div>
            <div className="flex items-center">
              <span><span className="italic">S</span> = <span className="italic">VI</span></span>
            </div>

            {/* Row 4 */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1">
                <span className="italic">L</span> =
                <div className="formula-modal__fraction">
                  <span className="formula-modal__fraction-top italic">X<sub>L</sub></span>
                  <span className="formula-modal__fraction-bottom">2<span className="italic">πf</span></span>
                </div>
              </span>
            </div>
            <div className="flex items-center">
              <span><span className="italic">Q</span> = <span className="italic">VI</span> sin<span className="italic">(𝜙)</span></span>
            </div>

            {/* Row 5 */}
            <div className="flex items-center col-span-2">
              <span className="inline-flex items-center gap-1">
                <span className="italic">C</span> =
                <div className="formula-modal__fraction">
                  <span className="formula-modal__fraction-top px-2">1</span>
                  <span className="formula-modal__fraction-bottom">2<span className="italic">πfX<sub>C</sub></span></span>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}

      {showValuesModal && isUnlocked && (
        <div className="formula-modal">
          <div className="formula-modal__grid formula-modal__grid--values">
            <div className="flex items-center italic"><span>R = 100 Ω</span></div>
            <div className="flex items-center italic"><span>Z = 99.345 Ω</span></div>

            <div className="flex items-center italic"><span>X<sub>L</sub> = 62.832 Ω</span></div>
            <div className="flex items-center italic"><span>cos(𝜙) = 0.993</span></div>

            <div className="flex items-center italic"><span>X<sub>C</sub> = 67.726 Ω</span></div>
            <div className="flex items-center italic"><span>S = 5.798 VA</span></div>

            <div className="flex items-center italic"><span>L = 0.20 H</span></div>
            <div className="flex items-center italic"><span>Q = 0.662 VAr</span></div>

            <div className="flex items-center col-span-2 italic"><span>C = 47 µF</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ControlPanel