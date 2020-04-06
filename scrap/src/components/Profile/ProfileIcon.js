import React from "react";
import { Modal } from 'reactstrap';
import "./style.css";

const [modal, setModal] = useState(false);

const toggle = () => setModal(!modal)

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