import React from 'react'
import useQuestions from '../../../hooks/useQuestions';
import styles from './QuestionProgress.module.scss';

const QuestionProgress = ({ currentQuestion }) => {
  const { questions, getAuthor, count } = useQuestions();

  const formatAuthor = (question) => {
    const author = getAuthor(question);
    const splittedWords = author.split(' ');
    const isMoreThanOneWord = splittedWords.length > 1;

    return isMoreThanOneWord ? `${splittedWords[0][0]}. ${splittedWords[1]}` : author;
  }

  return (
    <div className={styles.progressContainer}>
      <div>
        KOŁA RATUNKOWE
      </div>
      <div className={styles.questions}>
      {
      questions.map((question, index) => (
        <div
          key={`progress__${question.id}`}
          className={`
            ${styles.questionIndicator}
            ${index === currentQuestion ? styles.currentQuestion : ''}
            ${index < currentQuestion ? styles.answeredQuestion : ''}
            `}>
          <div className={styles.questionIndicator__number}>{index + 1}</div>
          <div className={styles.questionIndicator__author}>
            <span>{ formatAuthor(question) }</span>
          </div>
        </div>
        ))
      }
      </div>
    </div>
  )
}

export default QuestionProgress