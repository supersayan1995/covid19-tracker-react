import {useEffect,useCallback,useState, Fragment} from 'react';
import {Line} from 'react-chartjs-2';

import classes from './CountryData.module.scss';

const CountryData = ()=>
{
    let content;
    const [countrywiseData,setCountrywiseData] = useState([]);
    const [labelsForCharts,setlabelsForCharts] = useState([]);
    const [dailyConfirmedArr,setDailyConfirmedArr] = useState([]);
    const [dailyNewCases,setDailyNewCases] = useState(0);
    const [dailyDeceased,setDailyDeceased] = useState(0);
    const [dailyRecovered,setDailyRecovered] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const loadTotalCountryData = useCallback(async()=>
    {
      setIsLoading(true);
      const response = await fetch("https://api.covid19india.org/data.json");
      const data = await response.json();
      const timeSeries = data.cases_time_series;
      setCountrywiseData(data.statewise.find((state)=>state.statecode==="TT"));
      setlabelsForCharts(timeSeries.map(day=>day.date));
      setDailyConfirmedArr(timeSeries.map(day=>day.dailyconfirmed));
      setDailyNewCases(timeSeries[timeSeries.length-1].dailyconfirmed);
      setDailyDeceased(timeSeries[timeSeries.length-1].dailydeceased);
      setDailyRecovered(timeSeries[timeSeries.length-1].dailyrecovered);
      setIsLoading(false);
    },[]);
  
    useEffect(()=>
    {
      loadTotalCountryData();
    },[loadTotalCountryData]);

    if(isLoading)
    {
      content=
      <Fragment>
        <td className={classes["td-total"]}>Data Loading...</td>
        <td className={classes["td-active"]}>Data Loading...</td>
        <td className={classes["td-deaths"]}>Data Loading...</td>
        <td className={classes["td-recovered"]}>Data Loading...</td>
      </Fragment>
    }
    if(!isLoading)
    {
        content=
        <Fragment>
        <td className={classes["td-total"]}>{countrywiseData.confirmed} <span className={classes["daily-confirmed"]}>(+{dailyNewCases})</span></td>
        <td className={classes["td-active"]}>{countrywiseData.active}</td>
        <td className={classes["td-deaths"]}>{countrywiseData.deaths} <span className={classes["daily-deceased"]}>(+{dailyDeceased})</span></td>
        <td className={classes["td-recovered"]}>{countrywiseData.recovered} <span className={classes["daily-recovered"]}>(+{dailyRecovered})</span></td>
      </Fragment>
    }

    const chartData = (canvas)=>
    {
        return{
            labels:labelsForCharts,
            datasets:
            [{
                label:"Daily Confirmed",
                data:dailyConfirmedArr,
                backgroundColor:"#000",
                borderColor:"#777"
            }]
        };
    };

    const chartOptions = 
    {
        plugins: 
        {
            title: 
            {
                display: true,
                text: 'New Cases Daily in India',
                color:"#000",
                font:
                {
                    weight:"bold",
                    size:25
                }
            },
            legend:
            {
                display:false
            }
        },
        responsive:true,
        maintainAspectRatio:false
    }

    return(
        <div className={classes["countrywise-data"]}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Total</th>
                        <th>Active</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {content}
                    </tr>
                </tbody>
            </table>
            <div className={classes["chart"]}>
                <Line data={chartData} options={chartOptions}/>
            </div>
        </div>
    );
};

export default CountryData;