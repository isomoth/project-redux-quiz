import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { quiz } from 'reducers/quiz';
import { ProgBar } from 'components/ProgBar';

import { Header } from 'components/Header';
import { CurrentQuestion } from 'components/CurrentQuestion';
import { counterSlice } from 'reducers/counter';

const reducer = combineReducers({
  quiz: quiz.reducer,
  counter: counterSlice.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <>
      <Header />
      <Provider store={store}>
        <CurrentQuestion />
        <ProgBar />
      </Provider>
    </>
  );
};
