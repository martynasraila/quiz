import { useEffect, useState } from "react";
import { fetchCategories } from "./API";

const Form = (props) => {
	return (
		<div>
			<h3>
				Please set the following preferences for the quiz or leave it to default
				for random assignment
			</h3>
			<label htmlFor="category">
				<h4>Category</h4>
			</label>
			<CategoryDropDown
				setStateOfCategories={props.setStateOfCategories}
				categorySelected={props.categorySelected}
				changeCategory={props.changeCategory}
			/>
			<h4>Difficulty</h4>
			<div>
				<label>
					<input
						type="radio"
						value="easy"
						name="difficulty"
						checked={props.difficulty === "easy"}
						onChange={props.onDifficultyChange}
					/>
					Easy
				</label>
				<label>
					<input
						type="radio"
						value="medium"
						name="difficulty"
						checked={props.difficulty === "medium"}
						onChange={props.onDifficultyChange}
					/>
					Medium
				</label>
				<label>
					<input
						type="radio"
						value="hard"
						name="difficulty"
						checked={props.difficulty === "hard"}
						onChange={props.onDifficultyChange}
					/>
					Hard
				</label>
			</div>
			<h4>Number Of Questions</h4>
			<input
				type="tel"
				pattern="[0-9]*"
				onChange={props.onNumOfQuestionsChange}
				value={props.numOfQuestions}
			/>
		</div>
	);
};

const CategoryDropDown = (props) => {
	const [categories, setCategories] = useState([
		{ id: -2, name: "Loading..." },
	]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let unmounted = false;
		async function getItems() {
			const data = await fetchCategories();
			data.unshift({ id: -1, name: "Random" });

			if (!unmounted) {
				setCategories(data);
				props.setStateOfCategories(true);
			}
			setLoading(false);
		}
		getItems();
		return () => {
			unmounted = true;
		};
	}, []);

	return (
		<select
			disabled={loading}
			name="category"
			value={JSON.stringify(props.categorySelected)}
			onChange={props.changeCategory}
		>
			{categories.map(({ id, name }) => (
				<option key={id} value={JSON.stringify({ id, name })}>
					{name}
				</option>
			))}
		</select>
	);
};

export default Form;