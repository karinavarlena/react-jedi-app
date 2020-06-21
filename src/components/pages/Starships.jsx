import React, { useEffect, useState } from 'react';
import Table from "../common/Table";
import Form from '../common/Form';
import NoMatch from '../common/NoMatch';
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import  { getStarships } from "../../services/swApiService";

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

function Starships() {
    const [starships, setStarships] = useState(data);
    const { path } = useRouteMatch();    
    const history = useHistory();

    useEffect(() => {
        const getData = async () => {
            const data = await getStarships()
            const idField = Object.keys(data[0])[0];
            let starshipsData = data.map(elem => {
                elem.id = elem[idField];
                delete elem[idField]; 
                return elem;
            })
            setStarships(starshipsData)
        }
        getData()
    }, [])

    const handleAdd = (personData) => {
        const data = [...starships, personData];
        setStarships(data);
        history.push(path);
    }

    const handleChange = (starshipData, id) => {
        const data = starships.map(planet => planet.id === id? starshipData: planet);
        setStarships(data);
        history.push(path);
    }

    const handleDelete = (personData) => {
        const data = starships.filter(({starship}) => starship !== personData.starship);
        setStarships(data);
    }

    const getInitialStarshipsData = () => {
        return starships.length>0 ?
        Object.keys(starships[0]).reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {}):
        []
    }

    const getColumnNames = () => {
        if (!starships.length) {
            return []
        }

        return Object.keys(starships[0])
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
