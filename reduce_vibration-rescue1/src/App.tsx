import { useEffect } from "react";
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import "./App.css";

interface TemperatureStore {
  temperature: number;
  inc(): void;
}

const useTemperatureStore = create(
  immer<TemperatureStore>((set) => ({
    temperature: 0,
    inc() {
      set((state: TemperatureStore) => {
        state.temperature = (state.temperature + 1) % 100;
      });
    },
  }))
);

/**
 * 当温度低于15度时，进行报警, 显示红色
 */
function LowTemperatureDetector() {
  const lowTemperature = useTemperatureStore((state) => state.temperature < 15);
  console.log(
    `render low temperature detector, temperature is ${lowTemperature}`
  );
  return (
    <div style={{ display: "flex" }}>
      <div>低温警告({"<15℃"}):</div>
      <div
        style={{
          marginLeft: 20,
          width: 20,
          height: 20,
          borderRadius: 20,
          backgroundColor: lowTemperature ? "red" : "green",
        }}
      />
    </div>
  );
}

function Temperature() {
  const temperature = useTemperatureStore((state) => state.temperature);
  return <div>当前温度: {temperature}℃</div>;
}

function App() {
  const inc = useTemperatureStore((state) => state.inc);
  useEffect(() => {
    const intervalId = setInterval(() => {
      inc();
    }, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="App">
      <Temperature />
      <LowTemperatureDetector />
    </div>
  );
}

export default App;
