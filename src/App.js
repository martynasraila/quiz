import React, { useEffect, useState } from "react";
import { fetchCategories } from "./API";
import Form from "./Form";
import Quiz from "./Quiz";

const App = () => {
	const [categoriesLoaded, setCategoriesLoaded] = useState(false);
	const [categorySelected, setCategorySelected] = useState({
		id: -1,
		name: "Random",
	});
	const [difficulty, setDifficulty] = useState("medium");
	const [numOfQuestions, setNumOfQuestions] = useState(10);
	const [quizFinished, setQuizFinished] = useState(true);

	const setStateOfCategories = (loaded) => {
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
	// const setQuizFinished = (bool) => {
	// 	console.log("start quiz called in parent component");
	// 	setQuizFinished(bool);
	// }
	return (
		<div>
			<h1>React Quiz App</h1>
			{quizFinished ? (
				<Form
					setStateOfCategories={setStateOfCategories}
					onDifficultyChange={onDifficultyChange}
					changeCategory={changeCategory}
					onNumOfQuestionsChange={onNumOfQuestionsChange}
					categorySelected={categorySelected}
					numOfQuestions={numOfQuestions}
				/>
			) : null}
			{/* conditionally render Quiz component */}
			<Quiz
				categoriesLoaded={categoriesLoaded}
				category={categorySelected}
				difficulty={difficulty}
				numOfQuestions={numOfQuestions}
				setQuizFinished={setQuizFinished}
				quizFinished={quizFinished}
			/>
		</div>
	);
};


export default App;
