import React, { useState } from "react";
import "./App.css";

function App() {
  // State variables for managing calculator state
  const [leftPanelValue, setLeftPanelValue] = useState("0");
  const [rightPanelValue, setRightPanelValue] = useState("0");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState("0");
  const [storedValue, setStoredValue] = useState(null);

  // Utility function to handle number input for either panel
  const handleNumberClick = (value, setPanelValue, panelValue) => {
    setPanelValue((prev) => {
      // If '0', replace it; otherwise append the value
      if (prev === "0") return value;
      return prev + value;
    });
  };

  // Handle decimal input with validation for single decimal per number
  const handleDecimalClick = (setPanelValue, panelValue) => {
    if (!panelValue.includes(".")) setPanelValue((prev) => prev + ".");
  };

  // Clear the display of a panel
  const handleClearClick = (setPanelValue) => {
    setPanelValue("0");
  };

  // Handle store and recall
  const handleStore = () => setStoredValue(result);
  const handleRecall = (setPanelValue) => {
    if (storedValue !== null) setPanelValue(storedValue);
  };

  // Calculation function for the result panel
  const calculateResult = () => {
    const left = parseFloat(leftPanelValue);
    const right = parseFloat(rightPanelValue);
    let calculation = 0;
    switch (operation) {
      case "+":
        calculation = left + right;
        break;
      case "-":
        calculation = left - right;
        break;
      case "*":
        calculation = left * right;
        break;
      case "÷":
        calculation = right !== 0 ? left / right : "Error";
        break;
      default:
        break;
    }
    setResult(calculation.toString());
  };

  return (
    <div className="calculator">
      {/* Left Panel */}
      <div className="panel">
        <p>{leftPanelValue}</p>
        <div className="numbers">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString(), setLeftPanelValue, leftPanelValue)}
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleDecimalClick(setLeftPanelValue, leftPanelValue)}>.</button>
          <button onClick={() => handleClearClick(setLeftPanelValue)}>Clear</button>
          <button onClick={() => handleRecall(setLeftPanelValue)}>Recall</button>
        </div>
      </div>

      {/* Operation Panel */}
      <div className="panel">
        <p>{operation}</p>
        <div className="numbers">
          {["+", "-", "*", "÷"].map((op) => (
            <button key={op} onClick={() => setOperation(op)}>
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="panel">
        <p>{rightPanelValue}</p>
        <div className="numbers">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString(), setRightPanelValue, rightPanelValue)}
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleDecimalClick(setRightPanelValue, rightPanelValue)}>.</button>
          <button onClick={() => handleClearClick(setRightPanelValue)}>Clear</button>
          <button onClick={() => handleRecall(setRightPanelValue)}>Recall</button>
        </div>
      </div>

      {/* Answer Panel */}
      <div className="panel answer">
        <p>{result}</p>
        <div>
          <button onClick={calculateResult}>=</button>
          <button onClick={handleStore}>Store</button>
        </div>
      </div>
    </div>
  );
}

export default App;
