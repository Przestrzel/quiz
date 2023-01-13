import data from '../data/questions.json';
import { v4 as uuidv4 } from 'uuid';

const useQuestions = () => {

  const getData = () => {
    return data.map(question => ({
      ...question,
      id: uuidv4()
    }));
  }

  const getAnswers = (question) => {
    return question["Answers"];
  }

  const getAuthor = (question) => {
    return question["Author"];
  }

  const getCorrectAnswerIndex = (question) => {
    return question["Correct Answer"];
  }

  const isAnswerCorrect = (question, answerIndex) => {
    return getCorrectAnswerIndex(question) === answerIndex;
  }

  const getQuestions = () => {
    return getData();
  }

  const getQuestionText = (question) => {
    return question["Question"];
  }

  const count = () => {
    return getData().length;
  }


  return {
    questions: getQuestions(),
    getAnswers,
    getAuthor,
    isAnswerCorrect,
    getCorrectAnswerIndex,
    getQuestionText,
    count: count()
  }
}

export default useQuestions