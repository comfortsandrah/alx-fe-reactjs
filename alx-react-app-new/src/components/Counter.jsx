import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ marginBottom: "10px" }}>
      <p>Current Count :{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
