import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Header from "../components/Header/Header";
import ProfileIcon from "../components/Profile/ProfileIcon";
import { NewsList, NewsListItem } from "../components/NewsContainer/NewsContainer";
import API from "../APIs/API";
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props);
	  this.state = {
			news: [],
			topic: "",
			headlines: true,
		};
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

	// <label htmlFor="country">Country</label>
	// <input 
	// className="mx-2" 
	// name="country"
	// type="text" 
	// id="topic"
	// value={this.state.country}
	// aria-describedby="newsCountry"
	// onChange={this.handleInputChange}
	// onSubmit={this.userNewsSearchSubmit}
	// placeholder="USA, Canada, Iceland, Chad, etc" 
	// />

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

	// handleOptionChange = event => {
	// 	this.setState({
	// 			headlines: event.target.value 
	// 	});
	// 	console.log(this.state.headlines)
	// };

	handleOptionChange2 = () => {
		this.setState(prevState => ({
			headlines: !prevState.headlines
		}));
		console.log(this.state.headlines)
	};

	async componentDidMount() {
		await API.newsSearch()
		.then( res => this.setState({news: res.data}))
			.catch(err => console.log(err));
	}

	render() {

		const newsButtonStyle = {
			height: "10vh",
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			// textAlign: "center",
			backgroundColor: "yellow",
		};
		
		const radioButtonStyle = {
			// borderStyle: "solid",
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
		};

		(console.log(this.props.isSignedIn))

		return (

			<div>

				<Header>
					<ProfileIcon/>
				</Header>


				<Row>

					<Col>

						<div className="vertAlign">
							<p id="scrap"> SCRAP </p>
							<p class="scrap2">A Site For Your News</p>
						</div>

					</Col>
		
				</Row>


				<Row>

					<Col>

						<form style={newsButtonStyle}>

							<label htmlFor="topic">Topic: </label>
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

							<div className="mx-2">

								<div className="radio" style={radioButtonStyle}>
									<label className="headlineRadio" htmlFor="headlineRadio">
										<input 
										type="radio" 
										name="headlines" 
										value={true}
										// checked={this.state.headlines === "option1"}
										onChange={this.handleOptionChange2}
										/>
										Headlines
									</label>
								</div>

								<div className="radio" style={radioButtonStyle}>
									<label className="headlineRadio" htmlFor="headlineRadio">
										<input 
										type="radio" 
										name="headlines" 
										value={false}
										// checked={this.state.headlines === "option2"}
										onChange={this.handleOptionChange2}
										/>
										Everything
									</label>
								</div>

							</div>

							<button style={{color:"dodgerblue"}}				
							onClick={this.userNewsSearchSubmit}
							>
							Search
							</button>
						
						</form>
					
					</Col>
				
				</Row>

				
				<Row>

					<Col>

					{this.state.news.length === 0
						?
							<div>
								<h1 id="scrap2" style={{textAlign:"center"}}>Sorry. There were no results.</h1>
							</div>
						: 
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
								allowSave={this.props.isSignedIn}
								OnSave={() => alert("This is a test.")}
								/>
							)
						)};
					</NewsList>						
					}

					</Col>
					
				</Row>

			</div>
		)
	}
}

export default Home

// <div className="radio" style={radioButtonStyle}>
// <label className="headlineRadio">
// 	<input 
// 	type="radio" 
// 	name="headlineRadio" 
// 	value={true} 
// 	checked={this.state.headlines === true}
// 	onChange={this.handleOptionChange}
// 	/>
// 	Headlines
// </label>
// </div>

// <div className="radio" style={radioButtonStyle}>
// <label className="headlineRadio">
// 	<input 
// 	type="radio" 
// 	name="headlineRadio" 
// 	value={false} 
// 	checked={this.state.headlines === false}
// 	onChange={this.handleOptionChange}
// 	/>
// 	Everything
// </label>
// </div>
