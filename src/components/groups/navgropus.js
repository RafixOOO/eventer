import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Events from './event/events';
import React, { useState } from 'react';
import Users from './users/users';
import Settings from './settings/kolochange';
import Addevent from './event/addevents';

function VerticalExample() {

    const [showEvents, setShowEvents] = useState(true);
    const [showUsers, setShowUsers] = useState(false);

  const eventvisible = () => {
    setShowEvents(true);
    setShowUsers(false);
  };

  const usersvisible = () => {
    setShowEvents(false);
    setShowUsers(true);
  };

  return (
    <>
    <ButtonGroup className="d-flex justify-content-center">
  <Button variant="dark" onClick={eventvisible}>Events</Button>
  <Button variant="dark" onClick={usersvisible}>Users</Button>
  <DropdownButton variant="dark"
    as={ButtonGroup}
    title="Manage"
    id="bg-vertical-dropdown-1"
  >
    <Addevent />
    <Settings />
  </DropdownButton>
</ButtonGroup>
<br />
{showEvents && <Events />}
{showUsers && <Users />}
</>
  );
}

export default VerticalExample;