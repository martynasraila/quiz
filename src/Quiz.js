import styles from "./Quiz.module.css";
import QuestionBoard from "./QuestionBoard";
import { forwardRef, useImperativeHandle, useState } from "react";
import { fetchQuizQuestions } from "./API";

const Quiz = forwardRef((props, ref) => {
	const [loading, setLoading] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [score, setScore] = useState(0);

	useImperativeHandle(ref, () => ({
		async startQuiz() {
			// making a call to quiz api to fetch questions and answers
			setLoading(true);
			props.setQuizFinished(false);
			const newQuestions = await fetchQuizQuestions(
				props.numOfQuestions,
				props.difficulty,
				props.category
			);
			setQuestions(newQuestions);
			setScore(0);
			props.setSelectedAnswers([]);
			setCurrentQuestion(0);
			setLoading(false);
		},
	}));

	const checkAnswer = (ev) => {
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
			// create the answer object and add it to selected answers array
			const answerObject = {
				question: questions[currentQuestion].question,
				answer,
				answerCorrect,
				correct_answer: questions[currentQuestion].correct_answer,
				answerChoices: questions[currentQuestion].answers,
			};
			props.setSelectedAnswers((prev) => [...prev, answerObject]);
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
		<div className={styles.quiz}>
			{props.categoriesLoaded &&
			(props.quizFinished ||
				props.selectedAnswers.length === props.numOfQuestions) ? (
				<button className="start" onClick={ref.current.startQuiz}>
					Start Quiz
				</button>
			) : null}
			{!props.quizFinished ? (
				<div className={styles["status-bar"]}>
					<div>
						<p className={styles["question-nr"]}>
							Question: {currentQuestion + 1} / {props.numOfQuestions}
						</p>
						<p className={styles.score}>Score: {score}</p>{" "}
					</div>
					<div className={styles["progress-bar"]}></div>
					{/* <div className={styles.underline}></div> */}
				</div>
			) : null}
			{loading ? <span className={styles.loadbar} /> : null}
			{!loading && !props.quizFinished ? (
				<QuestionBoard
					className={styles["question-board"]}
					answers={questions[currentQuestion].answers}
					question={questions[currentQuestion].question}
					selectedAnswer={
						props.selectedAnswers
							? props.selectedAnswers[currentQuestion]
							: undefined
					}
					callBack={checkAnswer}
				/>
			) : null}

			{/* {!props.quizFinished &&
			!loading &&
			props.selectedAnswers.length === currentQuestion + 1 &&
			currentQuestion !== props.numOfQuestions - 1 ? ( */}
			<button
				className={`${styles.next + " "} ${
					!props.quizFinished &&
					!loading &&
					props.selectedAnswers.length === currentQuestion + 1 &&
					currentQuestion !== props.numOfQuestions - 1
						? styles["active"]
						: ""
				}`}
				onClick={showNextQuestion}
			>
				<h2>Next Question</h2>
				<img
					src={require("./img/next.svg").default}
					alt="next-icon"
				></img>
			</button>
		</div>
	);
});

export default Quiz;
