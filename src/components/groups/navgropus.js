import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Events from './event/events';
import React, { useState } from 'react';

function VerticalExample() {

    const [showEvents, setShowEvents] = useState(true);

  const handleEventsClick = () => {
    setShowEvents(true);
  };

  return (
    <>
    <ButtonGroup className="d-flex justify-content-center">
  <Button variant="dark" onClick={handleEventsClick}>Events</Button>
  <Button variant="dark">Chat</Button>

  <DropdownButton variant="dark"
    as={ButtonGroup}
    title="Manage"
    id="bg-vertical-dropdown-1"
  >
    <Dropdown.Item eventKey="1">Add events</Dropdown.Item>
    <Dropdown.Item eventKey="2">Users</Dropdown.Item>
    <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
  </DropdownButton>
</ButtonGroup>
<br />
{showEvents && <Events />}
</>
  );
}

export default VerticalExample;