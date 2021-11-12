import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from 'reducers/quiz';

export const Scores = () => {
  let points = 0;
  const minScore = 3;

  const question = useSelector(
    (store) => store.quiz.questions[store.quiz.currentQuestionIndex]
  );

  const answer = useSelector((store) =>
    store.quiz.answers.find((a) => a.questionId === question.id)
  );

  return (
    <>
      <div className='question-wrapper'>
        {answer && (
          <p>
            {answer.isCorrect
              ? `Points: ${points + 5}`
              : `Points: ${points - 5}`}
          </p>
        )}
      </div>

      {answer && (
        <div>{<p>{`You ${points >= minScore ? 'win!' : 'lose.'}`}</p>}</div>
      )}
    </>
  );
};

/* Give a score for correct answers and deduct points for incorrect answers. If the user goes below a certain score, they lose! */

/* PSEUDOCODE

1. Create a counter, count = 0;
Create a variable for the minimum score the user needs to win the quiz

minScore = 3;

2. If answer.isCorrect ? count++ : count--;

3. Compare count and minScore

4. If count >== minScore, display info on Summary.js: "You passed the quiz"
Else "You lost the quiz" */

/* Suggestion from Sara: Store the score in a state: */

/* const [score, setScore] = useState(0); */

/*  const score = useSelector((store) => store.quiz.answers.isCorrect); */

/*   Suggestion from Karin: try putting all the logic above the return, and just use the calculated variable in the markup. */

/*  const keepScore = () => {
    if (answer.isCorrect) {
      return (points += 5);
    } else {
      return (points -= 5);
    }
  }; */

/*  console.log('SCORE: ', keepScore);
 */
