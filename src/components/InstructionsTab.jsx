// import React from 'react'

// const InstructionsTab = ({ isOpen, toggleOpen, currentStep }) => {
//   if (!isOpen) return null;

//   const getStepClass = (stepNum) => {
//     return currentStep === stepNum 
//       ? "bg-[#fff8dc] border-l-4 border-[#d2b48c] shadow-sm rounded-r-md px-3 py-2 transition-all duration-300 font-medium" 
//       : "px-3 py-2 border-l-4 border-transparent transition-all duration-300";
//   };

//   return (
//     <div className="action-instructions-panel">

//       <div className="action-instructions-panel__header">
//         <h3>Instructions</h3>
//         <button 
//           onClick={toggleOpen}
//           className="action-instructions-panel__close"
//           aria-label="Close instructions"
//         >
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <line x1="18" y1="6" x2="6" y2="18"></line>
//             <line x1="6" y1="6" x2="18" y2="18"></line>
//           </svg>
//         </button>
//       </div>

//       <div className="action-instructions-panel__body">
//         {/* Added inline styles to remove default bullets so our custom highlight border looks clean */}
//         <ul className="action-instructions-panel__steps" style={{ listStyleType: 'none', paddingLeft: 0 }}>
          
//           <li className={getStepClass(1)}>
//             <strong>STEP 1:</strong> Make the connections as per the instructions given below.
//             <ul className="action-instructions-panel__substeps" style={{ marginTop: '8px' }}>
//               <li>(a) 1 to 23</li>
//               <li>(b) 2 to 24</li>
//               <li>(c) 3 to 25</li>
//               <li>(d) 4 to 26</li>
//               <li>(e) 5 to 25</li>
//               <li>(f) 6 to 9</li>
//               <li>(g) 6 to 10</li>
//               <li>(h) 7 to 18</li>
//               <li>(i) 8 to 11</li>
//               <li>(j) 11 to 13</li>
//               <li>(k) 13 to 15</li>
//               <li>(l) 12 to 17</li>
//               <li>(m) 18 to 20</li>
//               <li>(n) 14 to 19</li>
//               <li>(o) 16 to 21</li>
//               <li>(p) 20 to 22</li>
//               <li>(q) 26 to 7</li>
//             </ul>
//             <div style={{ marginTop: '10px', color: '#6d3d1c', fontSize: '0.9em' }}>
//               <em>Note: Click on the label to delete the connection for the corresponding node.</em>
//             </div>
//           </li>

//           <li className={getStepClass(2)}>
//             <strong>STEP 2:</strong> Now, Check the connections by clicking on <strong>'CHECK'</strong> button.
//             <ul className="action-instructions-panel__substeps" style={{ marginTop: '8px' }}>
//               <li>(a) If the connections are <strong>'Invalid Connections'</strong> click on corresponding node to remove the connections.</li>
//               <li>(b) If the connections are <strong>'Right Connections'</strong> then follow the below steps.</li>
//             </ul>
//           </li>
          
//           <li className={getStepClass(3)}>
//             <strong>STEP 3:</strong> Turn <strong>'ON'</strong> the MCB.
//           </li>
          
//           <li className={getStepClass(4)}>
//             <strong>STEP 4:</strong> Switch on Autotransformer by clicking <strong>'ON'</strong> the button.
//           </li>
          
//           <li className={getStepClass(5)}>
//             <strong>STEP 5:</strong> Click on the Autotransformer Knob to set the voltage at <strong>'24V'</strong>.
//           </li>
          
//           <li className={getStepClass(6)}>
//             <strong>STEP 6:</strong> Now, Click on <strong>'ADD'</strong> button to add readings to the observation table.
//           </li>
          
//           <li className={getStepClass(7)}>
//             <strong>STEP 7:</strong> In Calculations section, we have to manually calculate the values by using the formula and verify it with the help of the verify button.
//           </li>

//         </ul>
//       </div>

//     </div>
//   )
// }

// export default InstructionsTab

// 2nd

import React from 'react'

