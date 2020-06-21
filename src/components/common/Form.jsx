import React, { useState, useEffect } from 'react';
import Input from "./Input";
import Button from "./Button";
import { useParams } from "react-router-dom";

const Form = ({columns, initialData, handleData}) => {
    const { id } = useParams();
    const [personData, setPersonData] = useState(initialData);

    useEffect(() => {
        const currentPerson = initialData.length>0? initialData.find(person => person.id === id): initialData;
        setPersonData(currentPerson)   
    }, [id, initialData]);

    const handleClick = (event) => {
        event.preventDefault();
        handleData(personData, id);
    }

    const handleChange = (event) => {
        const { currentTarget : input } = event;
        const data = {...personData};
        data[input.name] = input.value;
        setPersonData(data)
    }

    return (
        <form>
            {columns.map(columnName => (
                <Input
                key={columnName}
                name={columnName}
                label={columnName}
                value={personData[columnName]}
                type="input"
                onChange={handleChange}
                />
            ))}
            <Button
                label="Save"
                classes="btn btn-secondary my-2"
                onClick={handleClick}
            />
        </form>
    );
};

export default Form;
