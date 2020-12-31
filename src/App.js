import React from 'react'
import './App.css'
import Tabs from './common/Tabs/Tabs'
import CabsUpload from './components/Cabs/CabsUpload'

function App() {
  return (
    <div className='App'>
      <h1 style={{ textAlign: 'center' }}>ItWorks Reports</h1>
      <Tabs
        tabs={[
          {
            id: 0,
            tabName: 'CABS',
            content: <CabsUpload />,
          },
          {
            id: 1,
            tabName: 'Leadership',
            content: 'Leadership content',
          },
        ]}
      />
    </div>
  )
}

export default App
