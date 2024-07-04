import React, { useEffect, useState } from 'react'
import './list.css'
import Data from './Data'
import timer from './Timer'
const List = ({props:{ open, setOpen, musicnumber, setMusicNumer}}) => {
  return (
    <div className={`list ${open ? 'show' : ''}`}>
      <div className='header'>
        <div>
            <i className='material-icon'>🎶</i>
            <span>Music List</span>
        </div>
       <i onClick={()=> setOpen(false)}>❌</i>
      </div>
      <ul>
        {
            Data.map((curElem, index)=>{
              return (
                <li key={curElem.id} onClick={()=> setMusicNumer(index)} className={`${musicnumber === index ? 'playing' : ''}`}>
                    <div className='row'>
                        <span>{curElem.title}</span>
                        <p>{curElem.artist}</p>
                    </div>
                    <Duration curElem={curElem}/>
                </li>
                 )
            })
        }
      </ul>
    </div>
  )
}

export default List

const Duration = ({curElem})=>{
  const[duration,setDuration] = useState(0)
  useEffect(()=>{
    const audio = new Audio(curElem.src)
    audio.onloadedmetadata = function() {
      if (audio.readyState > 0) {
        setDuration(audio.duration)
      }
    }
  },[curElem])
return(
  <span className='duration'>{timer(duration)}</span>
)
}