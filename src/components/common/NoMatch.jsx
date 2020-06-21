import React from 'react';
import { useLocation } from "react-router-dom";

function NoMatch() {
    let location = useLocation();
    return ( 
        <div className="jumbotron alert alert-danger" role="alert">
            <h1 className="display-4">NOT FOUND</h1>
            <p className="lead">No match for <code>{location.pathname}</code></p> 
        </div>
    )
}

export default NoMatch;