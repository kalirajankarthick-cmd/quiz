import {useState} from 'react';
import {useEffect} from 'react';
import './App.css';

function Bmi() 
{
const[height, setHeight] = useState();
const[weight, setWeight] = useState();
const[bmi, setBmi] = useState(0);
 const [category, setCategory] = useState('');


const bmicalculte=()=>
{
      if (!height || !weight) {
    alert('Kindly enter the height and weight');
    return;}
     const heightInMeters = height / 100;
    
    // Step 2: Calculate BMI = weight / (height in meters)²
    const bmiValue = weight / (heightInMeters * heightInMeters);
    // OR: const bmiValue = weight / ((height / 100) ** 2);
    
    // Step 3: Round to 1 decimal place
    const roundedBMI = Math.round(bmiValue * 10) / 10;
    
    // Step 4: Set the result
    setBmi(roundedBMI);

    // Step 5: Determine category

     let bmiCategory = '';
    if (bmiValue < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal weight ✅';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else if (bmi < 35) bmiCategory = 'Obese (Class I)';
    else if (bmi < 40) bmiCategory = 'Obese (Class II)';
    else bmiCategory = 'Obese (Class III)';
    
    setCategory(bmiCategory);
 
      }

const clearSet=()=>
{
    setHeight('');
    setWeight('');
    setBmi(0);

}


    return (

        <div className="bmi">

          
            
            <h1> BMI CALCULTOR</h1>
            <label>
                height
            </label>
            <input type="number" value={height} 
            onChange={(e)=>setHeight(e.target.value)} />
            <label>
                weight
            </label>
            <input type="number" value={weight} 
            onChange={(e)=> setWeight(e.target.value)}/>
            <button onClick={bmicalculte}>bmi calculate </button>
            <button onClick={clearSet}>clear</button>

            {bmi ? (
                <div> <p> your bmi is calculate {bmi}</p>
                
             <p>{category}</p> </div>
               
 

            ):(<p> kindly put the valuet</p>)
            }
 
            
        </div>
    )

}
export default Bmi;