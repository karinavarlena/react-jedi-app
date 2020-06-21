import React from 'react';

const Input = ({name, label, error, ...rest}) => {
    return (
        <div className={`form-group ${error && 'my-0'}`}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                {...rest}
                className={`form-control ${error && 'is-invalid'}`}
            />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default Input;
