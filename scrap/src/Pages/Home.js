import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Header from "../components/Header/Header";
import { NewsList, NewsListItem } from "../components/NewsContainer/NewsContainer";
import API from "../APIs/API";
import './style.css';

const initialState = {
  isSigned: false,
	news: [], // change this to just news
	topic: "",
	country: "",
};

class Home extends Component {
  constructor() {
    super();
	  this.state = initialState;
	};

	newsSearch = () => {
		API.newsSearch()
		.then( res => this.setState({news: res.data}))
			.catch(err => console.log(err));
	};

	// userNewsSearchSubmit = (event) => {
	// 	event.preventDefault();
	// 	API.userNewsSearch(this.state.topic, this.state.country)
	// 		.then( ( { data: {items} } ) => {
	// 			let newArray = items
	// 			if(newArray === undefined) {
	// 				newArray = [];
	// 			}
	// 			this.setState({ news: newArray })
	// 		})
	// 	.catch( err => console.log(err));
	// 	console.log(this.state.news);
	// };

	userNewsSearchSubmit = (event) => {
		event.preventDefault();
		API.userNewsSearch(this.state.topic, this.state.country)
			.then( res => this.setState( {news: res.data} ))
		.catch( err => console.log(err));
		console.log(this.state.news);
	};


	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
				[name]: value
		});
		console.log(value)
		console.log(name)
	};

	async componentDidMount() {
		await API.newsSearch()
		.then( res => this.setState({news: res.data}))
			.catch(err => console.log(err));
	}

	consoleThis = () => {
		console.log(this.state.news);
  }
  
	render() {

		const newsButtonStyle = {
			height: "10vh",
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			backgroundColor: "yellow",
    };

		return (
			<div>

				<Header></Header>

				<Row>

					<Col xs={12}>

						<div id="jumboBox">

							<div className="vertAlign">
								<p id="scrap"> SCRAP </p>
								<h5 id="scrap2">A Site For Your News</h5>
							</div>

						</div>

					</Col>
		
				</Row>

				<Row style={newsButtonStyle}>

					<Col xs={12}>

						<div>

							<form>

								<label htmlFor="topic">Topic</label>
								<input
								className="mx-2" 
								name="topic"
								type="text" 
								id="topic"
								value={this.state.topic}
								aria-describedby="newsTopic"
								onChange={this.handleInputChange}
								onSubmit={this.userNewsSearchSubmit}
								placeholder="Politics, Sports, Technology, etc"
								/>

								<label htmlFor="country">Country</label>
								<input 
								className="mx-2" 
								name="country"
								type="text" 
								id="topic"
								value={this.state.country}
								aria-describedby="newsCountry"
								onChange={this.handleInputChange}
								onSubmit={this.userNewsSearchSubmit}
								placeholder="USA, Canada, Iceland, Chad, etc" 
								/>

								<button style={{color:"dodgerblue"}}				
								onClick={this.userNewsSearchSubmit}
								>
								Search
								</button>
							
							</form>

						</div>


						
					</Col>
				
				</Row>

					<Row>

					<Col xs={12}>

						<NewsList>
							{this.state.news.map( (stories, i) => (
								<NewsListItem
									key={i}
									source={stories.source.id}
									author={stories.author}
									title={stories.title}
									image={stories.urlToImage}
									description={stories.description}
									url={stories.url}
									published={stories.published}
									/>
								)
							)};
						</NewsList>

					</Col>
					
				</Row>




			</div>
		)
	}
}

export default Home