import {useState, useEffect} from 'react'
import Go from '/quizjson.json'


function quiz(){

  const [quiz, setQuiz] = useState(null)
  const [score, setScore] =useState(0)
  const [current,setCurrent] = useState(0)
  const [Next, setNext] = useState(false)
  const [option, setOption]=useState(0)
  const [answer, setAnswer] = useState(0)
  const [result, setResult] = useState(false)
  const[load, setLoad] = useState(true)

  useEffect(()=>{
    setQuiz(Go)
    setLoad(false)
  })

  const handleClick=(index)=>{
     if(quiz.length>=current+1)
{
    setNext(true);
   setOption(index);
     if (index === quiz[current].correct) {
      setScore(score + 1);
    } 
  
}
 
}

  

  const ques=()=>{
    setCurrent(current + 1)
   
    setNext(false)

  }
if(load){
return <div>..loading</div>
}
const handleRestart=()=>{
  setCurrent(0);
  setScore(0)
}


 if(quiz.length===current){
  return(<div>
        <h2>Quiz Completed!</h2>
        <p>Your Question: {score} / {quiz.length}</p>

        <p>Percentage: {Math.round((score / quiz.length) * 100)}%</p>
        
        <button onClick ={handleRestart}>restart</button>
      </div>)
 }
  return(<>
  <div>
    <h1>Quiz</h1>
   
   {quiz[current].question}
{quiz[current].options.map((option, index) => (
  <button key={option.id} onClick={() => handleClick(index)}>
    {option.value}
  </button>
   
))}
 {Next && (
        <div>
         <button onClick={ques}>{current+1=== quiz.length ? <p>Finish</p>:<p>NextQuestion</p>}</button>
         {option===quiz[current].correct ? <p>Correct Answer</p>:<p>wrong Answer</p>}
        </div>
        
      )}
    </div></>)
}
export default quiz;