const InstructionsTab = ({ isOpen, toggleOpen, currentStep }) => {
  if (!isOpen) return null;

  // Helper function to highlight the text itself and dim inactive steps
  const getStepClass = (stepNum) => {
    return currentStep === stepNum 
      ?"bg-[#fff8dc] border-l-4 border-[#d2b48c] shadow-sm rounded-r-md px-3 py-2 transition-all duration-300 font-medium text-green-800" 
      : "text-[#5c4033] opacity-60 transition-all duration-300"; // Dimmed standard brown for inactive steps
  };

  return (
    <div className="action-instructions-panel">

      <div className="action-instructions-panel__header">
        <h3>Instructions</h3>
        <button 
          onClick={toggleOpen}
          className="action-instructions-panel__close"
          aria-label="Close instructions"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="action-instructions-panel__body">
        <ul className="action-instructions-panel__steps" style={{ listStyleType: 'none', paddingLeft: 0 }}>
          
          <li className={getStepClass(1)}>
            <strong>STEP 1:</strong> Make the connections as per the instructions given below.
            <ul className="action-instructions-panel__substeps" style={{ marginTop: '8px' }}>
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
            <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
              <em>Note: Click on the label to delete the connection for the corresponding node.</em>
            </div>
          </li>

          <li className={getStepClass(2)}>
            <strong>STEP 2:</strong> Now, Check the connections by clicking on <strong>'CHECK'</strong> button.
            <ul className="action-instructions-panel__substeps" style={{ marginTop: '8px' }}>
              <li>(a) If the connections are <strong>'Invalid Connections'</strong> click on corresponding node to remove the connections.</li>
              <li>(b) If the connections are <strong>'Right Connections'</strong> then follow the below steps.</li>
            </ul>
          </li>
          
          <li className={getStepClass(3)}>
            <strong>STEP 3:</strong> Turn <strong>'ON'</strong> the MCB.
          </li>
          
          <li className={getStepClass(4)}>
            <strong>STEP 4:</strong> Switch on Autotransformer by clicking <strong>'ON'</strong> the button.
          </li>
          
          <li className={getStepClass(5)}>
            <strong>STEP 5:</strong> Click on the Autotransformer Knob to set the voltage at <strong>'24V'</strong>.
          </li>
          
          <li className={getStepClass(6)}>
            <strong>STEP 6:</strong> Now, Click on <strong>'ADD'</strong> button to add readings to the observation table.
          </li>
          
          <li className={getStepClass(7)}>
            <strong>STEP 7:</strong> In Calculations section, we have to manually calculate the values by using the formula and verify it with the help of the verify button.
          </li>

        </ul>
      </div>

    </div>
  )
}

export default InstructionsTab

//3rd

// import React, { useEffect, useRef } from 'react'

// const InstructionsTab = ({ isOpen, toggleOpen, currentStep }) => {
//   const scrollContainerRef = useRef(null);

//   // Auto-scroll logic strictly locked to the panel body
//   useEffect(() => {
//     if (isOpen && scrollContainerRef.current) {
//       const timeoutId = setTimeout(() => {
//         const activeStep = document.getElementById(`instruction-step-${currentStep}`);
//         const container = scrollContainerRef.current;

//         if (activeStep && container) {
//           // 1. Get the exact physical positions of the container and the active step
//           const containerRect = container.getBoundingClientRect();
//           const stepRect = activeStep.getBoundingClientRect();

//           // 2. Calculate the exact pixel distance needed to scroll
//           // Current Scroll + (Distance between the top of the step and the top of the container) - 20px padding
//           const targetScrollPosition = container.scrollTop + (stepRect.top - containerRect.top) - 20;

//           // 3. Command the container to scroll!
//           container.scrollTo({
//             top: targetScrollPosition,
//             behavior: 'smooth'
//           });
//         }
//       }, 100); 

//       return () => clearTimeout(timeoutId);
//     }
//   }, [currentStep, isOpen]);

//   // Helper function to highlight the text itself and dim inactive steps
//   const getStepClass = (stepNum) => {
//     return currentStep === stepNum 
//       ? "text-[#c2410c] font-bold transition-all duration-300" // Bold amber/orange text for the active step
//       : "text-[#5c4033] opacity-60 transition-all duration-300"; // Dimmed standard brown for inactive steps
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="action-instructions-panel">

