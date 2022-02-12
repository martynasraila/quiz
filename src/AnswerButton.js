import React from "react";
import styles from "./AnswerButton.module.css";

// Show if clicked
// Show if correct
// Show if incorrect

const AnswerButton = (props) => {
	let className = styles["answer"]; 
    let icon = null;

	// Check if any answer is selected
	if (props.selectedAnswer) {
		// check if answer correct and add class accordingly
		if (props.selectedAnswer.correct_answer === props.answer) {
			className += " " + styles["correct"];
            icon = <img className={styles.correct}
				src={require("./img/right-svgrepo-com.svg").default}
				alt="correct-icon"
			/>
            
		} else {
			className += " " + styles["incorrect"];
            icon = <img className={styles.incorrect}
            src={require("./img/wrong-svgrepo-com (1).svg").default}
            alt="correct-icon"
        />
		}
        // Mark answer as selected by adding selected class
        if (props.selectedAnswer.answer === props.answer) {
            className += " " + styles["selected"]
        }
	}
    else {
        <img/>
    }

	return (
		<button
			disabled={props.selectedAnswer}
			value={props.answer}
			onClick={props.callBack}
			className={className}
			key={props.answer}
			style={{animationDelay: `${props.answerNr*200}ms`}}
			// add style animation delay = answerNr * 0.2s
		>
			<h3>
				{props.answerNr + 1}. {props.answer}
			</h3>
			{/* render img conditionally */}
            {icon}
		</button>
	);
};

export default AnswerButton;
