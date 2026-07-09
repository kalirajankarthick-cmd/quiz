

import {useState} from 'react';
import {useEffect} from 'react';
import './App.css';

function Weather() {
    const [serach, setSearch] = useState("");
    useEffect(()=>
    {
aysnc const Op = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}');
    },[]);

    return (

        <div className="weather">
            <h1>Weather App</h1>
            <input type ="text" value={} 
            placeholder='enter the city' onChange={(e)=>setSearch(e.target.value)}/>
            <h1>{search}</h1>
        </div>
    )
}
export default Weather;