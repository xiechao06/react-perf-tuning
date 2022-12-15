import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./App.css";

const TemperatureContext = createContext(0);

function TemperatureProvider({ children }: { children: JSX.Element }) {
  const [temperature, setTemperature] = useState(32);
  useEffect(() => {
    // update temperature each 3 seconds
    const intervalId = setInterval(() => {
      setTemperature(Math.round(Math.random() * 40 * 10) / 10);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <TemperatureContext.Provider value={temperature}>
      {children}
    </TemperatureContext.Provider>
  );
}

function useRenderCount() {
  const renderCountRef = useRef(0);
  useEffect(() => {
    ++renderCountRef.current;
  });
  return renderCountRef.current;
}

function TemperatureReporter() {
  const temperature = useContext(TemperatureContext);
  return (
    <div>
      <p>Render count: {useRenderCount()}</p>
      <button
        onClick={() => {
          window.alert("Temperature is " + temperature + " ℃");
        }}
      >
        Report Temperature
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TemperatureProvider>
        <TemperatureReporter />
      </TemperatureProvider>
    </div>
  );
}

export default App;
