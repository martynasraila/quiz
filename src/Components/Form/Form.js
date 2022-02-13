import { useEffect, useState } from "react";
import { fetchCategories } from "../../Utils/API";
import styles from "./Form.module.css";

const Form = (props) => {
	const [formValid, setFormValid] = useState(false);
	const [numberOfQuestionsValid, setNumberOfQuestionsValid] = useState(true);
	const onNumOfQuestionsChange = (ev) => {
		props.onNumOfQuestionsChange(ev);
		const numOfQuestions = parseFloat(ev.target.value);
		if (!isNaN(numOfQuestions)) {
			// validate the number of questions
			if (numOfQuestions > 0 && parseInt(ev.target.value) === numOfQuestions) {
				setNumberOfQuestionsValid(true);
				setFormValid(true);
			} else {
				setNumberOfQuestionsValid(false);
				setFormValid(false);
			}
		} else {
			setNumberOfQuestionsValid(false);
			setFormValid(false);
		}
	};

	return (
		<div className={styles["form-container"]}>
			<h3 className={styles["form-info"]}>
				Please set the following preferences for the quiz or leave it to default
				for random assignment
			</h3>
			<div className={styles["form"]}>
				<div className={styles["form-row"]}>
					<label htmlFor="category">
						<h3>Category</h3>
					</label>
					<CategoryDropDown
						id="category"
						setStateOfCategories={props.setStateOfCategories}
						categorySelected={props.categorySelected}
						changeCategory={props.changeCategory}
						setFormValid={setFormValid}
					/>
				</div>
				<div className={styles["form-row"]}>
					<h3>Difficulty</h3>
					<div className={styles.radiobtns}>
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
				</div>
				<div className={styles["form-row"]}>
					<h3>Number Of Questions</h3>
					<input
						className={!numberOfQuestionsValid ? styles.red : null}
						type="number"
						pattern="[0-9]*"
						onChange={onNumOfQuestionsChange}
						value={props.numOfQuestions}
					/>
				</div>
			</div>
			<button
				className={styles["startbtn"]}
				onClick={props.playClick}
				disabled={!formValid}
			>
				<h2>Start Quiz!</h2>
				<img
					src={require("../../img/play-svgrepo-com (2).svg").default}
					alt="play-icon"
				></img>
			</button>
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
			props.setFormValid(true);
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
