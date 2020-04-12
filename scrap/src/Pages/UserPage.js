import React, { Component } from "react";
import {Row, Col} from "reactstrap";
import Header from "../components/Header/Header";
import ProfileIcon from "../components/Profile/ProfileIcon";
import "./style.css";

const initialState = {
  isSignedIn: false
};

class UserPage extends Component {
  constructor() {
    super();
    this.state = initialState;
  };

  render() {

    return (

      <div>

        <Header>
          <ProfileIcon />
        </Header>

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