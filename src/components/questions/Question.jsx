import React, { useCallback, useMemo, useState } from 'react'
import useQuestions from '../../hooks/useQuestions';
import { useQuestionsContext } from '../../context/QuestionsContext';
import styles from './Question.module.scss';
import AnswerButton from './answerButton/AnswerButton';
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';

const Question = () => {
  const { state: { questionIndex } } = useQuestionsContext();
  const { questions, getQuestionText, getAnswers } = useQuestions();
  const [ pickedQuestion, setPickedQuestion ] = useState(null);
  const question = useMemo(() => questions[questionIndex], [questionIndex, questions]);

  const onAnswer = useCallback((answerIndex) => {
    setPickedQuestion(answerIndex);
  }, [ ]);

  return (
    <div className={styles.question}>
      <div className={styles.questionText}>
        { getQuestionText(question) }
      </div>
      <div className={styles.questionAnswers}>
        {
          getAnswers(question).map((answer, index) => (
            <AnswerButton
              key={answer}
              text={answer}
              className={pickedQuestion === index ? styles.picked : ''}
              onClick={() => onAnswer(index)}
            />
          ))
        }
      </div>
      <div className={styles.questionConfirmation}>
        <div />
        {
          pickedQuestion != null ?
          <button onClick={() => null}>
            <div>Definitywnie</div>
            <ArrowRight />
          </button>
        : null
        }
      </div>
    </div>
  )
}

export default Question