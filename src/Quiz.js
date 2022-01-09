import logo from "./logo.svg";
import "./Quiz.css";
import QuestionBoard from "./QuestionBoard";
import { useState } from "react";
import { fetchQuizQuestions } from "./API";

function Quiz() {
	const [loading, setLoading] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [quizFinished, setQuizFinished] = useState(true);

	const total_questions = 50;

	const startQuiz = async () => {
		// making a call to quiz api to fetch questions and answers
		setLoading(true);
		setQuizFinished(false);

		const newQuestions = await fetchQuizQuestions(total_questions, "easy");

		setQuestions(newQuestions);
		setScore(0);
		setSelectedAnswers([]);
		setCurrentQuestion(0);
		setLoading(false);
	};

	const checkAnswer = (ev) => {
		// check if answer is correct when answer is clicked
		if (!quizFinished) {
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

		if (nextQuestion === total_questions) {
			setQuizFinished(true);
		} else {
			setCurrentQuestion(nextQuestion);
		}
	};

	return (
		<div className="Quiz">
			{quizFinished || selectedAnswers.length === total_questions ? (
				<button className="start" onClick={startQuiz}>
					Start Quiz
				</button>
			) : null}
			{!quizFinished ? <p className="score">Score: {score}</p> : null}
			{loading ? <p className="loadbar">Loading questions ...</p> : null}
			{!loading && !quizFinished ? (
				<QuestionBoard
					answers={questions[currentQuestion].answers}
					question={questions[currentQuestion].question}
					questionNumber={currentQuestion + 1}
					selectedAnswer={
						selectedAnswers ? selectedAnswers[currentQuestion] : undefined
					}
					callBack={checkAnswer}
					totalQuestions={total_questions}
				/>
			) : null}
			{!quizFinished &&
			!loading &&
			selectedAnswers.length === currentQuestion + 1 &&
			currentQuestion !== total_questions - 1 ? (
				<button className="next" onClick={showNextQuestion}>
					Next Question
				</button>
			) : null}
		</div>
	);
}

export default Quiz;
