import React from "react";
import styles from "./QuestionBoard.module.css"
// props to be passed:
// question nr
// question
// total questions
// answers
// selected answer
// callback

const QuestionBoard = (props) => {
	return (
		<div className={styles.container}>
			<p className={styles.question}>{props.question}</p>
			<div className={styles.answers}>
				{props.answers.map((answer, answerNr) => {
					return (
						<div className={styles.answer} key={answer}>
							<button disabled={props.selectedAnswer} value={answer} onClick={props.callBack}>
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
