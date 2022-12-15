import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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

function TemperatureReporter() {
  const temperature = useContext(TemperatureContext);
  const onClick = useCallback(() => {
    window.alert("当前温度是" + temperature + " ℃");
  }, [temperature]);
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
