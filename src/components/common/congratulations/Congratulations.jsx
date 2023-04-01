import React from 'react'
import {ReactComponent as GiftIcon} from '../../../assets/gift.svg';
import styles from './Congratulations.module.scss';

const Congratulations = () => {
  return (
    <div className={styles.congratulations}>
      <div>Gratulacje!</div>
      <GiftIcon />
    </div>
  )
}

export default Congratulations