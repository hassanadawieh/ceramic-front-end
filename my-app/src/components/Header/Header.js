import React, { useState, useEffect, useContext } from "react";
import Mycontext from "../../../src/MyContext";
import axios from "axios";
import Brand from "../../images/brand.svg";
import Logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";
import { FaAlignJustify, FaAlignCenter } from "react-icons/fa";
import "./Header.css";
const Header = () => {
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [boxShadow, setBoxShadow] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  // get the useContext category name
  const { categoryName, setCategoryName } = useContext(Mycontext);

  // make active style to the drop down
    let activeStyle = {
      borderBottom: "3px solid var(--A)",
    };

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
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // functions to action the drop up and down
    const handelMenuShow = () => {
      setOpen(true);
    };

    const handelMenuHidden = () => {
      setOpen(false);
    };
   console.log(open)
  return (
    <div className="header-container">
      <div
        className="main-Header"
        style={{ backgroundColor: backgroundColor, boxShadow: boxShadow }}
      >
        <div className="logo">
          <img src={Logo} />
          <img className="brand-name" src={Brand} />
        </div>
        <div className="list-pages">
          <NavLink
            className="link"
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            className="link"
            to="/contact"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Contact
          </NavLink>
          <NavLink
            className="link"
            to="/products"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Products
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
                    onClick={() => {handleStoreCategoryName("All Categories") ; handelMenuHidden()}}
                  >
                    All Categories
                  </NavLink>
                </h4>
                {categories.map((element) => (
                  <h4 key={element._id}>
                    <NavLink
                      to="/products"
                      className="category-element"
                      onClick={() => {handleStoreCategoryName(element.name) ; handelMenuHidden()}}
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
          <NavLink className="link header-login" to="/login">
            Login
          </NavLink>
          <NavLink to="/order" className="order-button">
            Your Favorite
          </NavLink>
          {!open ? (
            <FaAlignJustify className="toggle_btn" onClick={handelMenuShow} />
           
          ) : (
            <FaAlignCenter className="toggle_btn" onClick={handelMenuHidden} />
          )}
        </div>
        {open ? (
          <div className="dropdown_menu">
            <NavLink
              className="link"
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={handelMenuHidden}
            >
              Home
            </NavLink>
            <NavLink
              className="link"
              to="/contact"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={handelMenuHidden}
            >
              Contact
            </NavLink>
            <NavLink
              className="link"
              to="/products"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={handelMenuHidden}
            >
              Products
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
            {/* <li>
                <NavLink
                  className="link"
                  to="/"
                  href="#hero"
                  onClick={handelMenuHidden}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="link"
                  to="/products"
                  href="#hero"
                  onClick={handelMenuHidden}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link"
                  to="/training"
                  href="#hero"
                  onClick={handelMenuHidden}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Training
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link"
                  to="/contact"
                  href="#hero"
                  onClick={handelMenuHidden}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Contact
                </NavLink>
              </li> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
