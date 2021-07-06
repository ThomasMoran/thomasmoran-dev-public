import React, { useEffect } from 'react'
import { useState } from 'react'

import Icon from '../Icon'
import Record from '../Record'
import SoundWave from '../SoundWave'
import SpotifyLogo from '../SpotifyLogo'
import './style.css'

const Spotify = () => {
  const [data, setData] = useState({
    album: '1',
    albumImageUrl: '',
    artist: 'Not Playing',
    duration: 0,
    isPlaying: false,
    progress: 0,
    songUrl: '',
    title: '',
  })
  const [trackProgress, setTrackProgress] = useState(0)
  let interval

  useEffect(() => {
    fetchSong()
  }, [])

  useEffect(() => {
    if (data.progress > 0 && data.duration > 0 && data.isPlaying) {
      interval = setInterval(() => {
        setTrackProgress(trackProgress => trackProgress + 3000)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [data.progress, data.duration])

  useEffect(() => {
    if (trackProgress > data.duration) {
      fetchSong()
      clearInterval(interval)
    }
  }, [trackProgress])

  const fetchSong = () => {
    fetch('/api/spotify')
      .then(response => response.json())
      .then(body => {
        if (body.isPlaying) {
          setData(body)
          setTrackProgress(body.progress)
        }
      })
  }

  return (
    <div className="spotify">
      <h5 className="spotify__title">
        <Icon name="Headphones" /> Currently Playing
      </h5>
      <div className="spotify__main">
        <div className="spotify__image">
          <div className="spotify__logo">
            <SpotifyLogo />
          </div>
          <div className="spotify__record">
            <Record isPlaying={data.isPlaying} imageUrl={data.albumImageUrl} />
          </div>
        </div>
        <div className="spotify__details" itemScope itemType="https://schema.org/MusicGroup">
          <div itemProp="track" itemScope itemType="https://schema.org/MusicRecording">
            <h6 itemProp="name">{data.title}</h6>
          </div>
          <p itemProp="name">{data.artist}</p>
          <SoundWave progress={Math.floor((trackProgress / data.duration) * 100) || 0} isPlaying={data.isPlaying} />
        </div>
      </div>
    </div>
  )
}

export default Spotify
