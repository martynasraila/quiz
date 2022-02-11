import styles from "./Quiz.module.css";
import QuestionBoard from "./QuestionBoard";
import ProgressBar from "./ProgressBar.js";
import { useState } from "react";

const Quiz = (props) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);

	// useImperativeHandle(ref, () => ({
	// 	async startQuiz() {
	// 		// making a call to quiz api to fetch questions and answers
	// 		setLoading(true);
	// 		props.setQuizFinished(false);
	// 		const newQuestions = await fetchQuizQuestions(
	// 			props.numOfQuestions,
	// 			props.difficulty,
	// 			props.category
	// 		);
	// 		setQuestions(newQuestions);
	// 		setScore(0);
	// 		props.setSelectedAnswers([]);
	// 		setCurrentQuestion(0);
	// 		setLoading(false);
	// 	},
	// }));

	const checkAnswer = (ev) => {
		if (!props.quizFinished) {
			// selected answer
			const answer = ev.currentTarget.value;
			// compare with the correct answer
			const answerCorrect =
				answer === props.questions[currentQuestion].correct_answer
					? true
					: false;
			// if correct increment score by 1
			if (answerCorrect) {
				setScore((prev) => prev + 1);
			}
			// create the answer object and add it to selected answers array
			const answerObject = {
				question: props.questions[currentQuestion].question,
				answer,
				answerCorrect,
				correct_answer: props.questions[currentQuestion].correct_answer,
				answerChoices: props.questions[currentQuestion].answers,
			};
			props.setSelectedAnswers((prev) => [...prev, answerObject]);
		}
	};

	const showNextQuestion = () => {
		// triggers when users click on next question, if its not last question
		if (currentQuestion + 1 >= props.numOfQuestions) {
			props.setQuizFinished(true);
			props.setQuizVisible(false)
		} else {
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	const calculatePercent = (total, number) => {
		props.selectedAnswers.length === currentQuestion + 1 && number++;
		return (parseInt(number) / parseInt(total)) * 100;
	};

	return (
		<div className={styles.quiz}>
			{!props.quizFinished ? (
				<div className={styles["status-bar"]}>
					<p className={styles.score}>Score: {score}</p>{" "}
					<div>
						<ProgressBar
							percentage={calculatePercent(
								props.numOfQuestions,
								currentQuestion
							)}
						/>
						<p className={styles["question-nr"]}>
							Question: {currentQuestion + 1} / {props.numOfQuestions}
						</p>
					</div>
				</div>
			) : null}
			{props.loading ? <span className={styles.loadbar} /> : null}
			{!props.loading && !props.quizFinished ? (
				<QuestionBoard
					className={styles["question-board"]}
					answers={props.questions[currentQuestion].answers}
					question={props.questions[currentQuestion].question}
					selectedAnswer={
						props.selectedAnswers
							? props.selectedAnswers[currentQuestion]
							: undefined
					}
					callBack={checkAnswer}
				/>
			) : null}
			{props.quizVisible ? (
				<button
					className={`${styles.next + " "} ${
						// !props.quizFinished &&
						// !props.loading &&
						props.selectedAnswers.length === currentQuestion + 1 ?
						// currentQuestion !== props.numOfQuestions - 1 
						styles["active"] : ""}`}
					onClick={showNextQuestion}
				>
					<h2>Next</h2>
					<img
						src={require("./img/next-svgrepo-com (1).svg").default}
						alt="next-icon"
					></img>
				</button> ): null
			}
		</div>
	);
};

export default Quiz;
