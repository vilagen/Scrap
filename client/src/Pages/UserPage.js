import React, { Component } from "react";
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input, Card, CardBody} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { NewsList, NewsListItem } from "../components/NewsContainer/NewsContainer";
import { NewsCardItem} from "../components/NewsContainer/NewsCard"
import ProfileIcon from "../components/Profile/ProfileIcon";
import "./pagesStyle.css";
import API from "../APIs/API";

const profileSize= {
  height: "125px",
  width: "auto",
  borderRadius: "50px",
};

const pagetoken = window.sessionStorage.getItem('token');

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      savedEntries: '',
      username: '',
      email: '',
      editFirstName: "",
      editLastName: "",
      editEmail: "",
      userArticles: [],
      redirect: null,
      isSignedIn: false,
      modal: false,
      mobile: window.matchMedia("(min-width: 740px)").matches,
      mobileBanner: window.matchMedia("(min-width: 1000px)").matches,
    }
  };

  loadArticles = (token, id) => {
    API.retrieveUserInfo(token, id)
      .then(res => this.setState({ userArticles: res.data.Articles }))
      // .then(res => console.log(this.state.userArticles))
      .catch(err => console.log(`There was an error retrieving articles. ${err}`));
  };

  onClickDelete = (token, articleID, id) => {
    API.deleteArticle(token, articleID)
      .then(res=> { 
        API.decrementSavedEntries(token, id) 
      })
      .then(res=> { this.loadArticles(token, this.state.id)
      })
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
				[name]: value
		});
	};

  saveChanges = (token, id, newEmail, newFirstName, newLastName) => {
    API.updateUser({
      token, 
      id, 
      newEmail,
      newFirstName, 
      newLastName, 
    })
    .catch(err => console.log(`There was an error updating user. ${err}`));
    alert("Information updated successfully!");
  };

 async componentDidMount() {
  let token = window.sessionStorage.getItem('token');

  window.matchMedia("(min-width: 740px)").addEventListener( "change", (e) => {
    this.setState({mobile: e.matches})
  });

  window.matchMedia("(min-width: 1000px)").addEventListener( "change", (e) => {
    this.setState({mobileBanner: e.matches})
  });

  // setTimeout( ()=> {
    await token
    if (token) {
      fetch('/api/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // usually use 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          fetch(`/api/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(res => res.json())
          .then(user => {
            if (user && user.username) {
              console.log(user);
              this.setState({
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                username: user.username,
                email: user.email,
                savedEntries: user.saved_entries,
                userArticles: user.Articles,
              });
              console.log(this.state.userArticles)
              this.loadArticles(token, this.state.id)
            };
          });
        } else {
          this.setState({ isSignedIn: false});
          this.setState({ redirect: "/"});
        };
      })
      .catch(console.log("Don't have token or failed to work properly."));
      } else {
        console.log(`From userPage ${token}`)
        this.setState({ isSignedIn: false});
        this.setState({ redirect: "/"});
      }
    };
    // ,1000);
  // };

  render() {

    // console.log(this.state.email, this.state.firstName, this.state.lastName)

    if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

    return (

      <div>

        {this.state.mobileBanner === true ?
          (
          <Container className="userPageInfoDark">
  
            <Row>
              <Col md="5" sm="5" xs="5">
                <div class = "card bg-dark border-light my-2" style={{width: "100%"}}>
                  <ul class = "list-group list-group-flush">
                    <li class ="list-group-item border-light bg-dark"> Name: { `${this.state.firstName} ${this.state.lastName}` }</li>
                    <li class ="list-group-item border-light bg-dark"> Username: {this.state.username}</li>
                  </ul>
                </div>
              </Col>
              <Col md="5" sm="5" xs="5">
                <div class = "card bg-dark border-light my-2" style={{width: "100%"}}>
                  <ul class = "list-group list-group-flush">
                    <li class ="list-group-item border-light bg-dark"> Email: { this.state.email }</li>
                    <li class ="list-group-item border-light bg-dark"> Entries: {this.state.savedEntries}</li>
                  </ul>
                </div>
              </Col>

              <Col  md="2" sm="2" xs="2"
              className="displayCenter">
                  <ProfileIcon
                  isSignedIn={this.props.isSignedIn} 
                  userSignedIn={this.props.userSignedIn} 
                  style={profileSize}/>
              </Col>
            
            </Row>
            
            <Button color="danger" onClick={this.toggleModal}>Edit Profile</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
              <ModalBody>
                
              What information do you need to change?

              <FormGroup controlId="formBasicEmail">
                <Label className="d-flex justify-content-start">Email</Label>
                <Input 
                name="editEmail"
                type="email" 
                placeholder="Email"
                value={this.state.editEmail}
                onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup controlId="formBasicFirstName">
                <Label className="d-flex justify-content-start">First Name</Label>
                <Input 
                name="editFirstName"
                type="text" 
                placeholder="Morgan"
                value={this.state.editFirstName}
                onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup controlId="formBasicLastName">
                <Label className="d-flex justify-content-start">Last Name</Label>
                <Input 
                name="editLastName"
                type="text" 
                placeholder="Doe"
                value={this.state.editLastName}
                onChange={this.handleInputChange}
                />
              </FormGroup>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() =>
                  {
                    let {editEmail, editFirstName, editLastName, email, firstName, lastName} = this.state
                    if(!editEmail && !editFirstName && !editFirstName) {
                      this.saveChanges(
                      sessionStorage.getItem(`token`), 
                      this.state.id, 
                      editEmail, 
                      editFirstName, 
                      editLastName
                    )}
                    else if(!editEmail && !editFirstName && !editLastName) {
                      alert("No information has been selected to update.")
                    }
                    // want to check what fields are empty and if they make sure to change their info to corresponding current into.
                    else { 
                      if(editEmail === "") {
                        editEmail = email;
                      }
                      if(!editFirstName) {
                        editFirstName = firstName;
                      }
                      if(!editLastName) { 
                        editLastName = lastName;
                      }
                      this.saveChanges(
                        sessionStorage.getItem(`token`), 
                        this.state.id, 
                        editEmail, 
                        editFirstName, 
                        editLastName
                        )
                      }
                    }      
                  }>Update
                </Button>
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
              </ModalFooter>
            </Modal>

          </Container>
        )

        :
        
        (
        <div class="userMobilePageInfoDark">

          <Row>
        
            <Col>
            <div class>
              <ProfileIcon 
              isSignedIn={this.props.isSignedIn} 
              userSignedIn={this.props.userSignedIn} 
              style={profileSize}/>
            </div>
              <div class = "card bg-dark border-light my-2" style={{width: "100%"}}>
                <ul class = "list-group list-group-flush">
                  <li class ="list-group-item border-light bg-dark">Name: { `${this.state.firstName} ${this.state.lastName}` }</li>
                  <li class ="list-group-item border-light bg-dark">Username: {this.state.username}</li>
                  <li class ="list-group-item border-light bg-dark">Email: { this.state.email }</li>
                  <li class ="list-group-item border-light bg-dark">Entries: {this.state.savedEntries}</li>
                </ul>
              </div>
            
            </Col>      

          </Row>

          <Button 
            color="danger"
            onClick={this.toggleModal}>Edit Profile
          </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
              <ModalBody>
                
              What information do you need to change?

              <FormGroup controlId="formBasicEmail">
                <Label className="d-flex justify-content-start">Email</Label>
                <Input 
                name="editEmail"
                type="email" 
                placeholder="Email"
                value={this.state.editEmail}
                onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup controlId="formBasicFirstName">
                <Label className="d-flex justify-content-start">First Name</Label>
                <Input 
                name="editFirstName"
                type="text" 
                placeholder="Morgan"
                value={this.state.editFirstName}
                onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup controlId="formBasicLastName">
                <Label className="d-flex justify-content-start">Last Name</Label>
                <Input 
                name="editLastName"
                type="text" 
                placeholder="Doe"
                value={this.state.editLastName}
                onChange={this.handleInputChange}
                />
              </FormGroup>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() =>
                  {
                    let {editEmail, editFirstName, editLastName, email, firstName, lastName} = this.state
                    if(!editEmail && !editFirstName && !editFirstName) {
                      this.saveChanges(
                      sessionStorage.getItem(`token`), 
                      this.state.id, 
                      editEmail, 
                      editFirstName, 
                      editLastName
                    )}
                    else if(!editEmail && !editFirstName && !editLastName) {
                      alert("No information has been selected to update.")
                    }
                    // want to check what fields are empty and if they make sure to change their info to corresponding current into.
                    else { 
                      if(editEmail === "") {
                        editEmail = email;
                      }
                      if(!editFirstName) {
                        editFirstName = firstName;
                      }
                      if(!editLastName) { 
                        editLastName = lastName;
                      }
                      this.saveChanges(
                        sessionStorage.getItem(`token`), 
                        this.state.id, 
                        editEmail, 
                        editFirstName, 
                        editLastName
                        )
                      }
                    }      
                  }>Update
                </Button>
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
          
        </div>
        )}

        <Row style={{width:"100%"}}>

          <Col xs={12}>
          
            <div class="vertAlign2">
              <p class="scrap2">Your Saved Articles</p>
            </div>

          </Col>
        
        </Row>

        {this.state.userArticles.length === 0
          ?
          <div>
            <h1 id="scrap2" style={{textAlign:"center"}}>You have no saved articles at this time.</h1>
          </div>
          : 
          <NewsList>
            {this.state.mobile && this.state.userArticles.map( (stories, i) => (
              <NewsListItem
                key={i}
                author={stories.author}
                title={stories.title}
                image={stories.image}
                description={stories.description}
                url={stories.url}
                published={stories.published}
                allowDelete={this.props.isSignedIn}
                onDelete={() => this.onClickDelete(pagetoken, stories.id, this.state.id)}
                />
              )
            )};

            {!this.state.mobile && this.state.userArticles.map( (stories, i) => (
							<NewsCardItem
              key={i}
              author={stories.author}
              title={stories.title}
              image={stories.image}
              description={stories.description}
              url={stories.url}
              published={stories.published}
              allowDelete={this.props.isSignedIn}
              onDelete={() => this.onClickDelete(pagetoken, stories.id, this.state.id)}
								/>
							)
						)};

          </NewsList>	

        };
      
      </div>
    );
  };
};

export default UserPage;