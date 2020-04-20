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
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
         Modal, ModalHeader, ModalBody, ModalFooter, 
         Form, FormGroup, Label, Input} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import "./style.css";

const ProfileIcon = (props) => {

  const {
    className
  } = props;

  const [dropdownOpen, setOpen] = useState(false);
  
  const [modal, setModal] = useState(false);

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [registerError, setRegisterError] = useState('');

  const [redirect, setRedirect] = useState('');

  const toggle = () => setOpen(!dropdownOpen);

  const toggleModal = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>

  const saveAuthTokenInSession = (token) => {
    // window.localStorage.setItem('token', token) // session/local storage is a way to save information on the browser. It uses key, value ('token', token in this case)
    window.sessionStorage.setItem('token', token) // session storage may be the preferred method.
  }

  const onSubmitRegister = (event) => {
		event.preventDefault();
		if (username === "" || password === "") {
			alert("Missing username or password.")
		} else {
			fetch('/api/signin', {
				method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					username: username,
					password: password,
				})
			})
			.then( res => res.json())
			.then( data => {
				console.log(data)
				if (data.success === 'true' && data.userId) {
				saveAuthTokenInSession(data.token)
					fetch(`/api/profile/${data.userId}`, {
						method: 'get',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': data.token,					
						}
					})
					.then(res => res.json())
					.then( user => {
						if(user && user.email) {
              alert("Sign in was successful!")
              toggleModal()
              setRedirect("/")
              console.log(redirect)
						};
					});
				} else {
					alert(data)
				}
			});
		};
	};

  return (

    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        <img src="./images/defUserImage.jpg" className="defaultImage" alt="userImage" {...props}/>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
        <span onClick={toggleModal}>Signin</span>
        <Modal isOpen={modal} toggle={toggleModal} className={className}>
          <ModalHeader toggle={toggleModal} close={closeBtn}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <h4>Signin</h4>
              <br></br>
              <FormGroup controlId="formBasicEmail">
                <Label className="d-flex justify-content-start">Username</Label>
                <Input
                name="username"
                type="text" 
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value, console.log(username))}
                />
              </FormGroup>

              <FormGroup controlId="formBasicPassword">
                <Label className="d-flex justify-content-start">Password</Label>
                <Input 
                name="password"
                type="password" 
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value, console.log(password))}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onSubmitRegister}>Signin</Button>{' '}
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

};

export default ProfileIcon;