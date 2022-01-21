import React, { useRef, useState } from "react";
import Form from "./Form";
import Quiz from "./Quiz";
import Results from "./Results";

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
	}
	const restartWithDifferentSettings = () => {
		setShowResults(false);
		setQuizFinished(true);
		setSelectedAnswers([]);
		setSameSettings(false);
	}
	// add reference to Quiz child component to call the start game function
	const quizRef = useRef();

	return (
		<div>
			<h1>React Quiz App</h1>
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
						Check answers
					</button>
					<button type={"button"} onClick={restartWithSameSettings}>
						Restart with same settings
					</button>
					<button type={"button"} onClick={restartWithDifferentSettings}>
						Restart with different settings
					</button>
				</div>
			) : null}
			{showResults ? <Results selectedAnswers={selectedAnswers} /> : null}
			{/* Restart quiz button -> dialog box: Restart or restart with different settings*/}
			{/* <Results/> */}
		</div>
	);
};

export default App;
