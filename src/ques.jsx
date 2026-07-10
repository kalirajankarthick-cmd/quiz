import React, { useState, useEffect } from 'react';
import './App.css'
import Quest from "../quizjson.json";

function Ques(){
    const [que, setQue] = useState([]);
    const [answer,setAnswer] = useState(null);
    useEffect(()=>{ 
setQue(Quest.questions);
    },[])

    const handle=(id)=>{
setAnswer(id);
    }
    return(<><h1>Question</h1>
    {que.map((St)=>(
        <div  className="Yooo" key={St.id}>
        <span className="Yoo"onClick={()=>handle(St.id)}>{St.question}</span>
         <div className="Yo">{answer === St.id && (<p>Answer:        {St.answer}</p>)}</div>
        </div>
    ))}
   
    </>);
}
export default Ques; 