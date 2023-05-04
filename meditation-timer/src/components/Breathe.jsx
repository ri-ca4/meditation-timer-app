import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';

const Breathe = () => {
  const [isRunning, setIsRunning] = useState(false);
  let count = useRef(0);
  let index = useRef(0);
  const fourSquare = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];


  const displayCount = ()=>{
    document.getElementById('instructions').innerHTML = fourSquare[index.current];
    document.getElementById('count').innerHTML        = count.current;
  }

  useEffect(() => {
    if(isRunning){
      const interval = setInterval(()=>{
        if(count.current===4){
          count.current= 0
          if(index.current === fourSquare.length -1){index.current= -1}
          index.current = index.current+1
        }
      count.current = count.current+1
      displayCount()
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, displayCount]);

  const handleStart = ()=>{
    document.getElementById('start').setAttribute("disabled", "true");
    document.getElementById('pause').removeAttribute("disabled");
    setIsRunning(true);
  }

  const handlePause = ()=>{
    document.getElementById('start').removeAttribute("disabled");
    document.getElementById('pause').setAttribute("disabled", "true");
    setIsRunning(false);
  }
  


  return (
    <div className="breathe">
      <div id="display-counter">
          <h1 id="instructions"></h1>
          <h2 id="count"></h2>
      </div>
      <button id="start" onClick={handleStart}>Start</button>
      <button id="pause" onClick={handlePause}>Pause</button>
    </div>
  )
}

export default Breathe
