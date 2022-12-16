import { createContext, memo, useContext, useMemo, useState } from "react";

type CountContextType = {
  count: number;
  updateCount(fn: (arg: number) => number): void;
};

const CountContext = createContext({} as CountContextType);

function CountProvider({ children }: { children: JSX.Element }) {
  const [count, updateCount] = useState(0);
  const value = useMemo(
    () => ({
      count,
      updateCount,
    }),
    [count, updateCount]
  );
  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

const Count = memo(function Count() {
  console.log("render count");
  const { count: count } = useContext(CountContext);
  return <div>Count: {count}</div>;
});

const IncCountButton = memo(function IncCountButton() {
  console.log("render inc count button");
  const { updateCount } = useContext(CountContext);
  return (
    <button
      onClick={() => {
        updateCount((prev) => prev + 1);
      }}
    >
      +count
    </button>
  );
});

function App() {
  return (
    <div>
      <CountProvider>
        <>
          <Count />
          <IncCountButton />
        </>
      </CountProvider>
    </div>
  );
}

export default App;
