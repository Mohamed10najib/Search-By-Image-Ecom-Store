import logo from './logo.svg';
import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './myproduct';
import CradFlip from './flipCard';
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

function App(props) {
  const [subcategories, setSubcategories] = useState([]);
  const [search, setsearch] = useState(false);
  const [fetchs, setfetch] = useState(false);
  const [fetchs1, setfetch1] = useState(false);
  const [type, setType] = useState("All");
  const [Allsubcategories, AllsetSubcategories] = useState(subcategories);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [btn, setbtn] = useState(true);
  const handleFileChange = (e) => {
    

    if (e.target.files[0]) {
      // Check the file type
      if (e.target.files[0].type.startsWith('image/')) {
        // Valid image file
        setFile(e.target.files[0]);
      } else {
        // Invalid file type, display an error message or handle accordingly
        alert('Please select an image file (e.g., JPEG, PNG)');
      }
    }
  
    
  };
  
useEffect(() => {
  
  if (file) {
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  }
}, [file]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
   
    setImagePreview(null)
    setFile(null)
    try {
      setSubcategories([])
      const response = await fetch('http://localhost:5000/sendImage', {
        method: 'POST',
        body: formData,
      }
      
      );
      const data = await response.json();
      console.log(data.subcategories)
      setSubcategories(data.subcategories)
      AllsetSubcategories(data.subcategories)
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setfetch1(true)
  };

  
  const [count, setcount] = useState(3);
  const [linkt, setlink] = useState(props.lien);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(props.lien); 
        const data = await response.json();
        setSubcategories(data.subcategories)
        AllsetSubcategories(data.subcategories)
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.lien,btn,search]);
  return (
    <div className="App">
     <header className='header0'>
      <div className='header1'><p>YourEcomWebsite</p></div>
      <div className='header2'></div>
     </header>
     <div className='bar'></div>
     <div className='categories'><div><ul><li ><Link onClick={() => setbtn(!btn)}  className= {`links ${props.nombre === "1" ? "active" : ""}`} to="/" >Home</Link></li><li><Link onClick={() => {setbtn(!btn);}} className= {`links ${props.nombre === "2" ? "active" : ""}`} to="/Topwear">Topwear</Link></li><li><Link onClick={() => setbtn(!btn)} to="/Bottomwear" className= {`links ${props.nombre === "3" ? "active" : ""}`}>Bottomwear</Link></li><li><Link onClick={() => setbtn(!btn)}  to="/Dress" className= {`links ${props.nombre === "4" ? "active" : ""}`}>Dress</Link></li><li><Link onClick={() => setbtn(!btn)}  to="/Innerwear" className= {`links ${props.nombre === "5" ? "active" : ""}`}>Innerwear</Link></li><li><Link onClick={() => setbtn(!btn)} to="/Socks" className= {`links ${props.nombre === "6" ? "active" : ""}`}>Socks</Link></li><li><Link onClick={() => setbtn(!btn)} to="/Shoes" className= {`links ${props.nombre === "7" ? "active" : ""}`}>Shoes</Link></li><li> <Link onClick={() => setbtn(!btn)} to="/Sandal" className= {`links ${props.nombre === "8" ? "active" : ""}`}>Sandal</Link></li><li><Link onClick={() => setbtn(!btn)} to="/Flip" className= {`links ${props.nombre === "9" ? "active" : ""}`}>Flip Flops</Link></li><li><Link onClick={() => setbtn(!btn)} to="/Apparel" className= {`links ${props.nombre === "10" ? "active" : ""}`}>Apparel Set</Link></li></ul></div></div>
     <div className='bar2'></div>
     <div className='continer'><div className='products'>
     <form onSubmit={handleSubmit}><div className='continerBarsearch'><div className='Barsearch'><input id='imginput' className='inputsearchimg' type='file' onChange={handleFileChange}></input><label className='labelimg'  htmlFor='imginput' >By Image</label><input className='inputsearch'></input><button onClick={()=>{setsearch(true)}} type="submit" className='btnsearch'>Search</button></div></div>
     {imagePreview&&<div className='image' ><div><label htmlFor='imginput' style={{ width: '350px' ,height: '190px',display :'block' }}><img style={{ width: '350px',height: '190px' }}  src={imagePreview} alt="Preview" ></img></label> <p style={{textAlign:'center'}}>{file.name.length>50?(`${file.name.slice(0, 50)}...`):(file.name)}</p>  </div></div>} </form>
     <div className='continerfilter'>
     <button
  className={type === "All" ? "activetype" : ""}
  onClick={() => {
    setSubcategories(Allsubcategories);
    setType("All");
  }}
>
 All
</button>
      <button  className={type==="Girls"?"activetype":"" } onClick={() =>{ setSubcategories(Allsubcategories.filter(item => item["Gender"] === "Girls"));
    setType("Girls");
    }}>
 Girls
</button>
<button className={type==="Boys"?"activetype":"" }  onClick={() => {setSubcategories(Allsubcategories.filter(item => item["Gender"] === "Boys"));
setType("Boys");
}}>
Boys
</button>
<button className={type==="Men"?"activetype":"" } onClick={() => {setSubcategories(Allsubcategories.filter(item => item["Gender"] === "Men"));
setType("Men");
}}>
Men
</button>
<button className={type==="Women"?"activetype":"" }  onClick={() => {setSubcategories(Allsubcategories.filter(item => item["Gender"] === "Women"));
setType("Women");
}}>
Women
</button>
{search&&(<div><button onClick={()=>{setsearch(false);setfetch(!fetchs);setfetch1(false);setSubcategories(subcategories)}}>search end</button></div>)}
</div>
      <div className='listproducts'>  <Container className='listproductsintern' style={{  marginTop :'25px'}}>
    
      {subcategories.length != 0?(subcategories.map((product, index) => (
   index % 3 === 0 ? (
    <Row key={index}>
      <Col>
        <Product SubCategory={subcategories[index]["SubCategory"]} 
                 titre={subcategories[index]["ProductTitle"]} genre={subcategories[index]["Gender"]} ProductId={subcategories[index]["ProductId"]} Category={subcategories[index]["Category"]}/>
      </Col>
      <Col>
        {subcategories[index + 1] && (
          <Product titre={subcategories[index + 1]["ProductTitle"]} SubCategory={subcategories[index+1]["SubCategory"]} genre={subcategories[index+1]["Gender"]} ProductId={subcategories[index+1]["ProductId"]} Category={subcategories[index+1]["Category"]}  />
        )}
      </Col>
      <Col>
        {subcategories[index + 2] && (
          <Product titre={subcategories[index + 2]["ProductTitle"]} SubCategory={subcategories[index+2]["SubCategory"]} genre={subcategories[index+2]["Gender"]} ProductId={subcategories[index+2]["ProductId"]} Category={subcategories[index+2]["Category"]}/>
        )}
      </Col>
    </Row>
  ) : null
))):fetchs1?(<p style={{textAlign:"center"}}>Sorry, the product you're looking for is not available.</p>): <div style={{textAlign:"center"}}><Spinner animation="border" role="status">
<span className="visually-hidden">Loading...</span>
</Spinner></div> }

    </Container></div>
      
      </div> </div>
    </div>
  );
}

export default App;
