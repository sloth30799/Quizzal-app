import React from "react";
import Choice from "./Choice";

const Quiz = (props) => {
	const data = props.quizData;
	const question = data.question.split('&quot;').join('"')
	const shuffled = data.answers;

	const answerChoices = shuffled.map((answer) => {
		return (
			<Choice
				answer={answer}
				handleClick={props.handleClick}
				checked={props.checked}
				correctAnswer={data.correct_answer}
				key={answer.id}
			/>
		);
	});

	return (
		<div className='quizBox'>
			<h2>{question}</h2>
			<ul className='answerBox'>{answerChoices}</ul>
		</div>
	);
};

export default Quiz;
