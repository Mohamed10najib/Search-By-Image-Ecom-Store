import logo from './logo.svg';
import './App.css';
import React from 'react';
import IMAGE from "./product.jpg"
import "./flip.css"
import Product from './myproduct';
function CradFlip(props) {
  return (
    <div className="App">
    <div class="flip-card">
  <div class="flip-card-inner">

    <div class="flip-card-front">
      <div class="card shadow-sm">
        <div class="card-flip-front">
            <Product titre = {props.titre}/>
        </div>
      </div>
    </div>

    <div class="flip-card-back">
      
        <img className='IMAGEBACK' style={{height :"100%",width:"100%"}} src={IMAGE}></img>
<button className='btndes'> View details</button>
    </div>

  </div> 
</div>

    </div>
  );
}

export default CradFlip;