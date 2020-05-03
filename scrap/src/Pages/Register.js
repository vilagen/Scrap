import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import './style.css';

class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			password2: "",
			registerError: "",
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

	onSubmitRegister = (event) => {
		event.preventDefault();
		if (this.state.username === "" || this.state.email === "" || this.state.password === "" || this.state.password2 === "") {
			alert("All fields must be filled out.")
		} else if (this.state.password !== this.state.password2) {
			alert("Passwords do not match.")
		} else {
			fetch('/api/register', {
				method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					username: this.state.username,
					email: this.state.email,
					password: this.state.password,
					password2: this.state.password2,
				})
			})
			.then( res => res.json())
			.then( data => {
				console.log(data)
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
							alert("Registeration was successful!")
							this.props.userRegister("true");
							this.setState({ redirect: "/"});
						};
					});
				} else {
					this.setState({registerError: data.error})
					alert(this.state.registerError);
				}
			});
		};
	};


	// handleRegister = (username, email, password, password2) => {

	// }

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

								<h4>Register</h4>
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

								<FormGroup controlId="formBasicEmail">
									<Label className="d-flex justify-content-start">Email address</Label>
									<Input 
									name="email"
									type="email" 
									placeholder="Email"
									value={this.state.email}
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

								<FormGroup controlId="formBasicPassword">
									<Label className="d-flex justify-content-start">Password</Label>
									<Input 
									name="password2"
									type="password" 
									placeholder="Password" 
									value={this.state.password2}
									onChange={this.handleInputChange}
									/>
								</FormGroup>

								<div>
									<Button 
									variant="primary" 
									type="submit"
									onClick={this.onSubmitRegister}
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

export default SignUp;