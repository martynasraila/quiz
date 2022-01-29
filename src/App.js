import React, { useRef, useState } from "react";
import Form from "./Form";
import Quiz from "./Quiz";
import Results from "./Results";
import styles from "./App.module.css";

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
	const restartWithSameSettings = () => {
		setShowResults(false);
		setQuizFinished(true);
		setSelectedAnswers([]);
		setSameSettings(true);
		quizRef.current.startQuiz();
	};
	const restartWithDifferentSettings = () => {
		setShowResults(false);
		setQuizFinished(true);
		setSelectedAnswers([]);
		setSameSettings(false);
	};
	const playOnClick = () => {
		setContentVisible(true);
		restartWithSameSettings();
	}
	const settingsOnClick = () => {
		setContentVisible(true);
		restartWithDifferentSettings();
	}
	// add reference to Quiz child component to call the start game function
	const quizRef = useRef();

	return (
		<div className={styles.hero}>
			<div className={`${styles['container'] + " "}  ${contentVisible ? styles['active'] : " "}`}>
				{quizFinished && !sameSettings ? (
					<Form
						setStateOfCategories={setStateOfCategoriesCallBack}
						onDifficultyChange={onDifficultyChange}
						changeCategory={changeCategory}
						onNumOfQuestionsChange={onNumOfQuestionsChange}
						categorySelected={categorySelected}
						numOfQuestions={numOfQuestions}
						difficulty={difficulty}
					/>
				) : null}
				<Quiz
					categoriesLoaded={categoriesLoaded}
					category={categorySelected}
					difficulty={difficulty}
					numOfQuestions={numOfQuestions}
					setQuizFinished={setQuizFinishedCallBack}
					quizFinished={quizFinished}
					selectedAnswers={selectedAnswers}
					setSelectedAnswers={setSelectedAnswersCallBack}
					ref={quizRef}
				/>
				{/* If all questions finished */}
				{selectedAnswers.length === parseInt(numOfQuestions) ? (
					<div>
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
			</div>
			<div className={styles.circle1}></div>
			<div className={styles.circle2}></div>
			<section className={`${styles["startbtns"]+ " "} ${!contentVisible ? styles["active"] : ""}`}>
				<button onClick={playOnClick}>Play!</button>
				<button onClick={settingsOnClick}>Change settings</button>
			</section>
		</div>
	);
};

export default App;
