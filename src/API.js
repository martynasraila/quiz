

export const fetchQuizQuestions = async (amount, difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
    const data = await (await fetch(endpoint)).json();
    return data.results
}