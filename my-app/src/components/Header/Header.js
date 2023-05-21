import React, { useState, useEffect , useContext } from "react";
import Mycontext from "../../../src/MyContext";
import axios from "axios";
import Brand from "../../images/brand.svg";
import Logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [boxShadow, setBoxShadow] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  // get the useContext category name
const { categoryName, setCategoryName } = useContext(Mycontext);

  const handleMouseOver = () => {
    setShowDropdown(true);
  };
  const handleMouseOut = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 0) {
        setBackgroundColor("#36372f");
        setBoxShadow("0px 6px 10px #36372f");
      } else {
        setBackgroundColor("transparent");
        setBoxShadow("");
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // function get the categories and store inside the categories state
  const fetchCategories = () => {
    axios.get(`http://localhost:5000/api/category`).then((response) => {
      try {
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleStoreCategoryName = (element) => {
      setCategoryName(element);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="header-container">
      <div
        className="main-Header"
        style={{ backgroundColor: backgroundColor, boxShadow: boxShadow }}
      >
        <div className="logo">
          <img src={Logo} />
          <img src={Brand} />
        </div>
        <div className="list-pages">
          <NavLink className="link" to="/">
            Home
          </NavLink>
          <NavLink className="link" to="/products">
            Products
          </NavLink>
          <NavLink className="link" to="/contact">
            Contact
          </NavLink>
          <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className="link categorylinks"
            to="/"
          >
            Category{" "}
            {showDropdown && (
              <div className="dropDown">
                <h4>
                  {" "}
                  <NavLink
                    to="/products"
                    className="category-element"
                    onClick={() => handleStoreCategoryName("All Categories")}
                  >
                    All Categories
                  </NavLink>
                </h4>
                {categories.map((element) => (
                  <h4 key={element._id}>
                    <NavLink
                      to="/products"
                      className="category-element"
                      onClick={() => handleStoreCategoryName(element.name)}
                      key={element._id}
                    >
                      {element.name}
                    </NavLink>
                  </h4>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="login-order">
          <NavLink className="link" to="/login">
            Login
          </NavLink>
          <NavLink to="/order" className="order-button">
            Your order
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
