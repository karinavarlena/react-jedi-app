import React, { useState } from 'react';
import Table from "../common/Table";
import Form from '../common/Form';
import NoMatch from '../common/NoMatch';
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const data = [
    {starship: 'X-20 Dyna Soar', state: 'project not implemented'},
    {starship: 'Spiral', state: 'project not implemented'},
    {starship: 'LKS',  state: 'project not implemented'},
    {starship: 'Space Shuttle', state: '135 flights'},
    {starship: 'X-30 NASP', state: 'project suspended'},
    {starship: 'VentureStar', state: 'project suspended'},
    {starship: 'ROTON', state: 'project suspended'},
    {starship: 'Delta Clipper', state: 'opened'},
]

const columns = Object.keys(data[0]);

function Starships() {
    const [starships, setStarships] = useState(data);
    const { path } = useRouteMatch();    
    const history = useHistory();

    const handleAdd = (personData) => {
        const data = [...starships, personData];
        setStarships(data);
        history.push(path);
    }

    const handleDelete = (personData) => {
        const data = starships.filter(({starship}) => starship !== personData.starship);
        setStarships(data);
    }

    const getInitialStarshipsData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    return (
        <Switch>
            <Route exact path={path}>
                <Link className="btn btn-secondary my-2" to={`${path}/new`}>New starships</Link>
                <Table
                    data={starships}
                    columns={columns}
                    tableDescriptor="Starships"
                    deleteHandle={handleDelete}
                />
            </Route>
            <Route exact path={`${path}/new`}>
                <Form
                    initialData={getInitialStarshipsData()}
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

export default Starships;
