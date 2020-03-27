import React from "react";
import "./style.css";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <img src="./images/defUserImage.jpg" className="defaultImage" alt="userImage"/>
      </div>
    )
  }
}

export default Profile;