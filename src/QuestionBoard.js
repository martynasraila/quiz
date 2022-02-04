import React from "react";
import styles from "./QuestionBoard.module.css";


const QuestionBoard = (props) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.question}>{props.question}</h2>
			<div className={styles.answers}>
				{props.answers.map((answer, answerNr) => {
					return (
						<button
							disabled={props.selectedAnswer}
							value={answer}
							onClick={props.callBack}
							className={styles.answer}
							key={answer}
						>
							<h3>
								{answerNr + 1}. {answer}
							</h3>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionBoard;
