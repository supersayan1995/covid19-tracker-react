import {useEffect,useCallback,useState} from 'react';

import './StateData.scss';
import StatewiseData from './StatewiseData';

const StateData = ()=>
{
    let content=[];
    const [statewiseData,setStatewiseData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const loadData = useCallback(async()=>
    {
      setIsLoading(true);
      const response = await fetch("https://api.covid19india.org/data.json");
      const data = await response.json();
      setStatewiseData(data.statewise);
      setIsLoading(false);
    },[]);
  
    useEffect(()=>
    {
      loadData();
    },[loadData]);
    
    if(isLoading)
    {
      content=<StatewiseData key="data loading..." name="data loading..." confirmed="data loading..." active="data loading..." deaths="data loading..."></StatewiseData>;
    }
    if(!isLoading)
    {
      statewiseData.forEach((state,index)=>
      {
        if(state.statecode==="UN"||state.statecode==="TT")
        {
          
        }
        else
        {
          content.push(<StatewiseData key={index} statecode={state.statecode} name={state.state} confirmed={state.confirmed} active={state.active} deaths={state.deaths}></StatewiseData>);
        }
      });
    }

    return (
        <div id="country-stats">
        <table className="table table-striped table-bordered rounded">
            <thead className="thead-dark">
            <tr>
                <th>State Name</th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Deaths</th>
            </tr>
            </thead>
            <tbody id="tbody">
            {content}
            </tbody>
        </table>
        </div>
    );
};

export default StateData;