import React from "react";
import "./App.css";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

function App() {
	const [quizStart, setQuizStart] = React.useState(false);
	const [quizData, setQuizData] = React.useState([]);
	const [checked, setChecked] = React.useState(false);
	const [correctedNum, setCorrectedNum] = React.useState(0);

	function startquiz() {
		setQuizStart((oldStatus) => (oldStatus = !oldStatus));
	}

	React.useEffect(() => {
		async function getQuiz() {
			try {
				const res = await fetch(
					"https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple"
				);
				const data = await res.json();

				setQuizData(
					data.results.map((quiz) => {
						// Combine correct answer and incorrect answers into a single array
						const allAnswers = [
							quiz.correct_answer,
							...quiz.incorrect_answers,
						].sort(() => Math.random() - 0.5);

						// Add a selected property to each answer object
						const updatedAnswers = allAnswers.map((answer) => {
							return {
								answer,
								selected: false,
								id: nanoid(),
							};
						});
						// Return the updated quiz object
						return {
							...quiz,
							answers: updatedAnswers,
						};
					})
				);
			} catch (error) {
				console.error(error);
			}
		}
		if (quizStart) {
			getQuiz();
		}
	}, [quizStart]);

	function handleClick(event) {
		const element = event.target;

		setQuizData((oldQuiz) => {
			return oldQuiz.map((ans) => {
				return {
					...ans,
					answers: ans.answers.map((answer) => {
						// If this is the updated answer object, return the updated version
						if (answer.id === element.id) {
							return {
								...answer,
								selected: !answer.selected,
							};
						}
						// Otherwise, return the original answer object
						return answer;
					}),
				};
			});
		});
	}

	const quizBoxes = quizData.map((quiz, index) => {
		return (
			<Quiz
				key={nanoid()}
				quizData={quiz}
				handleClick={handleClick}
				checked={checked}
			/>
		);
	});

	function checkAnswers() {
		setChecked(true);
		const selectedAnswer = quizData.map((quiz) =>
			quiz.answers.find((answer) => answer.selected)
		);
		const justAnswer = selectedAnswer
			.filter((ele) => ele)
			.map((ele) => ele.answer);

		const num = quizData.filter((quiz) =>
			justAnswer.includes(quiz.correct_answer)
		).length;
		setCorrectedNum(num);
	}

	function playAgain() {
		setQuizStart(false);
		setChecked(false);
		setCorrectedNum(0);
	}

	return (
		<div className='App'>
			{!quizStart ? (
				<Start startquiz={startquiz} />
			) : (
				<div className='mainBox'>
					{quizBoxes}
					<div className='bottom'>
						{checked && <h3>You scored {correctedNum}/5 correct answers.</h3>}
						<button
							onClick={checked ? playAgain : checkAnswers}
							className='checkBtn'
						>
							{checked ? "Play again" : "Check answers"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
