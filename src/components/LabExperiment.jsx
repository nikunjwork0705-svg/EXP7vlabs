import React, { useState } from 'react';
import CalculationsBoard from './CalculationsBoard';
import Resistor from './Resistor';

const LabExperiment = () => {
  // --- 1. Core State (The Bridge) ---
  // This tracks whether the user has successfully calculated 'R'
  const [isRCorrect, setIsRCorrect] = useState(false);

  console.log("LabExperiment State -> isRCorrect:", isRCorrect);


  // --- 2. Environment Variables ---
  // These are required by CalculationsBoard to pass the safety checks
  const [isCircuitVerified, setIsCircuitVerified] = useState(true); // Defaulted to true assuming circuit is connected
  const [mcbOn, setMcbOn] = useState(false);
  const [variacOn, setVariacOn] = useState(false);
  const [voltage, setVoltage] = useState(0);
  const [observations, setObservations] = useState([]);

  // --- 3. Handlers ---
  const handleWrongAttempt = () => {
    alert("Some calculations are incorrect. Please check the fields highlighted in red and try again.");
  };

  // Helper to add a mock observation so the board's safety check passes
  const handleAddObservation = () => {
    setObservations((prev) => [...prev, { v: 24, i: 0.24 }]);
    alert("Reading added to Observation Table!");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">RLC Circuit Laboratory</h1>
        <p className="text-gray-600 mt-2">
          Set the voltage to 24V, add a reading to the observation table, and complete your theoretical calculations to reveal the actual resistor.
        </p>
      </header>

      {/* Control Panel: Mocking the rest of the lab environment */}
      <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold">MCB:</span>
          <button 
            className={`px-4 py-2 rounded font-bold transition-colors ${mcbOn ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMcbOn(!mcbOn)}
          >
            {mcbOn ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Variac:</span>
          <button 
            className={`px-4 py-2 rounded font-bold transition-colors ${variacOn ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setVariacOn(!variacOn)}
          >
            {variacOn ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold" htmlFor="voltage-input">Variac Voltage:</label>
          <input 
            id="voltage-input"
            type="number" 
            value={voltage} 
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="border-2 border-gray-300 p-2 rounded w-24 focus:border-blue-500 outline-none"
          />
          <span className="font-bold text-gray-500">V</span>
        </div>

        <button 
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors ml-auto"
          onClick={handleAddObservation}
        >
          + Add Observation
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Equipment Visuals */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-6 w-full border-b pb-2">Equipment View</h2>
          
          <div className="w-72 h-72 border-4 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center relative bg-gray-50">
            {/* Passing the boolean down to the Resistor. 
              When isRCorrect becomes true, the Resistor updates its image.
            */}
            <Resistor 
              isVerified={isCircuitVerified}
              mcbOn={mcbOn}
              variacOn={variacOn}
              voltage={voltage}
              isRVerified={isRCorrect} 
            />
          </div>

          <div className="h-12 mt-6">
            {isRCorrect ? (
              <p className="text-green-600 font-bold text-lg px-4 py-2 bg-green-50 rounded-full border border-green-200">
                ✓ Resistor Identity Revealed!
              </p>
            ) : (
              <p className="text-gray-400 italic text-sm">
                Awaiting correct calculation of R...
              </p>
            )}
          </div>
        </section>

        {/* Right Column: Calculations Board */}
        <section>
          
          <CalculationsBoard 
            isVerified={isCircuitVerified}
            powerOn={mcbOn}
            switchOn={variacOn}
            voltage={voltage}
            observations={observations}
            onWrongAttempt={handleWrongAttempt}
            onRVerified={(status) => setIsRCorrect(status)} 
          />
        </section>

      </div>
    </main>
  );
};

export default LabExperiment;