//       <div className="action-instructions-panel__header">
//         <h3>Instructions</h3>
//         <button 
//           onClick={toggleOpen}
//           className="action-instructions-panel__close"
//           aria-label="Close instructions"
//         >
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <line x1="18" y1="6" x2="6" y2="18"></line>
//             <line x1="6" y1="6" x2="18" y2="18"></line>
//           </svg>
//         </button>
//       </div>

//       <div 
//         ref={scrollContainerRef}
//         className="action-instructions-panel__body overflow-y-auto relative" 
//         style={{ maxHeight: '391px' }} 
//       >
//         <ul className="action-instructions-panel__steps" style={{ listStyleType: 'none', paddingLeft: 0 }}>
          
//           <li id="instruction-step-1" className={getStepClass(1)}>
//             <strong>STEP 1:</strong> Make the connections as per the instructions given below.
//             <ul className="action-instructions-panel__substeps" style={{ marginTop: '8px' }}>
//               <li>(a) 1 to 23</li>
//               <li>(b) 2 to 24</li>
//               <li>(c) 3 to 25</li>
//               <li>(d) 4 to 26</li>
//               <li>(e) 5 to 25</li>
//               <li>(f) 6 to 9</li>
//               <li>(g) 6 to 10</li>
//               <li>(h) 7 to 18</li>
//               <li>(i) 8 to 11</li>
//               <li>(j) 11 to 13</li>
//               <li>(k) 13 to 15</li>
//               <li>(l) 12 to 17</li>
//               <li>(m) 18 to 20</li>
//               <li>(n) 14 to 19</li>
//               <li>(o) 16 to 21</li>
//               <li>(p) 20 to 22</li>
//               <li>(q) 26 to 7</li>
//             </ul>
//             <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
//               <em>Note: Click on the label to delete the connection for the corresponding node.</em>
//             </div>
//           </li>

//           <li id="instruction-step-2" className={getStepClass(2)}>
//             <strong>STEP 2:</strong> Now, Check the connections by clicking on <strong>'CHECK'</strong> button.
//             <ul className="action-instructions-panel__substeps" style={{ marginTop: '8px' }}>
//               <li>(a) If the connections are <strong>'Invalid Connections'</strong> click on corresponding node to remove the connections.</li>
//               <li>(b) If the connections are <strong>'Right Connections'</strong> then follow the below steps.</li>
//             </ul>
//           </li>
          
//           <li id="instruction-step-3" className={getStepClass(3)}>
//             <strong>STEP 3:</strong> Turn <strong>'ON'</strong> the MCB.
//           </li>
          
//           <li id="instruction-step-4" className={getStepClass(4)}>
//             <strong>STEP 4:</strong> Switch on Autotransformer by clicking <strong>'ON'</strong> the button.
//           </li>
          
//           <li id="instruction-step-5" className={getStepClass(5)}>
//             <strong>STEP 5:</strong> Click on the Autotransformer Knob to set the voltage at <strong>'24V'</strong>.
//           </li>
          
//           <li id="instruction-step-6" className={getStepClass(6)}>
//             <strong>STEP 6:</strong> Now, Click on <strong>'ADD'</strong> button to add readings to the observation table.
//           </li>
          
//           <li id="instruction-step-7" className={getStepClass(7)}>
//             <strong>STEP 7:</strong> In Calculations section, we have to manually calculate the values by using the formula and verify it with the help of the verify button.
//           </li>

//         </ul>
//       </div>

//     </div>
//   )
// }

// export default InstructionsTab


//4th
// import React, { useRef, useEffect } from 'react'

// const InstructionsTab = ({ isOpen, toggleOpen, currentStep }) => {
//   const activeStepRef = useRef(null);

//   // Autoscroll effect: triggers whenever the tab is opened or the step changes
//   useEffect(() => {
//     if (isOpen && activeStepRef.current) {
//       activeStepRef.current.scrollIntoView({
//         behavior: 'smooth',
//         block: 'nearest', // Scrolls just enough to bring the item into the visible area
//       });
//     }
//   }, [isOpen, currentStep]);

//   if (!isOpen) return null;

