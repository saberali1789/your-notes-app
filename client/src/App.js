import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import {Login} from './pages/login'
import { CompleteSignup } from './pages/completesign';
import { Signup } from './pages/signup';
import { useState } from 'react';

function App() {
const [lang, setLang] = useState(true)
const [isRtl, setIsRtl] = useState(false);

  const toggleRtl = () => {
    setIsRtl(!isRtl);
    setLang(!lang)
  };
    // <button onClick={toggleRtl}>Toggle RTL</button>
    //   <div className=></div>

  return (
    <div className={isRtl ? " App rtl-element" : " App"}>
      <Router>
        <Routes>
          <Route path="/" element={<Home lang={lang} toggleRtl={toggleRtl} />} />
          <Route path="/signup" element={<Signup lang={lang} toggleRtl={toggleRtl} />} />
          <Route path="/completesign" element={<CompleteSignup lang={lang} toggleRtl={toggleRtl} />} />
          <Route path="/login" element={<Login lang={lang} toggleRtl={toggleRtl} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
