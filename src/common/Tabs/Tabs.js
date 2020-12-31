import React, { useState } from 'react'
import styles from './tabs.module.css'

const Tabs = ({ tabs }) => {
  const [state, setState] = useState({
    activeTab: tabs[0],
  })
  const { activeTab } = state

  const setTab = (tab) => {
    setState((prevState) => ({
      ...prevState,
      activeTab: tab,
    }))
  }

  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <span
            key={tab.id}
            className={`${styles.tab} ${
              activeTab.id === tab.id ? styles.activeTab : ''
            }`}
            onClick={() => setTab(tab)}
          >
            {tab.tabName}
          </span>
        ))}
      </div>
      <div className='tab-content'>{activeTab?.content}</div>
    </>
  )
}

export default Tabs
