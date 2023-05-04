import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';

const Focus = () => {
  const [focus, setFocus] = useState();
  const [brek, setBrek] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [takeBreak, setTakeBreak] = useState(false);
  let mins = useRef(10);
  let secs = useRef(0);

  function displayPomodoro(){
    document.getElementById('minutes').innerHTML = mins.current;
    if(secs.current < 10){
        document.getElementById('seconds').innerHTML= '0' + secs.current;
    }else{
        document.getElementById('seconds').innerHTML = secs.current;
    }
  }

  const handleFocus = (e)=>{
    setFocus(e.target.value)
  }

  const handleBrek = (e)=>{
    setBrek(e.target.value)
  }

  const handleSet = ()=>{
      if(focus != null && brek != null){
          secs.current= 0;
          mins.current= focus;
          displayPomodoro();
      }else{
          alert('Please enter desired times');
      }
  }

  useEffect(() => {
    if(isRunning){
      const interval = setInterval(()=>{
        if (mins.current == 0 && secs.current <=0) {
          if (takeBreak){
              setTakeBreak(false);
              mins.current= focus
          }else{
              setTakeBreak(true);
              mins.current=brek;
          }
          secs.current= 0;
        }else{
          if(secs.current == 0){
              mins.current = mins.current-1;
              secs.current =60;
          }
          secs.current= secs.current-1;
          displayPomodoro();
          }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, displayPomodoro]);

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
    <div className='pomodoro'>
      <label>Focus:</label>
      <input type="number" id="focusTime" onChange={handleFocus}/><br/>
      <label>Break:</label>
      <input type="number" id="breakTime" onChange={handleBrek}/>
      <button id="setPomodoro" onClick={handleSet}>Set Timer</button>
      <div id="display-pomodoro">
          <h1 id="pomodoro-timer">
              <span id="minutes"></span>:
              <span id="seconds"></span>
          </h1>
          <button id="start" onClick={handleStart}>Start</button>
          <button id="pause" onClick={handlePause}>Pause</button>
      </div>
  </div>
  )
}

export default Focus
