import React, { useState } from 'react'
import styles from './dev-mode.module.css'

const DevMode = () => {
  const [checked, setChecked] = useState(!!localStorage.getItem('devMode'))

  const updateChecked = () => {
    if (checked) {
      localStorage.removeItem('devMode')
    } else {
      localStorage.setItem('devMode', true)
    }
    setChecked(!checked)
  }

  return (
    <div className={styles.devMode}>
      <input
        type='radio'
        id='devMode'
        name='devMode'
        checked={checked}
        onClick={updateChecked}
        onChange={() => console.log('change')}
      />
      <label htmlFor='devMode'>Dev Mode</label>
    </div>
  )
}

export default DevMode
