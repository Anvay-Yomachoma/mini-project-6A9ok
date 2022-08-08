import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer'
import './stylesheet.css'
import Main from './Components/Main';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main></Main>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  )
}

export default App;
