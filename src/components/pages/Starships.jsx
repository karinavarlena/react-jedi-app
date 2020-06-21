import React from 'react';
import Table from "../common/Table";
import Form from '../common/Form';
import NoMatch from '../common/NoMatch';
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function Starships({starships, setStarships}) {
    const { path } = useRouteMatch();    
    const history = useHistory();

    const handleAdd = (personData) => {
        const data = [...starships, personData];
        setStarships(data);
        history.push(path);
    }

    const handleChange = (starshipData, id) => {
        const data = starships.map(starship => starship.id === id? starshipData: starship);
        setStarships(data);
        history.push(path);
    }

    const handleDelete = (personData) => {
        const data = starships.filter(starship => starship.id !== personData.id);
        setStarships(data);
    }

    const getInitialStarshipsData = () => {
        return getColumnNames().reduce((cols, columnName) => ({ ...cols,[columnName]: ""}), {})
    }

    const getColumnNames = () => {
        return ["name", "model", "manufacturer", "crew"]
    }

    return (
        <Switch>
            <Route exact path={path}>
                <div className="d-flex justify-content-between my-2">
                    <h1>Starships</h1>
                    <Link className="btn btn-secondary my-2" to={`${path}/new`}>New starships</Link>
                </div>
                <Table
                    data={starships}
                    columns={getColumnNames()}
                    tableDescriptor="Starships"
                    deleteHandle={handleDelete}
                />
            </Route>
            <Route exact path={`${path}/edit/:id`}>
                <Form
                    initialData={starships}
                    columns={getColumnNames()}
                    handleData={handleChange}
                />
            </Route>
            <Route exact path={`${path}/new`}>
                <Form
                    initialData={getInitialStarshipsData()}
                    columns={getColumnNames()}
                    handleData={handleAdd}
                />
            </Route>
            <Route path={`${path}/*`}>
                <NoMatch />
            </Route>
        </Switch>
    );
}

export default Starships;
