import React , {useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import "./Carosel.css";
 const Carosel = () => {
    const [allProducts , setAllProducts] = useState([]);
    const [products , setProducts] = useState([]);

    const dataFetch = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/product`)
        .then((response) => {
         setAllProducts(response.data.items);
        })
    }
    
    useEffect(() => {
     const   array=[];
     for(let i = allProducts.length-3; i < allProducts.length ; i++) {
        array.push(allProducts[i]);    
     }
     setProducts(array);
    }, [allProducts])
    useEffect(() => {
     dataFetch();
    },[]);

  return (
    <div className="main-slider">
      <div className="slider">
        {allProducts.map((element, index) => (
          <span style={{ "--i": index + 1 }}>
            <img
              key={element._id}
              src={`${process.env.REACT_APP_API_URL}/${element.image}`}
              alt="image"
            />
          </span>
        ))}
      </div>
      <NavLink to="/products" className='show-products'>View now</NavLink>
    </div>
  );
}

export default Carosel;
