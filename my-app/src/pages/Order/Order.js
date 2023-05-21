import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import image from "../../images/login-image.jpg";
import { FaRegWindowClose } from "react-icons/fa";
import "./Order.css";
import MyContext from "../../MyContext";
const Order = () => {
  const [products, setProducts] = useState([]);
  const { order, setOrder } = useContext(MyContext);
  console.log(order);

  // function to fetch and get the products by id
  const getProductsById = async() => {
    const arrayProducts = [];
    for (let i = 0; i < order.length; i++) {
     await axios
        .get(`${process.env.REACT_APP_API_URL}/product/${order[i]}`)
        .then((response) => {
          arrayProducts.push(response.data);
        });
    }
    setProducts(arrayProducts); 

  };

  // function to remove the product that I don't need from the order
  const handleRemove = (id) => {
    const array=order;
    for(let i = 0 ; i < order.length ; i++){
     if(order[i] === id){
      array.splice(i , 1);
     }
    }
    console.log(array)
    setOrder(array);
    getProductsById();
  }
  useEffect(() => {
    getProductsById();
  },[]);
  return (
    <div className="order-container">
      <div className="list-order">
        {products.map((element) => (
          <div className="cards" key={element._id}>
            <div className="card-order">
              <img
                className="image-order"
                src={`http://localhost:5000/${element.image}`}
                alt="img-product"
              />
              <div className="info-order">
                <div className="name-product"> {element.name}</div>
                <div className="price">{element.price} $</div>
                <div className="quantity">Quantity:100</div>
              </div>
              <FaRegWindowClose className="delete-btn" onClick={() => handleRemove(element._id)}/>
            </div>
          </div>
        ))}

        <div className="confirme-div">
          <div className="confirme">Confirme</div>
        </div>
      </div>
    </div>
  );
};

export default Order;
