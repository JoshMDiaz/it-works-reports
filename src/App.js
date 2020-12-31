import React from 'react'
import './App.css'
import DevMode from './common/DevMode/DevMode'
import Tabs from './common/Tabs/Tabs'
import CabsUpload from './components/Cabs/CabsUpload'
import LeadershipUpload from './components/Leadership/LeadershipUpload'

function App() {
  let devMode = localStorage.getItem('devMode')

  return (
    <div className={`App ${devMode ? 'dev-mode' : ''}`}>
      <h1 style={{ textAlign: 'center' }}>ItWorks Reports</h1>
      <Tabs
        tabs={[
          {
            id: 0,
            tabName: 'CABS',
            content: <CabsUpload devMode={devMode} />,
          },
          {
            id: 1,
            tabName: 'Leadership',
            content: <LeadershipUpload devMode={devMode} />,
          },
        ]}
      />
      <DevMode />
    </div>
  )
}

export default App
