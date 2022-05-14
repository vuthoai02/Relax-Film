import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ROUTER} from '../src/utils/routers';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={ROUTER.HOME} element={<Home/>} />
    </Routes>
  </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));