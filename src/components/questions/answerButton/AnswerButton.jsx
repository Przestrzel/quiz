import React from 'react'
import styles from './AnswerButton.module.scss';

const AnswerButton = ({text, onClick, className = ''}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      { text }
    </button>
  )
}

export default AnswerButton