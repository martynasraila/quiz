import createRandom from "./Utilities";

export const fetchQuizQuestions = async (amount, difficulty) => {
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
	const data = await (await fetch(endpoint)).json();
	return data.results.map((question) => ({
		...question,
		answers: createRandom([
			...question.incorrect_answers,
			question.correct_answer
		]),
        question: question.question.replace(/&quot;/g, '\"').replace(/&#039;/g, "\'")
	}));
};
