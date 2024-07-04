import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { Component } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
  } from "mdb-react-ui-kit";
import myimg from "./product.jpg"
import "./product.css"
function Product(props) {
    const truncatedTitle = props.titre.length > 25
    ? `${props.titre.substring(0, 25)}...`
    : props.titre;
    const determineBadgeColor = () => {
       
        if (props.genre === 'Women' || props.genre === 'Girls') {
          return 'womencolor'; 
        } else {
          return 'bg-primary'; 
        }
      };
  return (
    
    <MDBCard className='cardproduct'>
    <MDBRipple
      rippleColor="light"
      rippleTag="div"
      className="bg-image rounded "
    >
 <MDBCardImage
  src={`./${props.Category}/${props.genre}/Images/images_with_product_ids/${props.ProductId}.jpg`}
  fluid
  className="w-100"
/>
    
        <div className="mask">
          <div className="d-flex justify-content-start align-items-end h-100">
            <h5>
              <span className={`badge ${determineBadgeColor()} ms-2`}>{props.genre}</span>
            </h5>
          </div>
        </div>
        <div className="hover-overlay">
          <div
            className="mask"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
          ></div>
        </div>
     
    </MDBRipple>
    <MDBCardBody>
      <a href="#!" className="text-reset">
        <h5 title={props.titre} className="card-title mb-3">{truncatedTitle}</h5>
      </a>
      <a href="#!" className="text-reset">
        <p >{props.SubCategory}</p>
      </a>
      <h6 className="mb-3">$61.99</h6>
    </MDBCardBody>
  </MDBCard>

  );
}

export default Product;