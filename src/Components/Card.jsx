import React, { useEffect, useRef, useState } from 'react'
import './card.css'
import Data from './Data'
import timer from './Timer'

const Card = ({props:{musicnumber, setMusicNumer, setOpen}}) => {
    const [duration,setDuration] = useState(0)
    const [currentTime,setCurrentTime] = useState(0)
    const [volume,setVolume] = useState(0)
    const [showvolume,setShowVolume] = useState(false)
    const [play,setPlay] = useState(false)
    const AudioRef = useRef()


    const handleLoad = (e)=>{
        let src = e.nativeEvent.srcElement.src;
        let audio = new Audio(src);
        audio.onloadedmetadata = function() {
            if (audio.readyState > 0) {
                setDuration(audio.duration)
            }
        }
        if (play) { AudioRef.current.play()}
    }

    const HandlePay = ()=>{
        console.log("ddd")
        if (play) {
            AudioRef.current.pause()
            setPlay(false)
        }else{
            AudioRef.current.play()
            setPlay(true)
        }
    }
    const HandelUdate = ()=>{
        const currentData = AudioRef.current.currentTime;
        setCurrentTime(currentData)
    }
    const ChangeData = (e)=>{
        const CurrentTime = Number(e.target.value);
        AudioRef.current.currentTime = CurrentTime;
        setCurrentTime(CurrentTime)
    } 
    const HandlePrev = (n)=>{
        setMusicNumer((music)=>{
            if (n>0) {
                return music + n > Data.length -1 ? 0 : music + n;
            }else{
                return music + n < 0 ? Data.length -1 : music + n;
            }
        })
    }
 
    useEffect(()=>{
        AudioRef.current.volume = volume /100;
    },[volume])

  return (
    <div className='card'>
        <div className="nav">
            <i className='material-icon'>FRK</i>
            <span>Now Playing {musicnumber +1} / {Data.length}</span>
            <i className='material-icon' onClick={()=> setOpen(true)}>🎶</i>
        </div>
        <div className="img">
            <img src={Data[musicnumber].img_src} alt="" />
        </div>
        <div className="details">
            <p className='title'>{Data[musicnumber].title}</p>
            <p className='artist'>{Data[musicnumber].artist}</p>
        </div>
        <div className="progress">
            <input type="range" min={0} max={duration} value={currentTime} onChange={(e)=> ChangeData(e)}/>
        </div>
        <div className="timer">
            <span>{timer(currentTime)}</span>
            <span>{timer(duration)}</span>
        </div>
        <div className="controls">
            <i className='material-icon'>🔄</i>
            <i className='material-icon' id='prev' onClick={()=> HandlePrev(-1)}>⏪</i>
            <div className="play" onClick={HandlePay}>
                <i className='material-icon'>⏸</i>
            </div>
            <i className='material-icon' id='next' onClick={()=> HandlePrev(1)}>⏩</i>
            <i className='material-icon' onClick={()=> setShowVolume(prev => !prev)}>🔊</i>
            <div className={`volume ${showvolume ? 'show' : ''}`}>
            <i className='material-icon' onClick={()=> setVolume(v => v > 0 ? 0 : 100)}>🔊</i>
            <input type="range" min={0} max={100} onChange={(e)=> setVolume(e.target.value)} value={volume}/>
            <span>{volume}</span>
            </div>
        </div>
        <audio src={Data[musicnumber].src} hidden onLoadStart={handleLoad} ref={AudioRef} onTimeUpdate={HandelUdate}></audio>
    </div>
  )
}

export default Card
