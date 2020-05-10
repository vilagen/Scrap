import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login';
import UserPage from './Pages/UserPage';
import ProfileIcon from "./components/Profile/ProfileIcon";
import './App.css';

// const initialState = {
//   isSignedIn: false,
// };

const initialState = {
  isSignedIn: false,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    savedEntries: '',
    joined: '',
    redirect: null,
    invisible: false,
    // modal: false,
  }
};

class App extends Component {

  constructor() {
    super();
    this.state = initialState
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
              });
						};
					});
				};
			})
			.catch(console.log("Don't have token or failed to work properly."));
		} else {
      this.setState({ 
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        savedEntries: '',
        joined: '',
        isSignedIn: false,
      });
    }
  }

  userSignIn = (verify) => {
    if (verify === "true") {
      this.setState({isSignedIn: true});
    } else {
      this.setState({isSignedIn: false});
    }
  };

  userSignOut = (signedOut) => {
    if (signedOut === "true") {
      this.setState( {redirect: "/"});
    };
  };
  

  render () {
  
    return (
      <div>
        <Router>

          <div> 

            <Switch>
              <Route exact path = "/">
                <Home 
                  id={this.state.id}
                  isSignedIn={this.state.isSignedIn} 
                  userSignedIn={this.userSignIn} />
              </Route>
              <Route exact path ="/register">
                <Register userRegister={this.userSignIn}/>
              </Route>
              <Route exact path ="/login">
                <Login userSignin={this.userSignIn}/>
              </Route>
              <Route exact path ="/profile">
                <UserPage 
                  id={this.state.id}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  username={this.state.username}
                  email={this.state.email}
                  savedEntries={this.state.savedEntries}
                  articles={this.state.articles}
                  isSignedIn={this.state.isSignedIn}
                  userSignedIn={this.userSignIn}
                />
              </Route>
            </Switch>

          </div>
        </Router>
      </div>
   );
  }
}

export default App;


// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//       </header>
//     </div>
//   );
// }

// export default App;
