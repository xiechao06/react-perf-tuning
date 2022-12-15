import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";

const TemperatureContext = createContext(0);

// 提供一个温度状态， 该状态反复从0到100变化
function TemperatureProvider({ children }: { children: JSX.Element }) {
  const [temperature, setTemperature] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTemperature((t) => (t + 1) % 100);
    }, 300);

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

/**
 * 当温度低于15度时，进行报警, 显示红色
 */
function LowTemperatureDetector() {
  const temperature = useContext(TemperatureContext);
  return (
    <div style={{ display: "flex" }}>
      <div>低温警告({"<15℃"}):</div>
      <div
        style={{
          marginLeft: 20,
          width: 20,
          height: 20,
          borderRadius: 20,
          backgroundColor: temperature < 15 ? "red" : "green",
        }}
      />
    </div>
  );
}

function Temperature() {
  const temperature = useContext(TemperatureContext);
  return <div>当前温度: {temperature}℃</div>;
}

function App() {
  return (
    <div className="App">
      <TemperatureProvider>
        <>
          <Temperature />
          <LowTemperatureDetector />
        </>
      </TemperatureProvider>
    </div>
  );
}

export default App;
