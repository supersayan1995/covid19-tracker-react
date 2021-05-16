import {useEffect,useCallback,useState,Fragment} from 'react';

import {useParams} from 'react-router-dom';
import classes from './IndividualStateData.module.scss';

const IndividualStateData = ()=>
{
    let content="";
    const params=useParams();
    const statecode = params.stateid;

    const [stateData,setStateData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const loadData = useCallback(async()=>
    {
      setIsLoading(true);
      const response = await fetch("https://api.covid19india.org/data.json");
      const data = await response.json();
      const statewiseData = data.statewise;
      statewiseData.forEach((state)=>
      {
          if(state.statecode===statecode)
          {
              console.log(state);
              setStateData(state);
          }
      });
      setIsLoading(false);
    },[statecode]);

    useEffect(()=>
    {
      loadData();
    },[loadData]);
    
    if(isLoading)
    {
      content=<h3>Data Loading...</h3>
    }
    if(!isLoading)
    {
      content=<div className={classes["current-state-data"]}>
                <h2 className={classes["state-name"]}>{stateData.state}</h2>
                <h3>Confirmed: <span className={classes["state-confirmed"]}>{stateData.confirmed}</span></h3>
                <h3>Active: <span className={classes["state-active"]}>{stateData.active}</span></h3>
                <h3>Deaths: <span className={classes["state-deaths"]}>{stateData.deaths}</span></h3>
                <h3>Recovered: <span className={classes["state-recovered"]}>{stateData.recovered}</span></h3>
                <h3>Last Updated: <span className={classes["state-last-updated"]}>{stateData.lastupdatedtime}</span></h3>
            </div>
    }

    return(
        <Fragment>
            {content}
        </Fragment>
    );
};

export default IndividualStateData;