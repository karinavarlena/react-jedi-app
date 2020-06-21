import React from "react";
import Table from "../common/Table";
import Form from '../common/Form';
import NoMatch from '../common/NoMatch';
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


function Planets({planets, setPlanets}) {
    const { path } = useRouteMatch();    
    const history = useHistory();

    const handleAppPlanets = (planetData) => {
        const data = [...planets, planetData];
        setPlanets(data);
        history.push(path);
    }

    const handleChangePlanets = (planetData, id) => {
        const data = planets.map(planet => planet.id === id? planetData: planet);
        setPlanets(data);
        history.push(path);
    }

    const handleDeletePlanets = (planetData) => {
        const data = planets.filter(planet => planet.id !== planetData.id);
        setPlanets(data);
    }

    const getInitialPlanetsData = () => {
        return getColumnNames().reduce((cols, columnName) => ({ ...cols,[columnName]: ""}), {})
    }


    const getColumnNames = () => {
        return ["name", "rotation_period", "orbital_period", "diameter"]
    }

    return (
        <Switch>
            <Route exact path={path}>
                <div className="d-flex justify-content-between my-2">
                    <h1>Planets</h1>
                    <Link className="btn btn-secondary my-2" to={`${path}/new`}>New planet</Link>
                </div>
                <Table
                    data={planets}
                    columns={getColumnNames()}
                    tableDescriptor="Planets"
                    deleteHandle={handleDeletePlanets}
                />
            </Route>
            <Route exact path={`${path}/edit/:id`}>
                <Form
                    initialData={planets}
                    columns={getColumnNames()}
                    handleData={handleChangePlanets}
                />
            </Route>
            <Route exact path={`${path}/new`}>
                <Form
                    initialData={getInitialPlanetsData()}
                    columns={getColumnNames()}
                    handleData={handleAppPlanets}
                />
            </Route>
        </Switch>
    );
}

export default Planets;
