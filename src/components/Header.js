import React from "react";
import { Button } from "react-bootstrap";


const Header = ({ logoutHandler, userDetails }) => {
  return (
    <section className="navbarApp">
      <div>
        <h6>{userDetails.name}</h6>
      </div>
      <div>
      <Button onClick={logoutHandler} variant="danger">LOG OUT</Button>
        
      </div>
    </section>
  );
};

export default Header;
