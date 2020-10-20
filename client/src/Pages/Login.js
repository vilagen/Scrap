import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import API from "../APIs/API";
import './pagesStyle.css';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			signinError: "",
			redirect: null,
		};
	};


	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
				[name]: value
		});
	};

	saveAuthTokenInSession = (token) => {
    // window.localStorage.setItem('token', token) // session/local storage is a way to save information on the browser. It uses key, value ('token', token in this case)
    window.sessionStorage.setItem('token', token) // session storage may be the preferred method.
	}
	
	async componentDidMount() {
		const token = window.sessionStorage.getItem(`token`);
		await token
		if (token) {
			fetch('http://localhost:3001/api/signout', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token,
				},
			});
			window.sessionStorage.removeItem('token');
			this.props.userSignin(false);
		};
	};

	onSubmitLogin2 = (event) => {
		event.preventDefault();
		if (this.state.username === "" || this.state.password === "") {
			alert("Missing username or password.")
		}
		else {
			API.onSubmitLogin(this.state.username, this.state.password)
			.then( data => {
				if(data.success === 'true' && data.userId) {
					this.saveAuthTokenInSession(data.token)
					API.userProfile(data)
					.then( user => {
						if(user && user.email) {
							alert("Sign in was successful!")
							this.props.userSignin("true", user.id);
							this.setState({ redirect: "/"})
						}
					})
				}
				else {
					alert(data);
				}
			})
		}
	};


  onSubmitLogin= (event) => {
		event.preventDefault();
		if (this.state.username === "" || this.state.password === "") {
			alert("Missing username or password.")
		} else {
			fetch('/api/signin', {
				method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
				})
			})
			.then( res => res.json())
			.then( data => {
				if (data.success === 'true' && data.userId) {
				this.saveAuthTokenInSession(data.token)
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
              this.props.userSignin("true", user.id);
              this.setState({ redirect: "/"})
            }
          })
				} else {
					alert(data)
				}
			});
		};
  };

	render() {

		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		return (

			<div>

				<div className="centerPage">

					<Card style={{ width: '20rem' }}>

						<CardBody>

							<Form>

								<h4>Login</h4>
								<br></br>

								<FormGroup controlId="formBasicEmail">
									<Label className="d-flex justify-content-start">Username</Label>
									<Input
									name="username"
									type="text" 
									placeholder="Username"
									value={this.state.username}
									onChange={this.handleInputChange}
									/>
								</FormGroup>

								<FormGroup controlId="formBasicPassword">
									<Label className="d-flex justify-content-start">Password</Label>
									<Input 
									name="password"
									type="password" 
									placeholder="Password"
									value={this.state.password} 
									onChange={this.handleInputChange}
									/>
								</FormGroup>

								<div>
									<Button 
									variant="primary" 
									type="submit"
									onClick={this.onSubmitLogin}
									>
										Submit
									</Button>
								
									<span class="mr-2"></span>

									<Link to={"/"}>
										<Button 
										variant="primary" 
										type="submit"
										
										>
											Return
										</Button>
									</Link>

								</div>

							</Form>

						</CardBody>

					</Card>    

				</div>

			</div>

		);

	};

};

export default Login;