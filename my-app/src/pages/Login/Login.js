import React, { useState, useEffect } from "react";
import "./Login.css";
import Logo from "../../images/logo.svg";
import Brand from "../../images/brand.svg";
const Login = () => {
  const [checkedAdmin, setCheckedAdmin] = useState(false);
  const [checkedUser, setCheckedUser] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [width, setWidth] = useState("45vh");

  // fuction checked the admin
  const handleCheckedAdmin = () => {
    setCheckedAdmin(true);
    setCheckedUser(false);
  };
  // fub=nction checked the user
  const handleCheckedUser = () => {
    setCheckedAdmin(false);
    setCheckedUser(true);
  };

  // function checked if it's sign up
  const handleSignUp = () => {
    setSignUp(true);
    console.log(signUp);
  };

  // function checked if it's sign in
  const handleSignin = () => {
    setSignUp(false);
  };

  // function to increase the height of the card
useEffect(() => {
      if (signUp === true) {
        setWidth("60vh");
      }else{
        setWidth("45vh")
      }

},[signUp])
    
 

  return (
    <div className="login-container">
      <div className="div-wrap">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <img src={Brand} alt="Brand" />
        </div>
        <div className="main-login">
          <div className="login-information">
            <div>something good and so beautiful</div>{" "}
            <p>
              lorem you can do what ever you want and you can bye by this
              website and know more about the products
            </p>
          </div>
          <form className="card-login" style={{ height: width }}>
            {signUp ? <h2>Create your account</h2> : <h2> Sign in</h2>}
            {signUp ? <input className="input" placeholder="Name"></input> : ""}
            {signUp ? (
              <input className="input" placeholder="Address" required></input>
            ) : (
              ""
            )}
            {signUp ? (
              <input className="input" placeholder="Phone" required></input>
            ) : (
              ""
            )}
            <input className="input" placeholder="Email" required></input>
            <input className="input" placeholder="Password" required></input>
            {signUp ? (
              " "
            ) : (
              <div className="checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={checkedUser}
                    onChange={handleCheckedUser}
                    name="user"
                    value="user"
                  />
                  User
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={checkedAdmin}
                    onChange={handleCheckedAdmin}
                    name="admin"
                    value="admin"
                  />
                  Admin
                </label>
              </div>
            )}
            <div className="ver-email">
              <p>Please enter a valid email address.</p>
            </div>

            {signUp ? (
              <div className="sign" onSubmit={console.log("hassan")}>Sign up</div>
            ) : (
              <div className="sign" onSubmit={console.log("hassan")}>Sign in</div>
            )}
            {signUp ? (
              <p>
                Already have an account?
                <span
                  onClick={() => {
                    handleSignin();
                  }}
                  className="span-sign-up"
                >
                  Sign in
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?
                <span
                  onClick={() => {
                    handleSignUp();
                  }}
                  className="span-sign-up"
                >
                  Sign up
                </span>
              </p>
            )}
          </form>
        </div>
        <div className="our-brand">@Hassan-Adawieh</div>
      </div>
    </div>
  );
};

export default Login;
