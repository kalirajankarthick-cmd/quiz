import React,{useState,useEffect} from "react";
import './App.css';
function Spinner() { 
    const [user,setUser] = useState('please give a advice');
    const [count , setCount] = useState(0);
  

    async function getAdvice() {
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        setUser(data.slip.advice)
        setCount(count + 1);
    }  
    
   
    return (
        <div className="spinner">

           <div> {user}</div>
           <button onClick={getAdvice}>click me</button>

           <p>{count}</p>

           
        </div>
    );
 }
export default Spinner;