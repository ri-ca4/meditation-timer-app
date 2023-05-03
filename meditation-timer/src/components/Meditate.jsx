import React from 'react'
import { useState } from 'react';

const Meditate = () => {
  const [userInput, setUserInput] = useState();
  let mins = 10;
  let secs = 0;

  const handleInput = (e)=>{
    setUserInput(e.target.value);
  }

  function displayTime(){
    let dispMins  = document.getElementById('minutes');
    let dispSecs  = document.getElementById('seconds');

    dispMins.innerHTML = mins;
    if(secs < 10){
        dispSecs.innerHTML= '0' + secs;
    }else{
        dispSecs.innerHTML = secs;
    }
  }

  const handleSet = ()=>{
    if(userInput != null){
      mins = userInput;
    }
    secs = 0;
    displayTime();
  }
  


  return (
    <div className='meditate'>
      <label>Minutes:</label>
        <input type="number" id="userInput" value={userInput} onChange={handleInput}/>
        <button id="set" onClick={handleSet}>Set Timer</button>
        <div id="meditate-timer">
            <h1>
                <span id="minutes"></span>:
                <span id="seconds"></span>
            </h1>
            <button id="start">Start</button>
            <button id="pause">Pause</button>
        </div>
    </div>
  )
}

export default Meditate
