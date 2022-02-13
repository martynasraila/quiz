import React from "react";
import styles from "./QuestionBoard.module.css";
import AnswerButton from "../AnswerButton/AnswerButton";

const QuestionBoard = (props) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.question}>{props.question}</h2>
			<div className={styles.answers} >
				{props.answers.map((answer, answerNr) => {
					return (
						<AnswerButton
							key={answer}
							callBack={props.callBack}
							answerNr={answerNr}
							answer={answer}
							selectedAnswer={props.selectedAnswer}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionBoard;
