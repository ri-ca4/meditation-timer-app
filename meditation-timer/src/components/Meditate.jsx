import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import bell from './../assets/bell.mp3'

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
    if (userInput != null) {
      mins.current = userInput;
    }else{
      mins.current = 10;
    }
    secs.current = 0;
    displayTime();
    document.getElementById('meditate-buttons').style.visibility = "visible";
  }


  useEffect(() => {
    if(isRunning){
      const interval = setInterval(()=>{
        if (mins.current === 0 && secs.current <=0) {
          new Audio(bell).play()
          clearInterval();
          secs.current= 0;
          setIsRunning(false);
          document.getElementById('pause').style.display = "none";
          document.getElementById('start').style.display = "block";
          document.getElementById('meditate-buttons').style.visibility = "hidden";
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
    <div className='meditate'>
      <div id="meditate-input">
        <input type="number" id="userInput" placeholder="10" onChange={handleInput}/>
        <label>min</label><br/>
        <button id="set" onClick={handleSet}>Set Timer</button>
      </div>
        <div id="meditate-timer">
          <h1><span id="minutes"></span>:
            <span id="seconds"></span></h1>
        </div>
        <div id='meditate-buttons'>
            <button id="start" onClick={handleStart}>Start</button>
            <button id="pause" onClick={handlePause}>Pause</button>
        </div>
    </div>
  )
}

export default Meditate
