import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './CurrentQuestion.css'; // imported CSS
import ada from '../assets/LADY_A_YELLOW.jpg';
import grace from '../assets/LADY_G_PINK.jpg';
import hedy from '../assets/LADY_H_BLUE.jpg';
import joan from '../assets/LADY_J_GREEN.jpg';
import kath from '../assets/Lady_K_PURPLE.jpg';

import { quiz } from '../reducers/quiz';
import { Summary } from './Summary'; // 👈 here is the import of Summary.js -> see line 33

export const CurrentQuestion = () => {
  const question = useSelector(
    (store) => store.quiz.questions[store.quiz.currentQuestionIndex]
  );

  const answer = useSelector(
    (store) => store.quiz.answers.find((a) => a.questionId === question.id) // 👈 this selector fetches the answer to a question
  );

  // Get the score from redux store:
  const score = useSelector((store) => store.quiz.score);

  const quizOver = useSelector((store) => store.quiz.quizOver); // 👈 This selector gets the functions that will be able to render the <Summary /> when all Qs are answered

  const dispatch = useDispatch();

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const onAnswerSubmit = (id, index) => {
    if (answer) return;
    // preventing to add several answers to a question
    else {
      dispatch(
        quiz.actions.submitAnswer({ questionId: id, answerIndex: index })
      );
    }
  };

  const quizImage = () => {
    switch (question.id) {
      case 1:
        return grace;
      //break;
      case 2:
        return joan;
      //break;
      case 3:
        return kath;
      //break;
      case 4:
        return ada;
      //break;
      case 5:
        return hedy;
      //break;
      default:
        console.log('error handling!');
    }
  };

  const onNextButtonClick = () => {
    dispatch(quiz.actions.goToNextQuestion());
  };

  // 👇 Here is the selected quizOver that executes when al Qs are answered.
  if (quizOver) {
    return <Summary />;
  }

  return (
    <>
      <div className='question-wrapper'>
        <h2>
          <span className='quiz-counter'>{question.id} / 5 </span>
          {question.questionText}
        </h2>
        <img
          className='quiz-pic'
          src={quizImage()}
          alt='great woman in computer science'
        />
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
          <button className='next-button' onClick={() => onNextButtonClick()}>
            <p>
              <span className='align'>
                {' '}
                {`This is ${answer.isCorrect ? 'correct!' : 'wrong'}`}
              </span>
              <i className='fas fa-angle-right'></i>
            </p>
          </button>
        </div>
      )}

      <div className='question-progress'>
        {/* The current score is shown here: */}
        <p>Score: {score}</p>
      </div>
    </>
  );
};
