import React from 'react'

const InstructionsTab = () => {
  return (
    <div className="instructions-drawer">

      <div className="instructions-content">
        <div className="instructions-header">
          Instructions
        </div>

        <div className="instructions-body overflow-y-auto max-h-[80vh]">
          <ul>
            <li>
              <strong>STEP 1:</strong> Select a load by clicking on the <strong>'CHANGE LOAD'</strong> button.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 2:</strong> Make connections as per the instructions given below :

              <ul className="sub-list">
                <li>(a) 1 to 11</li>
                <li>(b) 2 to 12</li>
                <li>(c) 3 to 13</li>
                <li>(d) 4 to 14</li>
                <li>(e) 13 to 15</li>
                <li>(f) 16 to 17</li>
                <li>(g) 5 to 18</li>
                <li>(h) 6 to 9</li>
                <li>(i) 9 to 10</li>
                <li>(j) 8 to 19</li>
                <li>(k) 7 to 20</li>
                <li>(l) 7 to 14</li>
              </ul>
            </li>

            <li style={{ listStyle: 'none', marginLeft: '-18px', marginTop: '8px' }}>
              <div className="instructions-note">
                <span className="instructions-note-bullet">•</span>
                <p className="instructions-note-text">
                  Note: Click on the label to delete the connection for the corresponding node.
                </p>
              </div>
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 3:</strong> Then check the connections by clicking on the <strong>'CHECK'</strong> button.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 4:</strong> If the alert is <strong>'INVALID CONNECTIONS'</strong> then click on the <strong>'RESET'</strong> button and make the connections again.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 5:</strong> If the alert is <strong>'RIGHT CONNECTIONS'</strong> then follow the steps below.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 6:</strong> Turn <strong>'ON'</strong> the MCB.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 7:</strong> Power <strong>'ON'</strong> the Variac by clicking on the button.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 8:</strong> Then, Click on the Variac knob to set the voltage at 230V.
            </li>

            <li style={{ listStyle: 'none', marginLeft: '-18px', marginTop: '8px' }}>
              <div className="instructions-note">
                <span className="instructions-note-bullet">•</span>
                <p className="instructions-note-text">
                  Note: Once we have clicked on the Variac knob it is automatically set to 230V, so we don't have to set it again.
                </p>
              </div>
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 9:</strong> Then, click on the Switch to turn it <strong>'ON'</strong>.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 10:</strong> Click on the <strong>'ADD'</strong> button to add readings to the observation table.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 11:</strong> Click on the <strong>'CALCULATE'</strong> button to calculate the power factor of the Load.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 12:</strong> In the Calculations section, we have to manually find the Power Factor of the selected load by using the formulae and verify it with the help of the <strong>'VERIFY'</strong> button.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 13:</strong> Then, Select a new Load by clicking on the <strong>'CHANGE LOAD'</strong> button.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 14:</strong> Again check the connections by clicking on the <strong>'CHECK'</strong> button.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 15:</strong> Change the Load and repeat the steps from 6 to 12.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 16:</strong> Click on the <strong>'PRINT'</strong> button to take out the print of the page.
            </li>

            <li style={{ marginTop: '12px' }}>
              <strong>STEP 17:</strong> Click on the <strong>'RESET'</strong> button to reset the webpage.
            </li>

          </ul>
        </div>
      </div>

      <div className="instructions-handle">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Instructions</span>
      </div>

    </div>
  )
}

export default InstructionsTab