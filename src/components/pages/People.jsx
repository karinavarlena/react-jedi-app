import React, { useState } from "react";
import Table from "../common/Table";
import Form from '../common/Form';
import NoMatch from '../common/NoMatch';
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const data = [
    {first: 'Mark', last: 'Otto', handle: '@motto', id: '1'},
    {first: 'Carl', last: 'Reno', handle: '@ceno', id: '2'},
    {first: 'Steve', last: 'Smith', handle: '@ssteve', id: '3'}
]

const columns = Object.keys(data[0]);

function People() {
    const [people, setPeople] = useState(data);
    const { path } = useRouteMatch();    
    const history = useHistory();

    const handleAppPerson = (personData) => {
        const data = [...people, personData];
        setPeople(data);
        history.push(path);
    }

    const handleDeletePerson = (personData) => {
        const data = people.filter(person => person.id !== personData.id);
        setPeople(data);
    }

    const getInitialPeopleData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    return (
        <Switch>
            <Route exact path={path}>
                <Link className="btn btn-secondary my-2" to={`${path}/new`}>New people</Link>
                <Table
                    data={people}
                    columns={columns}
                    tableDescriptor="People"
                    deleteHandle={handleDeletePerson}
                />
            </Route>
            <Route exact path={`${path}/new`}>
                <Form
                    initialData={getInitialPeopleData()}
                    columns={columns}
                    onAddData={handleAppPerson}
                />
            </Route>
            <Route path={`${path}/*`}>
                <NoMatch />
            </Route>
        </Switch>
    );
}

export default People;
