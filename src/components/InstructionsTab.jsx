import React from 'react'

const InstructionsTab = ({ isOpen, toggleOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="instructions-overlay">

      <div className="instructions-header">
        Instructions
        <button 
          onClick={toggleOpen}
          className="instructions-close"
          aria-label="Close instructions"
        >
          &times;
        </button>
      </div>

      <div className="instructions-body">
        <ul className="instructions-list">
          <li><span className="instructions-note-bullet">•</span> <nbsp></nbsp><strong>STEP 1:</strong> Make the connections as per the instructions given below.</li>

          <li className="instructions-step">
            <ul className="instructions-sub-list">
              <li>(a) 1 to 23</li>
              <li>(b) 2 to 24</li>
              <li>(c) 3 to 25</li>
              <li>(d) 4 to 26</li>
              <li>(e) 5 to 25</li>
              <li>(f) 6 to 9</li>
              <li>(g) 6 to 10</li>
              <li>(h) 7 to 18</li>
              <li>(i) 8 to 11</li>
              <li>(j) 11 to 13</li>
              <li>(k) 13 to 15</li>
              <li>(l) 12 to 17</li>
              <li>(m) 18 to 20</li>
              <li>(n) 14 to 19</li>
              <li>(o) 16 to 21</li>
              <li>(p) 20 to 22</li>
              <li>(q) 26 to 7</li>
            </ul>
          </li>

          <li className="instructions-step">
            <div className="instructions-note">
              <p className="instructions-note-text">
                Note: Click on the label to delete the connection for the corresponding node.
              </p>
            </div>
          </li>

          <li className="instructions-step"><span className="instructions-note-bullet">•</span> <nbsp></nbsp><strong>STEP 2:</strong> Now, Check the connections by clicking on <strong>'CHECK'</strong> button.</li>
          
          <li className="instructions-step">
            <ul className="instructions-sub-list">
              <li>(a) If the conncetions are <strong>'Invalid Connections'</strong>click on corresponding node to remove the connections.</li>
              <li>(b) If the connections are <strong>'Right Connections'</strong> then follow the below steps.</li>
            </ul>
          </li>
          <li className="instructions-step"><span className="instructions-note-bullet">•</span> <nbsp></nbsp><strong>STEP 3:</strong> Turn <strong>'ON'</strong> the MCB.</li>
          <li className="instructions-step"><span className="instructions-note-bullet">•</span> <nbsp></nbsp><strong>STEP 4:</strong> Switch on Variac by clicking <strong>'ON'</strong>  the button.</li>
          <li className="instructions-step"><span className="instructions-note-bullet">•</span> <nbsp></nbsp><strong>STEP 5:</strong> Click on the Variac Knob to set the voltage at <strong>'220V'</strong>.</li>
          <li className="instructions-step"><span className="instructions-note-bullet">•</span><nbsp></nbsp><strong>STEP 6:</strong> Now, Click on <strong>'ADD'</strong> button to add readings to the observation table.</li>
          <li className="instructions-step"><span className="instructions-note-bullet">•</span> <nbsp></nbsp><strong>STEP 7:</strong> In Calculations section, we have to manually calculate the values by using the formula and verify it with the help of the <strong></strong> </li>

        </ul>
      </div>

    </div>
  )
}

export default InstructionsTab