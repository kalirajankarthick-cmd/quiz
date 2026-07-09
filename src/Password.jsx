import React, { useState, useEffect } from 'react';
import './App.css';

function Password(){

    const [input, setInput] = useState(8);

    const [upper, setUpper] = useState(false);
    const [lower,setLower]=useState(false);
    const [special, setSpecial] = useState(false);
    const [num, setNum] = useState(false);
    const [pass, setPass] = useState(false);

    let generate =()=>
    {
        let charset="";

        if(upper) {charset +="ABCDEFGHIJKLMNOPQRSTUVWXYZ"}
        if(lower) {charset +="abcdefghijklmnopqrstuvwxyz"}
        if(special) {charset += "!@#$%^&*()"}
        if(num) {charset +="1234567890"}

        let generated="";
 const length = parseInt(input) || 8;
        for(let i=0 ;i<=length; i++){
            const random = Math.floor(Math.random()*charset.length);
            generated += charset[random];
console.log(generate);


        }

        setPass(generated);



    }

    return(<><h1>welcome
        </h1>
        <input type="text" id="text" value={input} 
        placeholder='password number of length' 
        onChange={(e)=>setInput(e.target.value)

        }/>
        <label htmlFor='upperCase'>UPPERCASE</label>
        <input type="checkbox" id ='upperCase' value={upper} onChange={(e)=>setUpper(e.target.value)}/>
        <label htmlFor='lowerCase'>LOWERCASE</label>
        <input type="checkbox" id ='lowerCase' value={lower} onChange={(e)=>setLower(e.target.value)}/>
        <label htmlFor='specialCase'>SPECIALCASE</label>
        <input type="checkbox" id ='specialCase' value={special} onChange={(e)=>setSpecial(e.target.value)}/>
        <label htmlFor='numCase'>NUMCASE</label>
        <input type="checkbox" value={num} id ='numCase' onChange={(e)=>setNum(e.target.value)}/>
        <div className="buttonWe">
        <button onClick={generate}>generate</button>
        <button>copy</button>
        <div>{pass}</div>
        </div>
        
        
        
        
        </>)
}
export default Password;