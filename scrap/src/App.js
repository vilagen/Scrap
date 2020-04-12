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
              <Route exact path = "/" component ={Home} />
              <Route exact path ="/register">
                <Register userSignIn={this.userSignIn}/>
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
