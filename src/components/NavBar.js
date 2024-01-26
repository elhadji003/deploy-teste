import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = () => {
    return (
        <div className='navbar'>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/propos">A-propos</Link>
                <Link to="/contact">Contact</Link>
            </ul>
        </div>
    );
};

export default NavBar;