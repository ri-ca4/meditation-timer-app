import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import bell from './../assets/bell.mp3'


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
          new Audio(bell).play()
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
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "block";
    setIsRunning(true);
  }

  const handlePause = ()=>{
    document.getElementById('pause').style.display = "none";
    document.getElementById('start').style.display = "block";
    setIsRunning(false);
  }
  


  return (
    <div className="breathe">
      <div id="display-counter">
          <h1 id="instructions">Square Breathing is a paced breathing technique.</h1>
          <h2 id="count">It can help to reduce stress!</h2>
      </div>
      <div id="breathe-buttons">
        <button id="start" onClick={handleStart}>Start</button>
        <button id="pause" onClick={handlePause}>Pause</button>
      </div>
    </div>
  )
}

export default Breathe
