import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardBody } from "reactstrap";
import './style.css';

class SignUp extends Component {

	state = {
		username: "",
		email: "",
		password: "",
		password2: ""
	}

		render() {

        return (

				<div>

					<div className="centerPage">

						<Card style={{ width: '20rem' }}>

							<CardBody>

								<Form>

									<FormGroup controlId="formBasicEmail">
											<Label className="d-flex justify-content-start">Username</Label>
											<Input
											type="text" 
											placeholder="Username"
											onChange={ (event) => {this.setState({name: event.target.value}); console.log(this.state.username)} }
											/>
									</FormGroup>

									<FormGroup controlId="formBasicEmail">
											<Label className="d-flex justify-content-start">Email address</Label>
											<Input 
											type="email" 
											placeholder="Email"
											onChange={ (event) => {this.setState({name: event.target.value}); console.log(this.state.email)} }
											/>
									</FormGroup>

									<FormGroup controlId="formBasicPassword">
											<Label className="d-flex justify-content-start">Password</Label>
											<Input 
											type="password" 
											placeholder="Password" 
											onChange={ (event) => {this.setState({name: event.target.value}); console.log(this.state.password)} }
											/>
									</FormGroup>

									<FormGroup controlId="formBasicPassword">
											<Label className="d-flex justify-content-start">Password</Label>
											<Input 
											type="password" 
											placeholder="Password" 
											onChange={ (event) => {this.setState({name: event.target.value}); console.log(this.state.password2)} }
											/>
									</FormGroup>

									<div>
										<Button variant="primary" type="submit">
												Submit
										</Button>
									
										<span class="mr-2"></span>

										<Button variant="primary" type="submit">
												Return
										</Button>
									</div>

								</Form>

							</CardBody>

					</Card>    

				</div>

			</div>

		)
	}
}

export default SignUp