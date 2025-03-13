import './App.css';

import React, { useState } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const apiKey = process.env.REACT_APP_API_KEY
  
  const [progress, setProgress] = useState(0)
  

  return (
    <>
      <Router>
        <Navbar/>
            <LoadingBar color="#f11946" progress={progress} height={3}/>
          <Routes>
            <Route exact path="/" element={<News apiKey={apiKey} key="home" pageSize={20} category="general" setProgress={setProgress}/>}/>
            <Route exact path="/business" element={<News apiKey={apiKey} key="business" pageSize={20} category="business" setProgress={setProgress}/>}/>
            <Route exact path="/general" element={<News apiKey={apiKey} key="general" pageSize={20} category="general" setProgress={setProgress}/>}/>
            <Route exact path="/entertainment" element={<News apiKey={apiKey} key="entertainment" pageSize={20} category="entertainment" setProgress={setProgress}/>}/>
            <Route exact path="/health" element={<News apiKey={apiKey} key="health" pageSize={20} category="health" setProgress={setProgress}/>}/>
            <Route exact path="/science" element={<News apiKey={apiKey} key="science" pageSize={20} category="science" setProgress={setProgress}/>}/>
            <Route exact path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={20} category="sports" setProgress={setProgress}/>}/>
            <Route exact path="/technology" element={<News apiKey={apiKey} key="technology" pageSize={20} category="technology" setProgress={setProgress}/>}/> 
          </Routes>
        </Router>
      </>
    )
}
