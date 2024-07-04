import React, { useState } from 'react'
import Card from './Components/Card'
import List from './Components/List'
import './index.css'

const App = () => {
  const [musicnumber,setMusicNumer] = useState(0);
  const [open,setOpen] = useState(false);
  return (
   <div className="container">
    <div className="shape shape-1"></div>
    <div className="shape shape-2"></div>
    <div className="shape shape-3"></div>
    <main>
      <Card props={{musicnumber, setMusicNumer, setOpen}}/>
      <List props={{ open, setOpen, musicnumber, setMusicNumer}}/>
    </main>
    </div>
  )
}

export default App
