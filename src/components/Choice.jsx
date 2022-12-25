import React from "react";

const Choice = (props) => {
	const ans = props.answer;
	let className;

	if (!props.checked) {
		className = ans.selected ? "selected" : "";
	} else {
		if (ans.selected && props.correctAnswer === ans.answer) {
			className = "right";
		} else if (ans.selected && props.correctAnswer !== ans.answer) {
			className = "wrong";
		} else if (!ans.selected && props.correctAnswer === ans.answer) {
			className = "right";
		} else {
			className = "light";
		}
	}

	return (
		<li
			onClick={props.handleClick}
			className={className}
			id={ans.id}
		>
			{ans.answer}
		</li>
	);
};

export default Choice;
