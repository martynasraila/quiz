import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Board number={0}/>
    </div>
  );
}

function Board(props) {

  const questionNumber = props.number;
  const correctAnswer = data[questionNumber].correct_answer
  const answers = data[questionNumber].incorrect_answers
  
  return(
    <>
    <Question number={0}/>
    <AnswerList incorrect={answers} correct={correctAnswer}/>
    </>
  )
}



function AnswerList(props) {
  
  const answers = props.incorrect;
  
  const answerList = answers.map(x => {
    return (<Answer value={x}/>)
  })

  return (<ol>{answerList}</ol>)
}

function Answer(props) {

  return (
    <li>{props.value}</li>
  )
}

function Question(props) {

  return (
    
    <div>
      <h2>{data[props.number].question}</h2>
    </div>
  )
}

const data = [{
  "category":"Entertainment: Music",
  "type":"multiple",
  "difficulty":"medium",
  "question":"Who wrote the musical composition, &quot;Rhapsody In Blue&quot;?",
  "correct_answer":"George Gershwin",
  "incorrect_answers":["Irving Berlin","Duke Ellington","Johnny Mandel"]},
  {"category":"General Knowledge",
  "type":"multiple",
  "difficulty":"easy",
  "question":"What is the closest planet to our solar system&#039;s sun?",
  "correct_answer":"Mercury",
  "incorrect_answers":["Mars","Jupiter","Earth"]}]

export default App;
