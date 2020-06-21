import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import Form from '../common/Form';
import NoMatch from '../common/NoMatch';
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


function People({people, setPeople}) {
    const { path } = useRouteMatch();    
    const history = useHistory();
    

    const handleAppPerson = (personData) => {
        const data = [...people, personData];
        setPeople(data);
        history.push(path);
    }

    const handleChangePerson = (personData, id) => {
        const data = people.map(person => person.id === id?personData:person);
        setPeople(data);
        history.push(path);
    }

    const handleDeletePerson = (personData) => {
        const data = people.filter(person => person.id !== personData.id);
        setPeople(data);
    }

    const getInitialPeopleData = () => {
        return getColumnNames().reduce((cols, columnName) => ({ ...cols,[columnName]: ""}), {})
    }

    const getColumnNames = () => {
        return ["name", "height", "mass", "gender", "birth_year"]
    }

    return (
        <Switch>
            <Route exact path={path}>
                <div className="d-flex justify-content-between my-2">
                    <h1>People</h1>
                    <Link className="btn btn-secondary my-2" to={`${path}/new`}>New people</Link>
                </div>
                <Table
                    data={people}
                    columns={getColumnNames()}
                    tableDescriptor="People"
                    deleteHandle={handleDeletePerson}
                />
            </Route>
            <Route exact path={`${path}/edit/:id`}>
                <Form
                    initialData={people}
                    columns={getColumnNames()}
                    handleData={handleChangePerson}
                />
            </Route>
            <Route exact path={`${path}/new`}>
                <Form
                    initialData={getInitialPeopleData()}
                    columns={getColumnNames()}
                    handleData={handleAppPerson}
                />
            </Route>
        </Switch>
    );
}

export default People;
