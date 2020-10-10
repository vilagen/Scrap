import React, { Component } from "react";
import ProfileIcon from "../components/Profile/ProfileIcon";
import { NewsList, NewsListItem } from "../components/NewsContainer/NewsContainer";
import { NewsCardItem} from "../components/NewsContainer/NewsCard"
import API from "../APIs/API";
import './pagesStyle.css';

class Home extends Component {

  constructor(props) {
    super(props);
	  this.state = {
			news: [],
			topic: "",
			headlines: "headlines",
			modal: false,
			username: "",
			password: "",
			matches: window.matchMedia("(min-width: 740px)").matches,
		};
	};

	newsSearch = () => {
		API.newsSearch()
		.then( res => this.setState({news: res.data}))
			.catch(err => console.log(err));
	};

	userNewsSearchSubmit = (event) => {
		event.preventDefault();
		API.userNewsSearch(this.state.topic, this.state.headlines)
			.then( res => this.setState( {news: res.data} ))
		.catch( err => console.log(err));
		console.log(this.state.news);
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
				[name]: value
		});
		console.log(this.state.topic)
	};

	// handleOptionChange = () => {
	// 	this.setState(prevState => ({
	// 		headlines: !prevState.headlines
	// 	}));
	// 	console.log(this.state.headlines)
	// };

	handleOptionChange = changeEvent => {
		this.setState({
			headlines: changeEvent.target.value
		});
	};
	

	async componentDidMount() {

		window.matchMedia("(min-width: 740px)").addEventListener( "change", (e) => {
			this.setState({matches: e.matches})
		});

		await API.newsSearch()
		.then( res => this.setState({news: res.data}))
		.catch(err => console.log(err));
	};

	toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
	};
	
	saveAuthTokenInSession = (token) => {
    // window.localStorage.setItem('token', token) // session/local storage is a way to save information on the browser. It uses key, value ('token', token in this case)
    window.sessionStorage.setItem('token', token) // session storage may be the preferred method.
	}
	
	onClickSaveArticle = (token, id, published, author, title, image, description, url) => {
		API.saveArticle({
			token,
			id,
			published,
			author,
			title,
			image,
			description,
			url
		})
		// .then(API.incrementSavedEntries(token, id))
		.then(res => {
			alert("Article Saved.")
		});
	};

  onSubmitRegister = (event) => {
		event.preventDefault();
		if (this.state.username === "" || this.state.password === "") {
			alert("Missing username or password.")
		} else {
			fetch('/api/signin', {
				method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
				})
			})
			.then( res => res.json())
			.then( data => {
				console.log(data)
				if (data.success === 'true' && data.userId) {
					this.saveAuthTokenInSession(data.token)
					// this.setState({
					// 	id: data.id
					// })
					console.log("This is id " + this.state.id)
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
              alert("Sign in was successful!")
              this.props.userSignedIn(true);
              fetch("api/currentnews")
              .then(res => res.json())
							.then( res => this.setState({news: res}))
							console.log(this.state.news)
							this.toggleModal();
						}
					})
				} else {
					alert(data)
				}
			});
		};
  };

	render() {

		console.log(`This is headline ${this.state.headlines}; this is topic ${this.state.topic}; this is id ${this.props.id}` )

		const radioButtonStyle = {
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
		};

		console.log(this.state.news);

		return (

			<div>
			
				<div className="vertAlign3">
					<span className="picPosition">
						<ProfileIcon 
							isSignedIn={this.props.isSignedIn} 
							userSignedIn={this.props.userSignedIn} 
							toggleModal={this.toggleModal}
						/>
					</span>
					<p id="scrap"> BULLET BOARD </p>
					<p className="scrap2">A Site For Your News</p>
				</div>

				<form className="newsSearch">

					<label
						id="topic"
						htmlFor="topic">Topic: 
					</label>
					<input
						className="mx-2" 
						name="topic"
						type="text" 
						id="topic"
						value={this.state.topic}
						aria-describedby="newsTopic"
						onChange={this.handleInputChange}
						onSubmit={this.userNewsSearchSubmit}
						placeholder="Politcs, people, sports, etc"
					/>

					<div className="my-2 mx-5">

						<div className="form-check" style={radioButtonStyle}>
							<label className="headlineRadio" htmlFor="headlineRadio">
								<input 
								type="radio" 
								name="headlines" 
								value="headlines"
								checked={this.state.headlines === "headlines"}
								onChange={this.handleOptionChange}
								className="form-check-input"
								/>
								<i className="mx-1 fas fa-newspaper"></i>
								Headlines
							</label>
						</div>

						<div className="form-check" style={radioButtonStyle}>
							<label className="headlineRadio" htmlFor="headlineRadio">
								<input 
								type="radio" 
								name="headlines" 
								value="everything"
								checked={this.state.headlines === "everything"}
								onChange={this.handleOptionChange}
								className="form-check-input"
								/>
								<i class="mx-1 far fa-newspaper"></i>
								All Articles
							</label>
						</div>

					</div>

					<button
					className="buttonStyle"
					onClick={this.userNewsSearchSubmit}
					>
					Search
					</button>
				
				</form>

				{this.state.news.length === 0

					?
					<div>
						<h1 id="scrap2" style={{textAlign:"center"}}>Sorry. There were no results.</h1>
					</div>
					: 

					<NewsList>
		
						{this.state.matches && this.state.news.map( (stories, i) => (
							<NewsListItem
								key={i}
								author={stories.author}
								title={stories.title}
								image={stories.urlToImage}
								description={stories.description}
								url={stories.url}
								published={stories.source.name}
								allowSave={this.props.isSignedIn}
								onSave={() => this.onClickSaveArticle(sessionStorage.getItem('token'), this.props.id, stories.source.name, 
								stories.author, stories.title, stories.urlToImage, stories.description, stories.url)}
								/>
							)
						)};
				
						{!this.state.matches && this.state.news.map( (stories, i) => (
							<NewsCardItem
								key={i}
								author={stories.author}
								title={stories.title}
								image={stories.urlToImage}
								description={stories.description}
								url={stories.url}
								published={stories.source.name}
								allowSave={this.props.isSignedIn}
								onSave={() => this.onClickSaveArticle(sessionStorage.getItem('token'), this.props.id, stories.source.name, 
								stories.author, stories.title, stories.urlToImage, stories.description, stories.url)}
								/>
							)
						)};
			
					</NewsList>

				};

			</div>
		)
	}
}

export default Home