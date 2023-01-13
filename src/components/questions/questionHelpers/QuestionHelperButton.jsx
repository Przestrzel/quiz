import React from 'react'
import styles from './QuestionHelpers.module.scss';

const QuestionHelperButton = ({children, onClick, isUsed}) => {
  return (
    <button
      className={`${styles.helperButton} ${isUsed ? styles.helperButtonUsed: ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default QuestionHelperButton