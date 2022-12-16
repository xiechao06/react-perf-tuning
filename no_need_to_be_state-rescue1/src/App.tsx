import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";

const TemperatureContext = createContext(() => 0 as number);

function TemperatureProvider({ children }: { children: JSX.Element }) {
  const temperatureRef = useRef(0);
  useEffect(() => {
    // update temperature each 3 seconds
    const intervalId = setInterval(() => {
      temperatureRef.current = Math.round(Math.random() * 40 * 10) / 10;
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <TemperatureContext.Provider value={() => temperatureRef.current}>
      {children}
    </TemperatureContext.Provider>
  );
}

function TemperatureReporter() {
  console.log("render temperature reporter");
  const getTemperature = useContext(TemperatureContext);
  const onClick = useCallback(() => {
    window.alert("当前温度是" + getTemperature() + " ℃");
  }, []);
  return (
    <div>
      <button onClick={onClick}>Report Temperature</button>
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
