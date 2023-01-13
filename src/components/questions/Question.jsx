import React, { useCallback, useMemo, useState, useEffect } from 'react'
import useQuestions from '../../hooks/useQuestions';
import { useQuestionsContext } from '../../context/QuestionsContext';
import styles from './Question.module.scss';
import AnswerButton from './answerButton/AnswerButton';
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const { state: { questionIndex }, dispatch } = useQuestionsContext();
  const { questions, getQuestionText, getAnswers, isAnswerCorrect, count } = useQuestions();
  const navigate = useNavigate();
  const [ pickedQuestion, setPickedQuestion ] = useState(null);
  const [ isCorrect, setIsCorrect ] = useState(false);
  const [ isAnswered, setIsAnswered ] = useState(false);
  const [ isAnswering, setIsAnswering ] = useState(false);
  const question = useMemo(() => questions[questionIndex], [questionIndex, questions]);

  const onPickAnswer = useCallback((answerIndex) => {
    if(isAnswered || isAnswering) return;
    setPickedQuestion(answerIndex);
  }, [ isAnswered, isAnswering ]);

  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET' });
    navigate('/');
  }, [ navigate, dispatch ])

  useEffect(() => {
    if(isAnswered && !isCorrect) {
      setTimeout(resetQuiz, 3_000);
    }
  }, [ isAnswered, isCorrect, resetQuiz ])

  const nextQuestion = () => {
    setPickedQuestion(null);
    setIsCorrect(false);
    setIsAnswered(false);
    setIsAnswering(false);
    dispatch({ type: 'NEXT_QUESTION' });
  }

  const checkAnswer = () => {
    setIsAnswered(true);
    const isCorrect = isAnswerCorrect(question, pickedQuestion);
    setIsCorrect(isCorrect);
  }

  const onAnswer = () => {
    setIsAnswering(true);
    setTimeout(checkAnswer, 1_500);
  }

  const isNextQuestion = () => {
    return count !== questionIndex;
  }

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
              className={`${pickedQuestion === index ? styles.picked : ''}
              ${pickedQuestion === index && isCorrect && isAnswered ? styles.correct : ''}
              ${pickedQuestion === index && !isCorrect && isAnswered ? styles.incorrect : ''}`}
              onClick={() => onPickAnswer(index)}
            />
          ))
        }
      </div>
      <div className={styles.questionConfirmation}>
        <div />
        {
          pickedQuestion != null && !isAnswered && !isAnswering ?
          <button onClick={onAnswer}>
            <div>Definitywnie</div>
            <ArrowRight />
          </button>
        : null
        }
        {
          isAnswered && isCorrect &&  isNextQuestion?
          <button onClick={nextQuestion}>
            <div>Następne pytanie</div>
            <ArrowRight />
          </button>
        : null
        }
      </div>
    </div>
  )
}

export default Question