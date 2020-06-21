import React from 'react';
import Button from "./Button";

function Table({columns, data, tableDescriptor, deleteHandle}) {
    return (
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope="col">{tableDescriptor}</th>
                {columns.map(columnTitle => (
                    <th key={columnTitle} scope="col">{columnTitle}</th>
                ))}
                { deleteHandle? <th key="Delete" scope="col">Delete</th>: null }
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{++index}</th>
                    {columns.map(columnTitle => (
                        <td key={item[columnTitle]+columnTitle}>{item[columnTitle]}</td>
                    ))}
                    <td>
                        { deleteHandle? 
                            <Button 
                                label="Delete" 
                                classes="btn btn-secondary my-0"
                                onClick={() => deleteHandle(item)}
                            />:
                             null
                        }
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;
