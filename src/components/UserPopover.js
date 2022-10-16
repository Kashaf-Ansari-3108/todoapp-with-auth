import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';



const UserPopover = ({userDetails}) => {
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">{userDetails.name}</Popover.Header>
          <Popover.Body>
            {userDetails.email} <br />
            {userDetails.contact} <br />
            From: {userDetails.city},{userDetails.country}

          </Popover.Body>
        </Popover>
      );
return (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="success">{userDetails.name}</Button>
  </OverlayTrigger>
)};

export default UserPopover;