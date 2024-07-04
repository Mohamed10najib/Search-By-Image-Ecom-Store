import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import from react-router-dom


import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App lien="http://localhost:5000/" nombre="1"/>} />
        <Route path="/Topwear" element={<App lien="http://localhost:5000/Topwear" nombre="2"/>} />
        <Route path="/Bottomwear" element={<App lien="http://localhost:5000/Bottomwear" nombre="3"/>} />
        <Route path="/Dress" element={<App lien="http://localhost:5000/Dress" nombre="4"/>} />
        <Route path="/Innerwear" element={<App lien="http://localhost:5000/Innerwear" nombre="5"/>} />
        <Route path="/Socks" element={<App lien="http://localhost:5000/Socks" nombre="6"/>} />
        <Route path="/Shoes" element={<App lien="http://localhost:5000/Shoes" nombre="7"/>} />
        <Route path="/Sandal" element={<App lien="http://localhost:5000/Sandal" nombre="8"/>} />
        <Route path="/Flip" element={<App lien="http://localhost:5000/Flip" nombre="9"/>} />
        <Route path="/Apparel" element={<App lien="http://localhost:5000/Apparel" nombre="10"/>} />
       
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
