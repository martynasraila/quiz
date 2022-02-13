import styles from "./Quiz.module.css";
import QuestionBoard from "./QuestionBoard";
import ProgressBar from "./ProgressBar.js";
import { useState } from "react";

const Quiz = (props) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [animationScore, setAnimationScore] = useState("initial");

	const checkAnswer = (ev) => {
		if (!props.quizFinished) {
			// selected answer
			const answer = ev.currentTarget.value;
			// compare with the correct answer
			const answerCorrect =
				answer === props.questions[currentQuestion].correct_answer
					? true
					: false;
			// if correct increment score
			if (answerCorrect) {
				handleScore();
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

	const handleScore = () => {
		// 1. Old number goes up
		setTimeout(() => setAnimationScore("goUp"), 0);
		// 2. Incrementing the counter
		setTimeout(() => props.setScore((prev) => prev + 1), 100);
		// 3. New score waits down
		setTimeout(() => setAnimationScore("waitDown"), 100);
		// 4. New number stays in the middle
		setTimeout(() => setAnimationScore("initial"), 200);
	};

	const showNextQuestion = () => {
		// triggers when users click on next question, if its not last question
		if (currentQuestion + 1 >= props.numOfQuestions) {
			props.setQuizFinished(true);
			props.setQuizVisible(false);
		} else {
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	// const calculatePercent = (total, number) => {
	// 	props.selectedAnswers.length === currentQuestion + 1 && number++;
	// 	return (parseInt(number) / parseInt(total)) * 100;
	// };

	return (
		<div className={styles.quiz}>
			{!props.quizFinished && !props.loading ? (
				<div className={styles["status-bar"]}>
					<p>
						Score:  <p className={styles.score +" "+ styles[animationScore]}>{props.score}</p>
					</p>{" "}
					<div className={styles.progress}>
						<ProgressBar
							total={props.numOfQuestions}
							currentNumber={props.selectedAnswers.length}
							slowFill={false}
						/>
						<p className={styles["question-nr"]}>
							Question: <p className={styles.bold}>{currentQuestion + 1}/{props.numOfQuestions}</p>
						</p>
					</div>
					<div className={styles["game-info"]}>
					<p>Category: <p className={styles.bold}>{props.category}</p></p>
					<p>Difficulty: <p className={styles.bold}>{props.difficulty}</p></p>
					</div>
				</div>
			) : null}
			{props.loading ? <span className={styles.loadbar} /> : null}
			{!props.loading && !props.quizFinished ? (
				<div className={styles["quiz-content"]}>
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
					<button
						className={`${styles.next + " "} ${
							props.selectedAnswers.length === currentQuestion + 1
								? styles["active"]
								: ""
						}`}
						onClick={showNextQuestion}
					>
						<h2>Next</h2>
						<img
							src={require("./img/next-svgrepo-com (1).svg").default}
							alt="next-icon"
						></img>
					</button>
				</div>
			) : null}
		</div>
	);
};

export default Quiz;
