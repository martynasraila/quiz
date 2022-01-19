import "./Quiz.css";
import QuestionBoard from "./QuestionBoard";
import { useState } from "react";
import { fetchQuizQuestions } from "./API";

function Quiz(props) {
	const [loading, setLoading] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [score, setScore] = useState(0);
	// const [quizFinished, setQuizFinished] = useState(true);
	// const [categoriesLoaded, setCategoriesLoaded] = useState(props.categoriesLoaded)

	const startQuiz = async () => {
		// making a call to quiz api to fetch questions and answers
		setLoading(true);
		props.setQuizFinished(false);
		const newQuestions = await fetchQuizQuestions(props.numOfQuestions, props.difficulty, props.category);
		setQuestions(newQuestions);
		setScore(0);
		setSelectedAnswers([]);
		setCurrentQuestion(0);
		setLoading(false);
	};

	const checkAnswer = (ev) => {
		// check if answer is correct when answer is clicked
		if (!props.quizFinished) {
			// selected answer
			const answer = ev.currentTarget.value;
			// compare with the correct answer
			const answerCorrect =
				answer === questions[currentQuestion].correct_answer ? true : false;
			// if correct increment score by 1
			if (answerCorrect) {
				setScore((prev) => prev + 1);
			}
			// create the answer object and addit to selected answer array
			const answerObject = {
				question: questions[currentQuestion].question,
				answer,
				answerCorrect,
				correct_answer: questions[currentQuestion].correct_answer,
			};
			setSelectedAnswers((prev) => [...prev, answerObject]);
		}
	};

	const showNextQuestion = () => {
		// triggers when users click on next question, if its not last question
		const nextQuestion = currentQuestion + 1;

		if (nextQuestion === props.numOfQuestions) {
			props.setQuizFinished(true);
		} else {
			setCurrentQuestion(nextQuestion);
		}
	};
	return (
		<div className="Quiz">
			{props.categoriesLoaded && (props.quizFinished || selectedAnswers.length === props.numOfQuestions) ? (
				<button className="start" onClick={startQuiz}>
					Start Quiz
				</button>
			) : null}
			{!props.quizFinished ? <p className="score">Score: {score}</p> : null}
			{loading ? <p className="loadbar">Loading questions ...</p> : null}
			{!loading && !props.quizFinished ? (
				<QuestionBoard
					answers={questions[currentQuestion].answers}
					question={questions[currentQuestion].question}
					questionNumber={currentQuestion + 1}
					selectedAnswer={
						selectedAnswers ? selectedAnswers[currentQuestion] : undefined
					}
					callBack={checkAnswer}
					totalQuestions={props.numOfQuestions}
				/>
			) : null}
			{!props.quizFinished &&
			!loading &&
			selectedAnswers.length === currentQuestion + 1 &&
			currentQuestion !== props.numOfQuestions - 1 ? (
				<button className="next" onClick={showNextQuestion}>
					Next Question
				</button>
			) : null}
		</div>
	);
}

export default Quiz;
