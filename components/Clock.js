import { useEffect, useState } from "react";
//component that shows the clock in upper right corner
function Clock() {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const timeObj = new Date();

      setTime(timeObj.toLocaleTimeString());
    }, 1000);
  }, []);

  return <div>{time}</div>;
}

export default Clock;
