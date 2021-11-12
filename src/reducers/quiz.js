import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [
    {
      id: 1,
      questionText:
        'Created in 1959, COBOL is one of the oldest programming languages still in use. The ideas of this American computer scientist were key to the development of this language.',
      options: [
        'Ada Lovelace',
        'Margaret Hamilton',
        'Grace Hopper',
        'Eva Galperin',
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 2,
      questionText:
        'She had a key role as a code-breaker in the Enigma-project that decrypted Nazi Germany’s secret communications during World War II. The cryptanalytic process was developed by her friend Alan Turing.',
      options: [
        'Maria Mitchell',
        'Joan Clarke',
        'Kathleen Antonelli',
        'Adele Goldstine',
      ],
      correctAnswerIndex: 1,
    },
    {
      id: 3,
      questionText:
        'Starting as a “human computer” in 1953 doing the calculations that were essential to the many early missions at NASA. This Physicist and mathematician had a key role to the success of the project mercury and the Apollo 11 mission.',
      options: [
        'Betty Holberton',
        'Lixia Zhang',
        'Karen Catlin',
        'Katherine Johnson',
      ],
      correctAnswerIndex: 3,
    },

    {
      id: 4,
      questionText:
        'She is known for being the first computer programmer, and she described her way of work as poetical science.',
      options: [
        'Margaret Hamilton',
        'Ada Lovelace',
        'Joan Clarke',
        'Katherine Johnson',
      ],
      correctAnswerIndex: 1,
    },

    {
      id: 5,
      questionText:
        'She was a woman of all trades. She wasn’t just a Hollywood star, but she also developed a radio guidance system for Allied torpedoes, which helped them in defeating the Axis powers.',
      options: ['Hedy Lamarr', 'Hu Qiheng', 'Michelle Simmons', 'Emily Chang'],
      correctAnswerIndex: 0,
    },
  ],
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          'Could not find question! Check to make sure you are passing the question id correctly.'
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    },
  },
});
