import React, { Component } from "react";
import {Container, Row, Col} from "reactstrap";
import { NewsList, NewsListItem } from "../components/NewsContainer/NewsContainer";
import ProfileIcon from "../components/Profile/ProfileIcon";
import "./style.css";

// const initialState = {
//   isSignedIn: false,
//   user: {
//     id: '',
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: '',
//     savedEntries: '',
//     joined: '',
//     articles: [],
//     redirect: null,
//   }
// };

const profileSize= {
  height: "125px",
  width: "auto",
  borderRadius: "50px",
};

const onClickDelete = () => {
  alert("This is a test");
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      savedEntries: '',
      joined: '',
      userArticles: [],
      redirect: null,
      isSignedIn: false,
    }
  };

  async componentDidMount() {
    const token = window.sessionStorage.getItem('token');
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
                isSignedIn: true,
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                username: user.username,
                email: user.email,
                savedEntries: user.saved_entries,
                userArticles: user.Articles,
              });
              console.log(this.state.userArticles)
						};
					});
				};
			})
			.catch(console.log("Don't have token or failed to work properly."));
		} else {
      this.setState({ isSignedIn: false});
    }
  }

  render() {

    console.log(this.props.articles)

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

        {this.state.userArticles.length === 0
          ?
          <div>
            <h1 id="scrap2" style={{textAlign:"center"}}>You have no saved articles at this time.</h1>
          </div>
          : 
          <NewsList>
            {this.state.userArticles.map( (stories, i) => (
              <NewsListItem
                key={i}
                author={stories.author}
                title={stories.title}
                image={stories.image}
                description={stories.description}
                url={stories.url}
                published={stories.published}
                allowDelete={this.props.isSignedIn}
                onDelete={() => this.onClickDelete(stories.id)}
                />
              )
            )};
          </NewsList>						
        };
      
      </div>
    )
  }
}

export default UserPage;

