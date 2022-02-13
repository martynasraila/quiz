import createRandom from "./Utilities";
// library for decoding html entities
import he from "he";

export const fetchQuizQuestions = async (amount, difficulty, category) => {
	// check if the category is random, if its not then add string to api endpoint
	const categoryStr = category.id !== -1 ? `&category=${category.id}` : "";
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}${categoryStr}`;
	const data = await (await fetch(endpoint)).json();
	return data.results.map((question) => ({
		...question,
		answers: createRandom([
			...question.incorrect_answers.map((incorrect) =>
				he.decode(incorrect)
			),
			he.decode(question.correct_answer),
		]),
		correct_answer: he.decode(question.correct_answer),
		question: he.decode(question.question),
	}));
};
// .replaceAll(/&quot;/g, '\"').replaceAll(/&#039;/g, "\'").replaceAll('&amp;', '&')

export const fetchCategories = async () => {
	const endPoint = "https://opentdb.com/api_category.php";
	const data = await (await fetch(endPoint)).json();
	return data.trivia_categories;
};

