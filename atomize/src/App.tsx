import { createContext, useContext, useMemo, useState } from "react";
import "./App.css";

type CountsContextType = {
  count1: number;
  count2: number;
  updateCount1(arg: number): void;
  updateCount2(arg: number): void;
};

const CountsContext = createContext({} as CountsContextType);

function CountsProvider({ children }: { children: JSX.Element }) {
  const [count1, updateCount1] = useState(0);
  const [count2, updateCount2] = useState(0);
  const value = useMemo(
    () => ({
      count1,
      count2,
      updateCount1,
      updateCount2,
    }),
    [count1, updateCount1, count2, updateCount2]
  );
  return (
    <CountsContext.Provider value={value}>{children}</CountsContext.Provider>
  );
}

function Count1() {
  console.log("render count1");
  const { count1, updateCount1 } = useContext(CountsContext);
  return (
    <div>
      Count1: {count1}
      <button
        onClick={() => {
          updateCount1(count1 + 1);
        }}
      >
        +count1
      </button>
    </div>
  );
}

function Count2() {
  console.log("render count2");
  const { count2, updateCount2 } = useContext(CountsContext);
  return (
    <div>
      Count2: {count2}
      <button
        onClick={() => {
          updateCount2(count2 + 1);
        }}
      >
        +count2
      </button>
    </div>
  );
}

function App() {
  const [counts, setCounts] = useState();

  return (
    <div className="App">
      <CountsProvider>
        <>
          <Count1 />
          <Count2 />
        </>
      </CountsProvider>
    </div>
  );
}

export default App;
