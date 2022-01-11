import React, { useEffect, useState } from "react";
import { fetchCategories } from "./API";
import Quiz from "./Quiz";

const App = () => {
	const [categoriesLoaded, setCategoriesLoaded] = useState(false);
	const [categorySelected, setCategorySelected] = useState("Random");
	const [difficulty, setDifficulty] = useState("medium");
	const [numOfQuestions, setNumOfQuestions] = useState(10);

    const setStateOfCategories = (loaded) => {
        setCategoriesLoaded(loaded);
    }
	const changeCategory = (ev) => {
		setCategorySelected(ev.currentTarget.value);
	}
	const onDifficultyChange = (ev) => {
		setDifficulty(ev.currentTarget.value)
	}
	const onNumOfQuestionsChange = (ev) => {
		setNumOfQuestions(ev.currentTarget.value)
	}
	return (
		<div>
			<h1>React Quiz App</h1>
			<h3>
				Please set the following preferences for the quiz or leave it to default
				for random assignment
			</h3>
			{/* drop box here */}
			<label htmlFor="category">
				<h4>Category</h4>
			</label>
			<CategoryDropDown setStateOfCategories={setStateOfCategories} categorySelected={categorySelected} changeCategory={changeCategory}/>
			<h4>Difficulty</h4>
			<div onChange={onDifficultyChange}>
				<label><input type="radio" value="easy" name="difficulty"/>Easy</label>
				<label><input type="radio" value="medium" name="difficulty"/>Medium</label>
				<label><input type="radio" value="hard" name="difficulty"/>Hard</label>
			</div>
			<h4>Number Of Questions</h4>
			<input type="tel" pattern="[0-9]*" onChange={onNumOfQuestionsChange} value={numOfQuestions}/>

			{/* conditionally render Quiz component */}
			<Quiz categoriesLoaded={categoriesLoaded} category={categorySelected} difficulty={difficulty} numOfQuestions={numOfQuestions}/>
		</div>
	);
};

const CategoryDropDown = (props) => {
	const [categories, setCategories] = useState([
		{ id: "", name: "Loading..." },
	]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let unmounted = false;
		async function getItems() {
			const data = await fetchCategories();
			data.unshift({ id: "Random", name: "Random" });
			if (!unmounted) {
				setCategories(data);
                props.setStateOfCategories(true)
			}
			setLoading(false);
		}
		getItems();
		return () => {
			unmounted = true;
		};
	}, []);

	return (
		<select disabled={loading} name="category" value={props.categorySelected} onChange={props.changeCategory}>
			{categories.map(({ id, name }) => (
				<option key={id} value={name}>
					{name}
				</option>
			))}
		</select>
	);
};
export default App;
