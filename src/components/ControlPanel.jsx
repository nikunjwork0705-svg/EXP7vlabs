import React, { useState } from 'react'
import ObservationTable from './ObservationTable.jsx'
import SectionCard from './SectionCard.jsx'

const ControlPanel = ({
  locked,
  observations,
  onShowCorrectedValues,
}) => {
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [showValuesModal, setShowValuesModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 relative">
      
      <SectionCard className="h-[212px]" icon="sliders" id="resistance-controls" title="FORMULAS">
        <div className="flex flex-col gap-[14px] px-[26px] pt-[20px]">
          
          <button
            className="formula-btn"
            onMouseEnter={() => setShowFormulaModal(true)}
            onMouseLeave={() => setShowFormulaModal(false)}
            onClick={() => setShowFormulaModal(!showFormulaModal)}
          >
            Formula Used
          </button>

          <button
            className="formula-btn"
            onMouseEnter={() => setShowValuesModal(true)}
            onMouseLeave={() => setShowValuesModal(false)}
            onClick={() => {
              setShowValuesModal(!showValuesModal);
              if (onShowCorrectedValues) onShowCorrectedValues();
            }}
          >
            Corrected Values
          </button>

        </div>
      </SectionCard>

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
                Cos<span className="italic">(𝜙)</span> = 
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
              <span><span className="italic">Q</span> = <span className="italic">VI</span> Sin<span className="italic">(𝜙)</span></span>
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

      {showValuesModal && (
        <div className="formula-modal">
          <div className="formula-modal__grid formula-modal__grid--values">
            <div className="flex items-center italic"><span>R = 50Ω</span></div>
            <div className="flex items-center italic"><span>Z = 6.41Ω</span></div>
            
            <div className="flex items-center italic"><span>X<sub>L</sub> = 6.28Ω</span></div>
            <div className="flex items-center italic"><span>Cos(𝜙) = 0.128</span></div>
            
            <div className="flex items-center italic"><span>X<sub>C</sub> = 636.94Ω</span></div>
            <div className="flex items-center italic"><span>S = 7.7KVA</span></div>
            
            <div className="flex items-center italic"><span>L = 20mH</span></div>
            <div className="flex items-center italic"><span>Q = 7.63KV Ar</span></div>
            
            <div className="flex items-center col-span-2 italic"><span>C = 5µF</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ControlPanel