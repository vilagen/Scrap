import React, { Component } from "react";
import {Container, Row, Col} from "reactstrap";
// import Header from "../components/Header/Header";
import ProfileIcon from "../components/Profile/ProfileIcon";
import "./style.css";

const initialState = {
  isSignedIn: false
};

const profileSize= {
  height: "125px",
  width: "auto",
  borderRadius: "50px",
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  };

  render() {

    return (

      <div>

        <Container>
 
          <Row className="userPageInfoDark">

            <Col md="8" sm="8" xs="8" className="spaceBetweenDiv">
              <div style={{justifyContent:"space-between"}}>
                <p>Name: { `${this.props.firstName} ${this.props.lastName}` }</p>
                <p>Username: {this.props.username}</p>
              </div>
              <div style={{justifyContent:"space-between"}}>
                <p>Email: {this.props.email}</p>
                <p>Entries: {this.props.savedEntries}</p>
              </div>
            </Col>

            <Col  md="4" sm="4" xs="4"
            className="displayCenter">
                <ProfileIcon
                style={profileSize}/>
            </Col>
          
          </Row>

        </Container>


        <Row style={{width:"100%"}}>

          <Col xs={12}>
          
            <div class="vertAlign2">
              <p class="scrap2">Your Saved Articles</p>
            </div>

          </Col>
        
        </Row>
      
      </div>
    )
  }
}

export default UserPage;