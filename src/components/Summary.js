import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { quiz } from 'reducers/quiz';
import { Scores } from './Scores';

import './Summary.css';

export const Summary = () => {
  const CheckAnswers = useSelector(
    (store) =>
      store.quiz.answers.filter((answer) => answer.isCorrect === true).length
  );

  const dispatch = useDispatch();

  // Picked up the restart function from Quiz.js and put it in a button onClick -> see line: 25! 👇
  const restart = () => {
    dispatch(quiz.actions.restart());
  };

  return (
    <section className='summary'>
      <h3>You completed the quiz!</h3>
      <p>{`You scored ${CheckAnswers} out of 5 correct answers`}</p>
      {
        <p>
          <Scores />
        </p>
      }
      <button className='restart-button' onClick={restart}>
        Restart quiz
      </button>
    </section>
  );
};
