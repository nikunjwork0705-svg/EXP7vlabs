import React from 'react'
import { PdfIcon } from './Icons.jsx'

const ReportControls = ({
  minReadings,
  onGenerateReport,
  readingCount,
  reportGenerated,
  isCalculationsVerified 
}) => {
  const readingsReady = readingCount >= minReadings
  
  // The button is ONLY enabled if BOTH conditions are true
  const isButtonEnabled = readingsReady && isCalculationsVerified


  return (
    <button
      id="generate-report-button"
      type="button"
      className="report-button"
      disabled={!isButtonEnabled} 
      // title={buttonTitle}
      aria-label="Generate Report"
      data-report-generated={reportGenerated ? 'true' : 'false'}
      onClick={onGenerateReport}
    >
       <PdfIcon />
      <span>GENERATE REPORT</span>
    </button>
  )
}

export default ReportControls