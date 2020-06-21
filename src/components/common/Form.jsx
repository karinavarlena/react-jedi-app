import React from 'react';
import Input from "./Input";
import Button from "./Button";
import { withRouter } from "react-router-dom";
import Joi from '@hapi/joi';

class Form extends React.Component {
    constructor(props) {
        super(props);
        
        const { initialData, columns, match } = this.props;
        const {id} = match.params;
        
        this.state = {
            columns,
            initialData,
            personData: initialData.length>0? initialData.find(person => person.id === id): initialData,
            error: columns.reduce((res, col) =>({...res, ...{[col]: ''}}), {})
        }
    }
    static getDerivedStateFromProps(props, state){
        if(JSON.stringify(props.initialData) !== JSON.stringify(state.initialData)) {
            
            const { initialData } = props;
            const data = initialData.length>0? initialData.find(person => person.id === props.match.params.id): initialData;

            return { ...state, ...{initialData, personData: data}};
        }
        return null;
    }
    
    rules = {
        id: Joi.string().min(3).max(30).required(),
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

    
    handleClick = (event) => {
        event.preventDefault();
        const hasError = this.checkAllValidation()
        !hasError && this.props.handleData(this.state.personData, this.props.match.params.id);
    }

    handleChange = (event) => {
        const { currentTarget : input } = event;
        const data = {...this.state.personData};
        data[input.name] = input.value;   
        this.setState({personData: data})
    }

    handleBlur = (event) => {
        const { currentTarget : input } = event;
        
        const schema = Joi.object({[input.name]: this.rules[input.name]});
        const validation = schema.validate({[input.name]: input.value});
        
        const errorMessage = validation.error? validation.error.details[0].message: '';
        const error = {...this.state.error, ...{[input.name]: errorMessage}}
        
        this.setState({error})
    }

    checkAllValidation = () => {
        let { error } = this.state;
        let hasError = false;

        Object.keys(this.state.personData).forEach(key => {
            const schema = Joi.object({[key]: this.rules[key]});
            const validation = schema.validate({[key]: this.state.personData[key]});
            const errorMessage = validation.error? validation.error.details[0].message: '';
            error = {...error, ...{[key]: errorMessage}};
            hasError = hasError || errorMessage.length>0;
        })

        this.setState({error});
        return hasError;
    }

    render() {
        return (
            <form className="col-md-8 mx-auto">
                {this.state.columns.map(columnName => (
                    <Input
                    key={columnName}
                    name={columnName}
                    label={columnName}
                    value={this.state.personData[columnName]}
                    type="input"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    error={this.state.error[columnName]}
                    />  
                ))}
                <Button
                    label="Save"
                    classes="btn btn-secondary my-2"
                    onClick={this.handleClick}
                />
            </form>
        );
    };
};

export default withRouter(Form);
