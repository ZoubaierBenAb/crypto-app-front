import React, { useState, useEffect } from "react";
import "../components/components-style/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reduxSlices/authSlice";
import Spinner from "./Spinner";
import { Button } from "antd";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user,isFetching ,isSuccess} = useSelector((state) => state.auth);


  useEffect(() => {
   if(isSuccess ){
    navigate('/')
   }
  }, [isSuccess ,user]);

  const onLogout = () => {
    dispatch(logout());
   
    
  };
  if (isFetching){
    return <Spinner/>
  }

  return (
 
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo">
          CRYPTO FLOW
        </Link>
      </div>
      <div className="routes">
        <Link to='/wishlist'>Wishlist</Link>
        <Link to="/cryptoCurrencies">Crypto Currencies</Link>
        <Link to="/exchanges">Exchanges</Link>
        {isSuccess || user ? (
          <Button danger type="text" onClick={onLogout}>Logout</Button >
        ) : (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign in</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;