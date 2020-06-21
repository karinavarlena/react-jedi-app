import React, { useState } from 'react';
import Table from "../common/Table";
import Form from '../common/Form';
import NoMatch from '../common/NoMatch';
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const data = [
    {name: 'Mercury', icon: '☿', radius: '0,39', massa: '0,06'},
    {name: 'Venus', icon: '♀', radius: '0,72', massa: '0,82'},
    {name: 'Earth', icon: '⊕', radius: '1,00', massa: '1,00'},
    {name: 'Mars', icon: '♂', radius: '1,52', massa: '0,11'},
    {name: 'Jupiter', icon: '♃', radius: '5,20', massa: '317,8'},
    {name: 'Saturn', icon: '♄', radius: '9,54', massa: '95,2'},
    {name: 'Uranus', icon: '♅', radius: '19,22', massa: '14,6'},
    {name: 'Neptune', icon: '♆', radius: '30,06', massa: '17,2'},
]

const columns = Object.keys(data[0]);

function Planets() {
    const [planets, setPlanets] = useState(data);
    const { path } = useRouteMatch();    
    const history = useHistory();

    const handleAdd = (personData) => {
        const data = [...planets, personData];
        setPlanets(data);
        history.push(path);
    }
    
    const handleDelete = (personData) => {
        const data = planets.filter(({name}) => name !== personData.name);
        setPlanets(data);
    }

    const getInitialPlanetsData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    return (
    <Switch>
        <Route exact path={path}>
            <Link className="btn btn-secondary my-2" to={`${path}/new`}>New planets</Link>
            <Table
                data={planets}
                columns={columns}
                tableDescriptor="Planets"
                deleteHandle={handleDelete}
            />
        </Route>
        <Route exact path={`${path}/new`}>
            <Form
                initialData={getInitialPlanetsData()}
                columns={columns}
                onAddData={handleAdd}
            />
        </Route>
        <Route path={`${path}/*`}>
            <NoMatch />
        </Route>
    </Switch>
    );
}

export default Planets;
