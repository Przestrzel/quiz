import React, { useState } from 'react'
import useQuestions from '../../hooks/useQuestions';
import QuestionProgress from '../questions/questionProgress/QuestionProgress';
import styles from './Page.module.scss';

const QuestionsPage = () => {
  const [ currentQuestion, setCurrentQuestion ] = useState(14);
  const { questions, getQuestionText } = useQuestions();

  return (
    <div className={styles.container}>
      <div style={{width: "90%"}}>QUESTIONS</div>
      <QuestionProgress currentQuestion={currentQuestion} />
    </div>
  )
}

export default QuestionsPage