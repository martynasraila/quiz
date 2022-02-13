import React, { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = (props) => {
	const calculatePercent = (total, currentNumber) => {
		return (parseInt(currentNumber) / parseInt(total)) * 100;
	};

	return (
		<div className={styles["progress-bar"]}>
			<Filler
				slowFill={props.slowFill}
				percentage={calculatePercent(props.total, props.currentNumber)}
			/>
		</div>
	);
};

const Filler = (props) => {
	// if slow fill on mount set initial width to 0
	// and expand to required percent
	const [style, setStyle] = useState({ width: `0%` });
	useEffect(() => {
		if (props.slowFill) {
			setTimeout(function () {
				setStyle({ width: `${props.percentage}%`, transition: "width 1s ease-out"});
			}, 100);
		}
	}, []);

	if (props.slowFill) {
        return <div className={styles.filler} style={style} />;
    } else {
		return <div className={styles.filler} style={{ width: `${props.percentage}%` }} />;
	}
};

export default ProgressBar;
