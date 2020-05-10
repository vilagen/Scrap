import React, { Component } from "react";
import {Container, Row, Col} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { NewsList, NewsListItem } from "../components/NewsContainer/NewsContainer";
import ProfileIcon from "../components/Profile/ProfileIcon";
import "./pagesStyle.css";
import API from "../APIs/API";

const profileSize= {
  height: "125px",
  width: "auto",
  borderRadius: "50px",
};

const token = window.sessionStorage.getItem('token');

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      savedEntries: '',
      userArticles: [],
      redirect: null,
      isSignedIn: false,
    }
  };

  loadArticles = (token, id) => {
    API.retrieveUserInfo(token, id)
      .then(res => this.setState({ userArticles: res.data.Articles }))
      .then(res => console.log(this.state.userArticles))
      .catch(err => console.log(`There was an error retrieving articles. ${err}`));
  };

  onClickDelete = (token, id) => {
    API.deleteArticle(token, id)
      .then(res=> this.loadArticles(token, this.state.id))
  };

  async componentDidMount() {
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
      this.setState({ isSignedIn: false});
      this.setState({ redirect: "/"});
    }
  };

  render() {

    // console.log(this.props.id)

    if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

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
                isSignedIn={this.props.isSignedIn} 
                userSignedIn={this.props.userSignedIn} 
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
                onDelete={() => this.onClickDelete(token, stories.id)}
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

