import React, { Component } from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import API from "../../APIs/API";
import "./style.css";

const token = window.sessionStorage.getItem('token');

class ProfileIcon extends Component {

  constructor(props){
    super(props);
    this.state ={
      dropdownOpen: false,
      // modal: false,
      username: '',
      password: '',
      registerError: '',
      signedIn: this.props.isSignedIn
      // redirect: null,
    };
  };

  toggleDropDown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  loadArticles = (token, id) => {
    API.retrieveUserInfo(token, id)
      // .then(res => this.setState({ signedIn: true }))
      .then(res => console.log(res))
      .catch(err => console.log(`There was an error retrieving articles. ${err}`));
  };
  
  signOutUser = (event) => {
    event.preventDefault();
    const token= window.sessionStorage.getItem('token')
    fetch('http://localhost:3001/api/signout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    window.sessionStorage.removeItem('token');
    this.props.userSignedIn(false);
    this.setState({ signedIn: false});
    this.toggleDropDown();
  };

  // async componentDidMount() {
  //   await token
  //   if (token) {
	// 		fetch('/api/signin', {
	// 			method: 'post',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'Authorization': token // usually use 'Bearer ' + token
	// 			}
	// 		})
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			if (data && data.id) {
  //         this.setState({ signedIn: true })
	// 	    } else {
  //         this.setState({ signedIn: false});
  //       }
  //     })
  //   } else {
  //     this.setState({ signedIn: false});
  //   };
  // };


  // async componentDidMount() {
  //   if(this.props.isSignedIn === true) {
  //     this.setState({ signedIn: true })
  //   } else {
  //     this.setState({ signedIn: false});
  //   }
  // }

  render() {

    if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
    }
    
    console.log(this.state.signedIn)

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
        <DropdownToggle caret>
          <img src="./images/defUserImage.jpg" className="defaultImage" alt="userImage"/>
        </DropdownToggle>
        <DropdownMenu right>
          {this.state.signedIn && <DropdownItem>
            <Link to={"/"}>
            Home
            </Link>
          </DropdownItem>}
          {!this.state.signedIn && <DropdownItem>
            <Link to={"/login"}>
              Login
            </Link>
          </DropdownItem>}
          {this.state.signedIn && <DropdownItem>
            <Link to={"/profile"}>
            Profile
            </Link>
          </DropdownItem>}
          <DropdownItem divider />
          <DropdownItem>
            <Link to={"/register"}>
            Register
            </Link>
          </DropdownItem>
          <DropdownItem onClick={this.signOutUser} toggle={false}>
            <Link to={"/"}>
            Signout
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };
};

export default ProfileIcon;

//example of how to use Hooks, but not practical here.
// import React, { useState } from 'react';
// import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
//          Modal, ModalHeader, ModalBody, ModalFooter, 
//          Form, FormGroup, Label, Input} from 'reactstrap';
// import { Link, Redirect } from "react-router-dom";
// import "./style.css";

// const ProfileIcon = (props) => {

//   const {
//     className
//   } = props;

//   const [dropdownOpen, setOpen] = useState(false);
  
//   const [modal, setModal] = useState(false);

//   const [username, setUsername] = useState('');

//   const [password, setPassword] = useState('');

//   const [registerError, setRegisterError] = useState('');

//   const [redirect, setRedirect] = useState('');

//   const toggle = () => setOpen(!dropdownOpen);

//   const toggleModal = () => setModal(!modal);

//   const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>

//   const saveAuthTokenInSession = (token) => {
//     // window.localStorage.setItem('token', token) // session/local storage is a way to save information on the browser. It uses key, value ('token', token in this case)
//     window.sessionStorage.setItem('token', token) // session storage may be the preferred method.
//   }

//   const onSubmitRegister = (event) => {
// 		event.preventDefault();
// 		if (username === "" || password === "") {
// 			alert("Missing username or password.")
// 		} else {
// 			fetch('/api/signin', {
// 				method: "post",
// 				headers: {"Content-Type": "application/json"},
// 				body: JSON.stringify({
// 					username: username,
// 					password: password,
// 				})
// 			})
// 			.then( res => res.json())
// 			.then( data => {
// 				console.log(data)
// 				if (data.success === 'true' && data.userId) {
// 				saveAuthTokenInSession(data.token)
// 					fetch(`/api/profile/${data.userId}`, {
// 						method: 'get',
// 						headers: {
// 							'Content-Type': 'application/json',
// 							'Authorization': data.token,					
// 						}
// 					})
// 					.then(res => res.json())
// 					.then( user => {
// 						if(user && user.email) {
//               alert("Sign in was successful!")
//               toggleModal()
//               setRedirect("/")
//               console.log(redirect)
// 						};
// 					});
// 				} else {
// 					alert(data)
// 				}
// 			});
// 		};
// 	};

//   return (

//     <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//       <DropdownToggle caret>
//         <img src="./images/defUserImage.jpg" className="defaultImage" alt="userImage" {...props}/>
//       </DropdownToggle>
//       <DropdownMenu right>
//         <DropdownItem>
//         <span onClick={toggleModal}>Signin</span>
//         <Modal isOpen={modal} toggle={toggleModal} className={className}>
//           <ModalHeader toggle={toggleModal} close={closeBtn}>Modal title</ModalHeader>
//           <ModalBody>
//             <Form>
//               <h4>Signin</h4>
//               <br></br>
//               <FormGroup controlId="formBasicEmail">
//                 <Label className="d-flex justify-content-start">Username</Label>
//                 <Input
//                 name="username"
//                 type="text" 
//                 placeholder="Username"
//                 onChange={(event) => setUsername(event.target.value, console.log(username))}
//                 />
//               </FormGroup>

//               <FormGroup controlId="formBasicPassword">
//                 <Label className="d-flex justify-content-start">Password</Label>
//                 <Input 
//                 name="password"
//                 type="password" 
//                 placeholder="Password"
//                 onChange={(event) => setPassword(event.target.value, console.log(password))}
//                 />
//               </FormGroup>
//             </Form>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={onSubmitRegister}>Signin</Button>{' '}
//             <Button color="secondary" onClick={toggleModal}>Cancel</Button>
//           </ModalFooter>
//         </Modal>
//         </DropdownItem>
//         <DropdownItem>
//           <Link to={"/register"}>
//           Register
//           </Link>
//         </DropdownItem>
//         <DropdownItem>Profile</DropdownItem>
//         <DropdownItem divider />
//         <DropdownItem>Signout</DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );

// };

// export default ProfileIcon;