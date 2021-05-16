import {NavLink} from 'react-router-dom';

import classes from './AppNavigation.module.scss';

const AppNavigation = ()=>
{
    return(
        <nav className={classes["app-nav"]}>
            <div className={classes["app-links"]}>
                <ul>
                    <li><NavLink activeClassName={classes["link-active"]} to="/country-data">CountryWise Data</NavLink></li>
                    <li><NavLink activeClassName={classes["link-active"]} to="/state-data">StateWise Data</NavLink></li>
                </ul>
            </div>
        </nav>
    );
};

export default AppNavigation;