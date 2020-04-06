import React from "react";
import { Modal } from 'reactstrap';
import "./style.css";


class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  };

  toggle = () => {
    this.setState( prevState => ( {modalOpen: !prevState.modalOpen} ) );
  }

  render() {
    return (
      <div>
        <img src="./images/defUserImage.jpg" className="defaultImage" alt="userImage"/>
      </div>
    )
  }
}

export default Profile;