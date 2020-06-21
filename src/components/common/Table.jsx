import React from 'react';
import Button from "./Button";
import { Link, useRouteMatch } from "react-router-dom";
import { nanoid } from "nanoid";

function Table({columns, data, tableDescriptor, deleteHandle}) {
    const { path } = useRouteMatch();    

    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">{tableDescriptor}</th>
                    {columns.map(columnTitle => (
                            <th key={nanoid()} scope="col">{columnTitle}</th>
                    ))}
                    { deleteHandle? <th key="Delete" scope="col">Delete</th>: null }
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{++index}</th>
                        {columns.map(column => {
                            return (
                                column === "name" ?
                                <td key={nanoid()}><Link to={`${path}/edit/${item.id}`}>{item[column]}</Link></td>:
                                <td key={nanoid()}>{item[column]}</td>
                            )
                        })}
                        <td> { 
                            deleteHandle? 
                                <Button 
                                    label="Delete" 
                                    classes="btn btn-secondary my-0"
                                    onClick={() => deleteHandle(item)}
                                />:
                                null 
                        } </td>
                    </tr>
                ))}
                {data.length === 0 && <tr>
                    <td colspan={columns.length+2} className="text-center">No data</td>
                </tr>}
            </tbody>
        </table>
    )
}

export default Table;
