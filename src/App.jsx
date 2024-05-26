import React from 'react'

 import Hero from './assets/Components/Hero';
 import Demo from './assets/Components/Demo';

import './App.css'
const App = () => {
  return (
    <main>
      <div className='main'>
            <div className='gradient'></div>
      </div>

      <div className='app'>
      <Hero></Hero>
      <Demo></Demo>
      </div>

    </main>
    
  )
}

export default App