import React from 'react';
import {Link,useRouteMatch} from 'react-router-dom';

import classes from './StatewiseData.module.scss';

const StatewiseData = (props)=>
{
    const match = useRouteMatch();
    return(
        <tr>
            <td><Link to={`${match.url}/${props.statecode}`} className={classes["statewise-link"]}>{props.name}</Link></td>
            <td>{props.confirmed}</td>
            <td>{props.active}</td>
            <td>{props.deaths}</td>
        </tr>
    );
};

export default StatewiseData;