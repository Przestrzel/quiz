import React from 'react'
import useQuestions from '../../hooks/useQuestions';
import { QuestionsContextProvider, useQuestionsContext } from '../../context/QuestionsContext';
import QuestionProgress from '../questions/questionProgress/QuestionProgress';
import styles from './Page.module.scss';
import Question from '../questions/Question';
import Congratulations from '../common/congratulations/Congratulations';

const QuestionsPage = () => {
  const { state: { questionIndex } } = useQuestionsContext();
  const { count } = useQuestions();

  const isQuizFinished = count === questionIndex;

  if (isQuizFinished) {
    return <Congratulations />
  }

  return (
    <div className={styles.container}>
      <Question />
      <QuestionProgress />
    </div>
  )
}

const wrapper = () => {
  return (
    <QuestionsContextProvider>
      <QuestionsPage />
    </QuestionsContextProvider>
  )
}

export default wrapper
