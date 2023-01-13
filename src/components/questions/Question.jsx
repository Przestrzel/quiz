import React, { useCallback, useMemo } from 'react'
import useQuestions from '../../hooks/useQuestions';
import { useQuestionsContext } from '../../context/QuestionsContext';
import styles from './Question.module.scss';

const Question = () => {
  const { state: { questionIndex } } = useQuestionsContext();
  const { questions, getQuestionText, } = useQuestions();
  const question = useMemo(() => questions[questionIndex], [questionIndex, questions]);

  const onAnswer = useCallback((answer) => {
    console.log(answer);
  }, []);

  return (
    <div className={styles.question}>
      { getQuestionText(question) }
    </div>
  )
}

export default Question