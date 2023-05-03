import './App.css';
import Breathe from './components/Breathe'
import Meditate from './components/Meditate'
import Focus from './components/Focus'
import { useState } from 'react';

function App() {
  const [showMeditate, setShowMeditate] = useState(false);
  const [showBreathe, setShowBreathe] = useState(false);
  const [showFocus, setShowFocus] = useState(false);

  const handleMedClick = ()=>{
    setShowMeditate(true);
    setShowBreathe(false);
    setShowFocus(false);
  }

  const handleBreClick = ()=>{
    setShowMeditate(false);
    setShowBreathe(true);
    setShowFocus(false);
  }

  const handleFocClick = ()=>{
    setShowMeditate(false);
    setShowBreathe(false);
    setShowFocus(true);
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li onClick={handleMedClick}>Meditate</li>
          <li onClick={handleBreClick}>Breathe</li>
          <li onClick={handleFocClick}>Focus</li>
        </ul>
      </nav>
      <div className='timer'>
        {showMeditate && <Meditate />}
        {showBreathe && <Breathe />}
        {showFocus && <Focus />}
      </div>
    </div>
  );
}

export default App;
