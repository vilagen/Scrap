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
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./style.css";

const Example = (props) => {

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        <img src="./images/defUserImage.jpg" className="defaultImage" alt="userImage"/>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>Signin</DropdownItem>
        <DropdownItem>
          <Link to={"/register"}>
          Register
          </Link>
        </DropdownItem>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Signout</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Example;