import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Pages/Home'
import Register from './Pages/Register'
import UserPage from './Pages/UserPage';
import './App.css';

// const initialState = {
//   isSignedIn: false,
// };

class App extends Component {

  constructor() {
    super();
    this.state = {
      isSignedIn: false
    };
  };

  // componentDidMount() {
  //   const token = window.sessionStorage.getItem('token');
  //   console.log(token);
  //   if (token) {
  //     fetch('http://localhost:3001/signin', {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': token // usually use 'Bearer ' + token
  //       }
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data && data.id) {
  //         fetch(`http://localhost:3001/profile/${data.id}`, {
  //           method: 'get',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': token
  //           }
  //         })
  //         .then(res => res.json())
  //         .then(user => {
  //           if (user && user.email) {
  //             console.log(user)
  //             this.loadUser(user)
  //             this.onRouteChange('home');
  //           }
  //         })
  //       }
  //     })
  //     .catch(console.log("Don't have token or failed to work properly."));
  //   }
  // }

  userSignIn = (verify) => {
    if (verify === "true") {
      this.setState({isSignedIn: true});
    } else {
      this.setState({isSignedIn: false});
    }
  };

  render () {
    console.log(this.state.isSignedIn);
    return (
      <div>
        <Router>

          <div>

            <Switch>
              <Route exact path = "/">
                <Home isSignedIn={this.state.isSignedIn}/>
              </Route>
              <Route exact path ="/register">
                <Register userRegister={this.userSignIn}/>
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
