"use client"
import React, { useState, useRef, useEffect } from 'react';
import styles from './video.module.css'; 
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Update the duration of the video when it's loaded
    const handleLoadedData = () => {
      setDuration(videoRef.current.duration);
    };

    // Update the current time of the video as it plays
    const handleTimeUpdate = () => {
      setCurrentTime(videoRef.current.currentTime);
    };

    // Add event listeners to the video element
    videoRef.current.addEventListener('loadeddata', handleLoadedData);
    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

    // Clean up the event listeners when the component unmounts
    return () => {
      videoRef.current.removeEventListener('loadeddata', handleLoadedData);
      videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleSpeedChange = (e) => {
    const newSpeed = e.target.value;
    setPlaybackRate(newSpeed);
    videoRef.current.playbackRate = newSpeed;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };

  return (
      <div>
        {/* <h1 className={styles.text}>This is the Video Application for Athena Square</h1> */}
        <video className={styles.video} ref={videoRef} src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_30mb.mp4"></video>
        
        <button className={styles.button} onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <input
          className={styles.volumeslider} /* Apply volume slider style */
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      
        <input
          className={styles.speedslider} /* Apply speed slider style */
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={playbackRate}
          onChange={handleSpeedChange}
        />
        <div className={styles.progressbar}> {/* Apply progress bar style */}
        <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={(currentTime / duration) * 100}
        onChange={handleProgressChange}
      />
      <br></br>
      <progress className= {styles.progressbarauto}value={currentTime} max={duration}></progress>
        </div>
      </div>
    );
  };

export default VideoPlayer;