//   const getStepClass = (stepNum) => {
//     return currentStep === stepNum 
//       ? "bg-[#fff8dc] border-l-4 border-[#d2b48c] shadow-sm rounded-r-md px-3 py-2 transition-all duration-300 font-medium text-blue-800" 
//       : "px-3 py-2 border-l-4 border-transparent transition-all duration-300";
//   };

//   // Helper function to attach the ref ONLY to the active step
//   const setRefIfActive = (stepNum) => {
//     return currentStep === stepNum ? activeStepRef : null;
//   };

//   return (
//     <div className="action-instructions-panel">

//       <div className="action-instructions-panel__header">
//         <h3>Instructions</h3>
//         <button 
//           onClick={toggleOpen}
//           className="action-instructions-panel__close"
//           aria-label="Close instructions"
//         >
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <line x1="18" y1="6" x2="6" y2="18"></line>
//             <line x1="6" y1="6" x2="18" y2="18"></line>
//           </svg>
//         </button>
//       </div>

//       <div className="action-instructions-panel__body">
//         <ul className="action-instructions-panel__steps" style={{ listStyleType: 'none', paddingLeft: 0 }}>
          
//           <li className={getStepClass(1)} ref={setRefIfActive(1)}>
//             <strong>STEP 1:</strong> Make the connections as per the instructions given below.
//             <ul className="action-instructions-panel__substeps" style={{ marginTop: '8px' }}>
//               <li>(a) 1 to 23</li>
//               <li>(b) 2 to 24</li>
//               <li>(c) 3 to 25</li>
//               <li>(d) 4 to 26</li>
//               <li>(e) 5 to 25</li>
//               <li>(f) 6 to 9</li>
//               <li>(g) 6 to 10</li>
//               <li>(h) 7 to 18</li>
//               <li>(i) 8 to 11</li>
//               <li>(j) 11 to 13</li>
//               <li>(k) 13 to 15</li>
//               <li>(l) 12 to 17</li>
//               <li>(m) 18 to 20</li>
//               <li>(n) 14 to 19</li>
//               <li>(o) 16 to 21</li>
//               <li>(p) 20 to 22</li>
//               <li>(q) 26 to 7</li>
//             </ul>
//             <div style={{ marginTop: '10px', color: '#6d3d1c', fontSize: '0.9em' }}>
//               <em>Note: Click on the label to delete the connection for the corresponding node.</em>
//             </div>
//           </li>

//           <li className={getStepClass(2)} ref={setRefIfActive(2)}>
//             <strong>STEP 2:</strong> Now, Check the connections by clicking on <strong>'CHECK'</strong> button.
//             <ul className="action-instructions-panel__substeps" style={{ marginTop: '8px' }}>
//               <li>(a) If the connections are <strong>'Invalid Connections'</strong> click on corresponding node to remove the connections.</li>
//               <li>(b) If the connections are <strong>'Right Connections'</strong> then follow the below steps.</li>
//             </ul>
//           </li>
          
//           <li className={getStepClass(3)} ref={setRefIfActive(3)}>
//             <strong>STEP 3:</strong> Turn <strong>'ON'</strong> the MCB.
//           </li>
          
//           <li className={getStepClass(4)} ref={setRefIfActive(4)}>
//             <strong>STEP 4:</strong> Switch on Autotransformer by clicking <strong>'ON'</strong> the button.
//           </li>
          
//           <li className={getStepClass(5)} ref={setRefIfActive(5)}>
//             <strong>STEP 5:</strong> Click on the Autotransformer Knob to set the voltage at <strong>'24V'</strong>.
//           </li>
          
//           <li className={getStepClass(6)} ref={setRefIfActive(6)}>
//             <strong>STEP 6:</strong> Now, Click on <strong>'ADD'</strong> button to add readings to the observation table.
//           </li>
          
//           <li className={getStepClass(7)} ref={setRefIfActive(7)}>
//             <strong>STEP 7:</strong> In Calculations section, we have to manually calculate the values by using the formula and verify it with the help of the verify button.
//           </li>

//         </ul>
//       </div>

//     </div>
//   )
// }

// export default InstructionsTab