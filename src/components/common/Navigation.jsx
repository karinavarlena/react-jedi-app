import React from 'react';
import { Link, withRouter } from "react-router-dom";

function Navigation({ location }) {
    
    return (
        <nav id="sidebar" className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname.includes('people')?'active':''}`} to="/people">People</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname.includes('planets')?'active':''}`} to="/planets">Planets</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname.includes('starships')?'active':''}`} to="/starships">Starships</Link>
                </li>
            </ul>
        </nav>
    );
}

export default withRouter(Navigation);
