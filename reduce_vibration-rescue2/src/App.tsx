/**
 * 这里使用的减少渲染的技巧， 我认为是最优雅的实现
 */
import { useEffect } from "react";
import { create } from "zustand";
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
function LowTemperatureDetector({
  isTemperatureTooLow,
}: {
  isTemperatureTooLow: boolean;
}) {
  console.log(
    `render low temperature detector, is temperature is too low? ${isTemperatureTooLow}`
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
          backgroundColor: isTemperatureTooLow ? "red" : "green",
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
  const isTemperatureTooLow = useTemperatureStore(
    (state) => state.temperature < 15
  );
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
      <LowTemperatureDetector isTemperatureTooLow={isTemperatureTooLow} />
    </div>
  );
}

export default App;
