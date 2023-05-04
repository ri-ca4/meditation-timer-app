import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';

const Meditate = () => {
  const [userInput, setUserInput] = useState();
  const [isRunning, setIsRunning] = useState(false);
  let mins = useRef(10);
  let secs = useRef(0);

  const handleInput = (e)=>{
    setUserInput(e.target.value);
  }

  const displayTime = ()=>{
    let dispMins  = document.getElementById('minutes');
    let dispSecs  = document.getElementById('seconds');

    dispMins.innerHTML = mins.current;
    if(secs.current < 10){
        dispSecs.innerHTML= '0' + secs.current;
    }else{
        dispSecs.innerHTML = secs.current;
    }
  }

  function handleSet() {
    document.getElementById('start').removeAttribute("disabled");
    document.getElementById('pause').setAttribute("disabled", "true");
    if (userInput != null) {
      mins.current = userInput;
    }else{
      mins.current = 10;
    }
    secs.current = 0;
    displayTime();

  }


  useEffect(() => {
    if(isRunning){
      const interval = setInterval(()=>{
        if (mins.current === 0 && secs.current <=0) {
          clearInterval();
          secs.current= 0;
          setIsRunning(false);
        }else{
          if(secs.current === 0){
              mins.current = mins.current-1;
              secs.current =60;
          }
          secs.current = secs.current-1 ;
          displayTime();
          }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, displayTime]);

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
    <div className='meditate'>
      <label>Minutes:</label>
        <input type="number" id="userInput" onChange={handleInput}/>
        <button id="set" onClick={handleSet}>Set Timer</button>
        <div id="meditate-timer">
            <h1>
                <span id="minutes"></span>:
                <span id="seconds"></span>
            </h1>
            <button id="start" onClick={handleStart}>Start</button>
            <button id="pause" onClick={handlePause}>Pause</button>
        </div>
    </div>
  )
}

export default Meditate
