// import React from "react";
// import "./style.css";

// class Profile extends React.Component {
//   render() {
//     return (
//       <div>
//         <img src="./images/defUserImage.jpg" className="defaultImage" alt="userImage"/>
//       </div>
//     )
//   }
// }

// export default Profile;

import React, { useState } from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./style.css";

const Example = (props) => {

  const {
    className
  } = props;

  const [dropdownOpen, setOpen] = useState(false);
  
  const [modal, setModal] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const toggleModal = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>

  console.log(modal)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        <img src="./images/defUserImage.jpg" className="defaultImage" alt="userImage" {...props}/>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
        <p onClick={toggleModal}>Signin</p>
        <Modal isOpen={modal} toggle={toggleModal} className={className}>
          <ModalHeader toggle={toggleModal} close={closeBtn}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </DropdownItem>
        <DropdownItem>
          <Link to={"/register"}>
          Register
          </Link>
        </DropdownItem>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Signout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;