import React, { useEffect, useState } from "react";
import { fetchCategories } from "./API";
import Quiz from "./Quiz";

const App = () => {
	// const [categories, setCategories] = useState(["Random"])
	// const categoriesFetched = fetchCategories();
	// setCategories(categoriesFetched)
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
			<CategoryDropDown />
			<h4>Difficulty</h4>
			{/* Number input here */}
			<h4>Number Of Questions</h4>
			{/* Radio buttons here */}

			{/* conditionally render Quiz component */}
			<Quiz />
		</div>
	);
};

const CategoryDropDown = () => {
	const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function getItems() {
			const data = await fetchCategories();
            setCategories(data)
            setLoading(false)
		}
        getItems();
	}, []);

	return (
		<select disabled={loading} name="category">
            <option key={"Random"} value={"Random"}>Random</option>
			{categories.map(({ id, name }) => (
				<option key={id} value={name}>
					{name}
				</option>
			))}
		</select>
	);
};
export default App;
