import React, { useCallback, useMemo, useState, useEffect } from 'react'
import useQuestions from '../../hooks/useQuestions';
import { useQuestionsContext } from '../../context/QuestionsContext';
import styles from './Question.module.scss';
import AnswerButton from './answerButton/AnswerButton';
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const { state: { questionIndex, helpers }, dispatch } = useQuestionsContext();
  const {
    questions,
    getQuestionText,
    getAnswers,
    isAnswerCorrect,
    count,
    getCorrectAnswerIndex } = useQuestions();
  const navigate = useNavigate();
  const [ pickedQuestion, setPickedQuestion ] = useState(null);
  const [ isCorrect, setIsCorrect ] = useState(false);
  const [ isAnswered, setIsAnswered ] = useState(false);
  const [ isAnswering, setIsAnswering ] = useState(false);
  const [ filteredAnsweres, setFilteredAnswers ] = useState([]);
  const question = useMemo(() => questions[questionIndex], [questionIndex, questions]);

  const onPickAnswer = useCallback((answerIndex) => {
    if(isAnswered || isAnswering || filteredAnsweres.includes(answerIndex)) return;
    setPickedQuestion(answerIndex);
  }, [ isAnswered, isAnswering, filteredAnsweres ]);

  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET' });
    navigate('/');
  }, [ navigate, dispatch ])

  useEffect(() => {
    if(isAnswered && !isCorrect) {
      setTimeout(resetQuiz, 5_000);
    }
  }, [ isAnswered, isCorrect, resetQuiz ])

  const getTwoIncorrectAnswerIndex = useCallback(() => {
    const answerIndexes = [0, 1, 2, 3];
    const correctAnswerIndex = getCorrectAnswerIndex(question);
    const filteredAnswerIndexes = answerIndexes.filter(index => index !== correctAnswerIndex);
    const randomIndex = Math.floor(Math.random() * filteredAnswerIndexes.length);
    const firstIncorrectAnswerIndex = filteredAnswerIndexes[randomIndex];
    const filteredAnswerIndexesWithoutFirstIncorrectAnswer = filteredAnswerIndexes.filter(
      index => index !== firstIncorrectAnswerIndex
    );
    const secondRandomIndex = Math.floor(Math.random() * filteredAnswerIndexesWithoutFirstIncorrectAnswer.length);
    const secondIncorrectAnswerIndex = filteredAnswerIndexesWithoutFirstIncorrectAnswer[secondRandomIndex];
    return [firstIncorrectAnswerIndex, secondIncorrectAnswerIndex];
  }, [ getCorrectAnswerIndex, question ]);

  useEffect(() => {
    const usedQuestionIndex = helpers.fiftyFifty;
    if(usedQuestionIndex !== questionIndex) return;

    setFilteredAnswers(getTwoIncorrectAnswerIndex());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ helpers.fiftyFifty, questionIndex ])


  const nextQuestion = () => {
    setPickedQuestion(null);
    setIsCorrect(false);
    setIsAnswered(false);
    setIsAnswering(false);
    setFilteredAnswers([]);
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
              ${(isAnswered && getCorrectAnswerIndex(question) === index) ? styles.correct : ''}
              ${pickedQuestion === index && !isCorrect && isAnswered ? styles.incorrect : ''}
              ${filteredAnsweres.includes(index) ? styles.filtered : ''}`}
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