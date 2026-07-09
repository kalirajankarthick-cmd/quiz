import { useState, useEffect } from "react";
import './App.css';

function formfile() {
  const [file, setFile] = useState({
        name: "karthick",
        age: 20,
        gender: "male",
        vehicle: [] // Array to store multiple vehicle selections
    });

    const handleVehicleChange = (e) => {
    const { value, checked } = e.target;
    if(checked) {
        setFile((prevFile) => ({
            ...prevFile,
            vehicle: [...prevFile.vehicle, value] // Add the selected vehicle to the array
        }));
    } else {
        setFile((prevFile) => ({
            ...prevFile,
            vehicle: prevFile.vehicle.filter((vehicle) => vehicle !== value) // Remove the unselected vehicle from the array
        }));

    }
};
  
  return(
    <>

        <div className="App">
            <h1>File Upload</h1>
            <input type ="text" 
            onChange={(e) => setFile({...file, name: e.target.value})} />
            <input type ="number" 
            onChange={(e) => setFile({...file, age: e.target.value})} />
            <input type="radio"  value={file.gender} name ="gender" 
            onChange= {()=> setFile({...file, gender: "male"})}/> male
           
           
            <input type="radio"  value={file.gender} name ="gender" 
            onChange= {()=> setFile({...file, gender: "female"})}/> female
           
           <input type="checkbox" name="car" value="car"
           onChange={handleVehicleChange}/> car
           <input type="checkbox" name="dog" value="dog"   
           onChange={handleVehicleChange}/> dog
           <input type="checkbox" name="bird" value="bird"   
           onChange={handleVehicleChange}/> bird
            
            </div>
            <table style ={{border: "1px solid white", margin: "auto", marginTop: "20px"}}>
                <td>
                     <tr>name</tr>
                      <tr>age</tr>
                       <tr>gender</tr>
                        <tr>vehicle</tr>
                </td>
                  <td>
                     <tr>{file.name}</tr>
                      <tr>{file.age}</tr>
                       <tr>{file.gender}</tr>
                       <tr>{file.vehicle?.join(", ") || "None"}</tr>
                </td>
               
            </table>
    </>
  )
}
export default formfile;