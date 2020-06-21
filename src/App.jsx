import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NoMatch from './components/common/NoMatch';
import Navbar from './components/common/Navbar';
import People from './components/pages/People';
import Planets from './components/pages/Planets';
import Starships from './components/pages/Starships';
import  { getPeople, getPlanets, getStarships, updateLocalStorage } from "./services/swApiService";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
    const [people, setPeopleState] = useState([]);
    const [planets, setplanetsState] = useState([]);
    const [starships, setStarshipsState] = useState([])

    const setPeople = (data) => {
        setPeopleState(data);
        updateLocalStorage('people', data); 
    }

    const setPlanets = (data) => {
        setplanetsState(data);
        updateLocalStorage('planets', data); 
    }

    const setStarships = (data) => {
        setStarshipsState(data);
        updateLocalStorage('starships', data); 
    }

    useEffect(() => {
        const setData = async () => {
            getPeople().then(data => setPeople(data))
            getPlanets().then(data => setPlanets(data))
            getStarships().then(data => setStarships(data))
        }
        setData()
    }, [])

    return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Router>
        <Navbar />
            <div className="container-fluid py-5">
                <Switch>
                    <Redirect exact from="/" to={{pathname: "/people", state: { from: "/" }}}/>
                    <Route path="/people" render={() => (<People people={people} setPeople={setPeople} />)} />
                    <Route path="/planets" render={() => (<Planets planets={planets} setPlanets={setPlanets} />)} />
                    <Route path="/starships" render={() => (<Starships starships={starships} setStarships={setStarships} />)} />
                    <Route exact from="*" to="/not-found" component={NoMatch} />
                </Switch>
            </div>
        </Router>
    </div>
    );
}

export default App;
