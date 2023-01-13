import React, { createContext, useContext, useReducer } from 'react';

const defaultState = {
  questionIndex: 0,
  helpers: {
    telephone: null,
    fiftyFifty: null,
    audience: null,
  }
};

const QuestionsContext = createContext(undefined);

const questionsReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION': {
      return { ...state, questionIndex: state.questionIndex + 1 };
    }
    case 'USE_HELPER': {
      return { ...state, helpers: { ...state.helpers, [action.helper]: state.questionIndex } };
    }
    case 'RESET': {
      return defaultState;
    }
    default: {
      throw new Error(`Unhandled action type: ${ action.type }`);
    }
  }
};

const QuestionsContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(questionsReducer, defaultState);
  const value = { state, dispatch };

  return <QuestionsContext.Provider value={value}>
    { children }
  </QuestionsContext.Provider>;
};

const useQuestionsContext = () => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestionsContext must be used within Provider');
  }
  return context;
};

export { QuestionsContextProvider, useQuestionsContext };
