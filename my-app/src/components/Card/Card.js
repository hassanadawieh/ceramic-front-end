import React , { useContext } from "react";
import "./Card.css"
import MyContext from "../../MyContext";
const Card = (props) => {
const {order , setOrder} = useContext(MyContext);

// function to add products to the cart
const handleAddProducts = (element) => {
    setOrder([...order , element]);
}

//function to transfer the id to the product page



  return (
    <div className="card-container">
      <div className="hidden-div" onClick={() => props.getId(props.id , true)}></div>
      <img className="img-product" src={`http://localhost:5000/${props.image}`} alt="card-product" />
      <div className="information-card">
        <p>{props.name}</p><p>{props.type}</p><p>{props.price}$</p>
      </div>
      <div className="buttom-add" onClick={() => handleAddProducts(props.id)}>Add +</div>
    </div>
  );
};

export default Card;
