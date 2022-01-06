import logo from "./logo.svg";
import "./App.css";
import QuestionBoard from "./QuestionBoard";
import { useState } from "react";

function App() {
	const [loading, setLoading] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [quizFinished, setQuizFinished] = useState(true);

  

	const startQuiz = async () => {
		// making a call to quiz api to fetch questions and answers
	};

	const checkAnswer = (ev) => {
		// check if answer is correct when answer is clicked
	};

	const showNextQuestion = () => {
		// triggers when users click on next question
	};

	return (
    
		<div className="App">
			<h1>React Quiz App</h1>
			<button className="start" onClick={startQuiz}>
				Start Quiz
			</button>
			<p className="score">Score:</p>
			<p className="loadbar">Loading questions ...</p>
			<QuestionBoard
				answers={questions[currentQuestion].incorrect_answers}
				question={questions[currentQuestion].question}
				questionNumber={currentQuestion + 1}
        		selectedAnswer = {selectedAnswers ? selectedAnswers[currentQuestion] : undefined}
        		callBack = {checkAnswer}
				totalQuestions={15}
			/>
			<button className="next" onClick={showNextQuestion}>
				Next Question
			</button>
		</div>
	);
}


// shuffle algorithm for randomizing the questions
function createRandom(arr) {
	let myArr = [...arr]; //copy arr we pass in
	let randomizedArr = []; //gets popuated by loop

	while (myArr.length > 0) {
		var randomIndex = Math.floor(Math.random() * myArr.length); //create random number
		randomizedArr.push(myArr[randomIndex]); //add choice randomly to arr
		myArr.splice(randomIndex, 1); //cut out a piece of the array then resart loop
	}
	//when loop has finished, return random array
	return randomizedArr;
}

const data = [
	{
		category: "Entertainment: Music",
		type: "multiple",
		difficulty: "medium",
		question:
			"Who wrote the musical composition, &quot;Rhapsody In Blue&quot;?",
		correct_answer: "George Gershwin",
		incorrect_answers: ["Irving Berlin", "Duke Ellington", "Johnny Mandel"],
	},
	{
		category: "General Knowledge",
		type: "multiple",
		difficulty: "easy",
		question: "What is the closest planet to our solar system&#039;s sun?",
		correct_answer: "Mercury",
		incorrect_answers: ["Mars", "Jupiter", "Earth"],
	},
];

export default App;
