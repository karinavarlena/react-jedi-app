import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NoMatch from './components/common/NoMatch';
import Navigation from './components/common/Navigation';
import People from './components/pages/People';
import Planets from './components/pages/Planets';
import Starships from './components/pages/Starships';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

    return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Router>
        <Navigation />
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
