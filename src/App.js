import React, { useState } from "react";
import Form from "./Form";
import Quiz from "./Quiz";
import Results from "./Results";
import styles from "./App.module.css";
import { fetchQuizQuestions } from "./API";

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
	const [showResults, setShowResults] = useState(false);
	const [sameSettings, setSameSettings] = useState(false);
	const [contentVisible, setContentVisible] = useState(false);
	const [quizVisible, setQuizVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState([]);

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
	const showResultsOnClick = () => {
		setShowResults(true);
	};

	const restartWithDifferentSettings = () => {
		setQuizFinished(true);
		setShowResults(false);
		setSelectedAnswers([]);
		setSameSettings(false);
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


	const restartWithSameSettings = () => {
		setQuizFinished(true);
		setShowResults(false);
		setSelectedAnswers([]);
		setSameSettings(true);
		startQuiz();
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
		setLoading(false);
		setQuizVisible(true);
	}

	return (
		<div className={styles.hero}>
			<div
				className={`${styles["container"] + " "}  ${
					contentVisible ? styles["active"] : " "
				}`}
				// className={styles.container + " " + styles.active}
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
					/>
				) : null }
				{!quizVisible && (selectedAnswers.length >= numOfQuestions) && (numOfQuestions > 0) ? 
					(
					<div className={styles.endbtns}>
						<button type={"button"} onClick={showResultsOnClick}>
							Check Answers
						</button>
						<button type={"button"} onClick={restartWithSameSettings}>
							Play again!
						</button>
						<button type={"button"} onClick={restartWithDifferentSettings}>
							Change Settings
						</button>
					</div>
				) : null}

				{showResults ? <Results selectedAnswers={selectedAnswers} /> : null}
				{/* Restart quiz button -> dialog box: Restart or restart with different settings*/}
				{/* <Results/> */}
				{quizFinished ? 
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
				</section> : null}
			</div>
			<div className={styles.circle1}></div>
			<div className={styles.circle2}></div>
		</div>
	);
};

export default App;
