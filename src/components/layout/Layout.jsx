import React from 'react'
import styles from './Layout.module.scss';
import Logo from '../../assets/milioners.png';

const Layout = ({children}) => {
  return (
    <div className={styles.layout}>
      <img src={Logo} alt="Logo" />
      { children }
    </div>
  )
}

export default Layout