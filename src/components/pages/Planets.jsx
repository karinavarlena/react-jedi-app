import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import Form from '../common/Form';
import NoMatch from '../common/NoMatch';
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import  { getPlanets } from "../../services/swApiService";


function Planets() {
    const [planets, setPlanets] = useState([]);
    const { path } = useRouteMatch();    
    const history = useHistory();
    
    useEffect(() => {
        const getData = async () => {
            const data = await getPlanets()
            const idField = Object.keys(data[0])[0];
            let planetsData = data.map(elem => {
                elem.id = elem[idField];
                delete elem[idField]; 
                return elem;
            })
            setPlanets(planetsData)
        }
        getData()
    }, [])

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
        const data = planets.filter(planet => JSON.stringify(planet) !== JSON.stringify(planetData));
        setPlanets(data);
    }

    const getInitialPlanetsData = () => {
        return planets.length>0 ?
            Object.keys(planets[0]).reduce((cols, columnName) => {
                cols[columnName] = "";
                return cols;
            }, {}):
            []
    }

    const getColumnNames = () => {
        if (!planets.length) {
            return ["planets", "rotation_period", "orbital_period", "diameter", "name", "delete"]
        }

        return Object.keys(planets[0])
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
            <Route path={`${path}/*`}>
                <NoMatch />
            </Route>
        </Switch>
    );
}

export default Planets;
