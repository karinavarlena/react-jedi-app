import React, { useState, useEffect } from 'react';
import Input from "./Input";
import Button from "./Button";
import { useParams } from "react-router-dom";
import Joi from '@hapi/joi';
import { nanoid } from "nanoid";


const Form = ({columns, initialData, handleData}) => {
    const { id } = useParams();
    const [personData, setPersonData] = useState(initialData);
    const [errors, setErrors] = useState(Object.keys(personData).reduce((res, key)=>({...res, [key]:''}), {}));

    const rules = {
        id: Joi.required(),
        name: Joi.string().min(3).max(30).required(),
        height: Joi.number().integer().min(1).max(1000).required(),
        mass: Joi.number().integer().min(1).max(1000).required(),
        gender: Joi.string().alphanum().min(3).max(30).required(),
        birth_year: Joi.string().alphanum().min(3).max(10).required(),
        rotation_period: Joi.number().integer().min(1).max(10000).required(),
        orbital_period: Joi.number().integer().min(1).max(10000).required(),
        diameter: Joi.number().integer().min(1).max(1000000000).required(),
        model: Joi.string().min(3).max(1000).required(),
        manufacturer: Joi.string().min(3).max(1000).required(),
        crew: Joi.string().required()
    };

    useEffect(() => {
        const currentPerson = initialData.length>0? initialData.find(person => person.id === id): initialData;
        setPersonData(currentPerson)   
    }, [id, initialData]);

    const checkAllValidation = () => {
        let errorsCopy = {...errors};
        let hasError = false;

        Object.keys(personData).forEach(key => {
            const schema = Joi.object({[key]: rules[key]});
            const validation = schema.validate({[key]: personData[key]});
            const errorMessage = validation.error? validation.error.details[0].message: '';
            errorsCopy[key] = errorMessage;
            hasError = hasError || errorMessage.length>0;
        })

        setErrors(errorsCopy);
        return hasError;
    }

    const handleClick = (event) => {
        event.preventDefault();
        const data = {...personData, id: nanoid()};
        const hasError = checkAllValidation()
        !hasError && handleData(data, id);
    }

    const handleChange = (event) => {
        const { currentTarget : input } = event;
        const data = {...personData};
        data[input.name] = input.value;
        setPersonData(data)

        const schema = Joi.object({[input.name]: rules[input.name]});
        const validation = schema.validate({[input.name]: input.value});
        const errorMessage = validation.error? validation.error.details[0].message: '';
        const error = {...errors, [input.name]: errorMessage};
        setErrors(error)
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
                error={errors[columnName]}
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
