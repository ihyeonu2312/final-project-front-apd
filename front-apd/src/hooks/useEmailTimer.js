import { useState, useEffect } from "react";

const useEmailTimer = (initialTime = 180) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(true);
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
  };

  return { timeLeft, startTimer, resetTimer, isActive };
};

export default useEmailTimer;
