import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './CurrentQuestion.css'; // imported CSS

import { quiz } from '../reducers/quiz';
import { Summary } from './Summary'; // 👈 here is the import of Summary.js -> se line 33
import { Scores } from './Scores';

export const CurrentQuestion = () => {
  const question = useSelector(
    (store) => store.quiz.questions[store.quiz.currentQuestionIndex]
  );

  const answer = useSelector(
    (store) => store.quiz.answers.find((a) => a.questionId === question.id) // 👈 this selector fetches the answer to a question (found it in the brief!)
  );
  const quizOver = useSelector((store) => store.quiz.quizOver); // 👈 This selector gets the functions that will be able to render the <Summary /> when all Qs are answered

  const dispatch = useDispatch();

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({ questionId: id, answerIndex: index }));
  };

  const onNextButtonClick = () => {
    dispatch(quiz.actions.goToNextQuestion());
  };

  // 👇 Here is the selected quizOver that executes when al Qs are answered.
  if (quizOver === true) {
    return <Summary />;
  }

  return (
    <>
      <div className='question-wrapper'>
        <h2>{question.questionText}</h2>
      </div>
      <div className='button-wrapper'>
        {question.options.map((item, index) => (
          <button
            className='option-buttons'
            key={item}
            onClick={() => onAnswerSubmit(question.id, index)}
          >
            {item}
          </button>
        ))}
      </div>

      {answer && (
        <div className='isCorrect-Next'>
          <p>{`This is ${answer.isCorrect ? 'correct!' : 'wrong.'}`}</p>
          <button className='next-button' onClick={() => onNextButtonClick()}>
            <i className='fas fa-angle-right'></i>
          </button>
        </div>
      )}

      <div className='question-progress'>
        <p className='counter'>{question.id} / 5</p>
      </div>
      <div>
        <Scores />
      </div>
    </>
  );
};
