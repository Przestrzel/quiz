import React from 'react'
import styles from './QuestionHelpers.module.scss';
import {ReactComponent as TelephoneIcon} from '../../../assets/helpers/telephone.svg';
import {ReactComponent as FiftyFiftyIcon} from '../../../assets/helpers/fiftyFifty.svg';
import {ReactComponent as AudienceIcon} from '../../../assets/helpers/audience.svg';
import QuestionHelperButton from './QuestionHelperButton';
import { useQuestionsContext } from '../../../context/QuestionsContext';

const HELPER_ICONS = {
  telephone: <TelephoneIcon />,
  fiftyFifty: <FiftyFiftyIcon />,
  audience: <AudienceIcon />,
}

const QuestionHelpers = () => {
  const { state: { helpers }, dispatch } = useQuestionsContext();

  const isHelperUsed = (key) => helpers[key] !== null;

  const onUseHelper = (key) => {
    if(isHelperUsed(key)) return;

    dispatch({ type: 'USE_HELPER', helper: key });
  }

  return (
    <div className={styles.helpersContainer}>
      <div className={styles.helpers}>
        {
          Object.keys(helpers).map(helper => (
          <QuestionHelperButton
            key={`helper__${helper}`}
            isUsed={isHelperUsed(helper)}
            onClick={() => onUseHelper(helper)}
          >
            {HELPER_ICONS[helper]}
          </QuestionHelperButton>))
        }
      </div>
    </div>
  )
}

export default QuestionHelpers