import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import NoMatch from './components/common/NoMatch';
import People from './components/pages/People';
import Planets from './components/pages/Planets';
import Starships from './components/pages/Starships';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
    return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Router>
            <nav id="sidebar" className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/people">People</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/planets">Planets</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/starships">Starships</Link>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid py-5">
                <Switch>
                    <Route exact path="/">
                        <Redirect
                            to={{
                                pathname: "/people",
                                state: { from: "/" }
                            }}
                        />
                    </Route>
                    <Route path="/people">
                        <People/>
                    </Route>
                    <Route path="/planets">
                        <Planets/>
                    </Route>
                    <Route path="/starships">
                        <Starships />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
    );
}

export default App;
