import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = (nextMode, replace = false) => {
    if (replace) {
      // Replaces 1 element at the last index -1
      history.splice(history.length - 1, 1)
      setHistory([...history, nextMode])
    }
    setHistory([...history, nextMode])
    return setMode(nextMode)
  }

  const back = () => {
    if (history.length <= 1) {
      return setMode(history[0])
    } else {
      // Replaces 1 element at the last index -1
      history.splice(history.length - 1, 1)
      return setMode(history[history.length - 1])
    }
  }
  return { mode, transition, back };
}
