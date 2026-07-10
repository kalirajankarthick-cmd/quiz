import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import Crud from './crud.jsx'
import Ques from './ques.jsx'
//import Quiz from '/quiz'
//import Ques from '/ques'
//import Bmi from './bmi';
//import Password from './Password.jsx'


//import CurrencyConverter from './assets/currency.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Ques/>

  </StrictMode>
)
