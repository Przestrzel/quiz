import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Page.module.scss';

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartGame = useCallback(() => {
    navigate('/game');
  }, [navigate])

  return (
    <div className={styles.container}>
      <header>Walka o prezent!</header>

      <button className={styles.startGameButton} onClick={handleStartGame}>
        Start
      </button>
    </div>
  )
}

export default StartPage