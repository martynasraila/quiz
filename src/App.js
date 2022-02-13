import React, { useState } from "react";
import Form from "./Form";
import Quiz from "./Quiz";
import styles from "./App.module.css";
import { fetchQuizQuestions } from "./API";
import ProgressBar from "./ProgressBar";

const App = () => {
	const [categoriesLoaded, setCategoriesLoaded] = useState(false);
	const [categorySelected, setCategorySelected] = useState({
		id: -1,
		name: "Random",
	});
	const [difficulty, setDifficulty] = useState("medium");
	const [numOfQuestions, setNumOfQuestions] = useState(10);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [quizFinished, setQuizFinished] = useState(true);
	const [sameSettings, setSameSettings] = useState(false);
	const [contentVisible, setContentVisible] = useState(false);
	const [quizVisible, setQuizVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [score, setScore] = useState(0);

	const setStateOfCategoriesCallBack = (loaded) => {
		setCategoriesLoaded(loaded);
	};
	const changeCategory = (ev) => {
		const categoryObj = JSON.parse(ev.currentTarget.value);
		setCategorySelected(categoryObj);
	};
	const onDifficultyChange = (ev) => {
		setDifficulty(ev.currentTarget.value);
	};
	const onNumOfQuestionsChange = (ev) => {
		setNumOfQuestions(ev.currentTarget.value);
	};
	const setQuizFinishedCallBack = (bool) => {
		setQuizFinished(bool);
	};
	const setSelectedAnswersCallBack = (answer) => {
		setSelectedAnswers(answer);
	};

	const restartWithDifferentSettings = () => {
		setQuizFinished(true);
		setSelectedAnswers([]);
		setSameSettings(false);
	};
	const restartWithSameSettings = () => {
		setQuizFinished(true);
		setSelectedAnswers([]);
		setSameSettings(true);
		startQuiz();
	};
	const playOnClick = () => {
		setQuizVisible(true);
		setContentVisible(true);
		restartWithSameSettings();
	};
	const settingsOnClick = () => {
		setContentVisible(true);
		restartWithDifferentSettings();
		setQuizVisible(false);
	};


	async function startQuiz() {
		setLoading(true);
		setQuizFinished(false);
		// making a call to quiz api to fetch questions and answers
		const newQuestions = await fetchQuizQuestions(
			numOfQuestions,
			difficulty,
			categorySelected
		);
		setQuestions(newQuestions);
		setSelectedAnswers([]);
		setScore(0);
		setLoading(false);
		setQuizVisible(true);
	}

	const getEndScore = (score, total) => {
		const percent = Math.round((score / total) * 100);
		if (percent <= 50) {
			return `Eh.. You scored only ${percent}%. Better luck next time!`;
		} else if (percent <= 80) {
			return `Not bad at all. You scored ${percent}%. Keep it up!`;
		} else {
			return `Excellent! You scored ${percent}%. Choose higher difficulty!`;
		}
	};

	return (
		<div className={styles.hero}>
			<div
				className={`${styles["container"] + " "}  ${
					contentVisible ? styles["active"] : " "
				}`}
			>
				{contentVisible && quizFinished && !sameSettings ? (
					<Form
						setStateOfCategories={setStateOfCategoriesCallBack}
						onDifficultyChange={onDifficultyChange}
						changeCategory={changeCategory}
						onNumOfQuestionsChange={onNumOfQuestionsChange}
						categorySelected={categorySelected}
						numOfQuestions={numOfQuestions}
						difficulty={difficulty}
						playClick={playOnClick}
					/>
				) : null}
				{/* Check if all questions finished, show quiz */}
				{quizVisible && !quizFinished ? (
					<Quiz
						categoriesLoaded={categoriesLoaded}
						difficulty={difficulty}
						numOfQuestions={numOfQuestions}
						setQuizFinished={setQuizFinishedCallBack}
						quizFinished={quizFinished}
						selectedAnswers={selectedAnswers}
						setSelectedAnswers={setSelectedAnswersCallBack}
						questions={questions}
						loading={loading}
						quizVisible={quizVisible}
						setQuizVisible={setQuizVisible}
						category={categorySelected.name}
						score={score}
						setScore={setScore}
					/>
				) : null}
				{!quizVisible &&
				selectedAnswers.length >= numOfQuestions &&
				numOfQuestions > 0 ? (
					<div className={styles.endscreen}>
						<div className={styles["resulting-score"]}>
							<h2>{getEndScore(score, numOfQuestions)}</h2>
							<ProgressBar total={numOfQuestions} currentNumber={score} slowFill={true} />
						</div>
						<div className={styles.endbtns}>
							<button className={styles.startbtn} type={"button"} onClick={restartWithSameSettings}>
								<h2>Play again!</h2>
							</button>
							<button className={styles.startbtn} type={"button"} onClick={restartWithDifferentSettings}>
								<h2>Change Settings</h2>
							</button>
						</div>
					</div>
				) : null}

				{quizFinished ? (
					<section
						className={`${styles["startbtns"] + " "} ${
							!contentVisible ? styles["active"] : ""
						}`}
					>
						<button className={styles["startbtn"]} onClick={playOnClick}>
							<h2>Start Quiz!</h2>
							<img
								src={require("./img/play-svgrepo-com (2).svg").default}
								alt="play-icon"
							></img>
						</button>
						<button className={styles["startbtn"]} onClick={settingsOnClick}>
							<h2>Change settings</h2>
							<img
								src={require("./img/settings-svgrepo-com.svg").default}
								alt="settings-icon"
							></img>
						</button>
					</section>
				) : null}
			</div>
			<div className={styles.circle1}></div>
			<div className={styles.circle2}></div>
		</div>
	);
};

export default App;
