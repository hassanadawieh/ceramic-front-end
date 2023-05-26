import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ShowProduct from "../../components/ShowProduct/ShowProduct";
import { FaRegWindowClose, FaTrashAlt, FaRegEye } from "react-icons/fa";
import "./Order.css";
import MyContext from "../../MyContext";
const Order = () => {
  const [products, setProducts] = useState([]);
  const { order, setOrder } = useContext(MyContext);
  const [showProduct , setShowProduct] = useState(false);
  const [idProduct , setIdProduct] = useState("")
  
  //function to get the id in the idProduct state
  const handleGetIdProduct = (element) => {
    setIdProduct(element);
    setShowProduct(true);
  }
const handleShowProductHidden = ( b ,element) => {
  setShowProduct(false);
}
  // function to fetch and get the products by id
  const getProductsById = async () => {
    const arrayProducts = [];
    for (let i = 0; i < order.length; i++) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/product/${order[i]}`)
        .then((response) => {
          arrayProducts.push(response.data);
        });
    }
    setProducts(arrayProducts);
  };

  // function to remove the product that I don't need from the order
  const handleRemove = (id) => {
    const array = order;
    for (let i = 0; i < order.length; i++) {
      if (order[i] === id) {
        array.splice(i, 1);
      }
    }
    console.log(array);
    setOrder(array);
    getProductsById();
  };
  useEffect(() => {
    getProductsById();
  }, []);
  return (
    <div className="order-container">
      {showProduct && (
        <ShowProduct id={idProduct} remove={handleShowProductHidden} action={false} />
      )}
      <div className="list-order">
        {products.map((element) => (
          <div className="cards" key={element._id}>
            <div className="card-order">
              <img
                className="image-order"
                src={`${process.env.REACT_APP_API_URL}/${element.image}`}
                alt="img-product"
              />
              <div className="info-order">
                <div className="name-product"> {element.name}</div>
                <div className="price">{element.price} $</div>
              </div>
              <div className="action-button">
                <FaRegEye
                  className="order-icon"
                  onClick={() => handleGetIdProduct(element._id)}
                />
                <FaTrashAlt
                  className="order-icon"
                  onClick={() => handleRemove(element._id)}
                />
              </div>
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
