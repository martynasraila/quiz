import React from "react";

// props to be passed:
// question nr
// question
// total questions
// answers
// selected answer
// callback

const QuestionBoard = (props) => {
	return (
		<div>
			<p className="question">
				Question: {props.questionNumber} / {props.totalQuestions}
			</p>
			<p>{props.question}</p>
			<div>
				{props.answers.map((answer, answerNr) => {
					return (
						<div className="answer">
							<button disabled={props.selectedAnswer} onClick={props.callBack}>
								<span>
									{answerNr + 1}. {answer}
								</span>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionBoard;
