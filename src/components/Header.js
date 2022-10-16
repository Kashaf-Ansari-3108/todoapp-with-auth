import React from "react";
import { Button } from "react-bootstrap";
import UserPopover from "./UserPopover";



const Header = ({ logoutHandler, userDetails }) => {
  return (
    <section className="navbarApp">
      <div>
       <UserPopover userDetails = {userDetails}/>
       </div>
      <div>
      <Button onClick={logoutHandler} variant="danger">LOG OUT</Button>
        
      </div>
    </section>
  );
};

export default Header;
