import Cors from 'cors'
import fetch from 'node-fetch'
import querystring from 'querystring'

import { runMiddleware } from './utils'

const cors = Cors({
  methods: ['GET'],
  origin: 'https://www.thomasmoran.dev',
})

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

const handler = async (req, res) => {
  // Run Cors middleware and handle errors.
  await runMiddleware(req, res, cors)

  try {
    if (req.method !== 'GET') {
      return res.status(405).send('Error: 405') // method not allowed response
    }

    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false })
    }

    const song = await response.json()
    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map(_artist => _artist.name).join(', ')
    const album = song.item.album.name
    const albumImageUrl = song.item.album.images[0].url
    const songUrl = song.item.external_urls.spotify
    const duration = song.item.duration_ms
    const progress = song.progress_ms

    res.status(200).json({ album, albumImageUrl, artist, isPlaying, songUrl, title, duration, progress })
  } catch (error) {
    res.status(500).json({ msg: error.message })
    console.error(error) // output for netlify log
  }
}

export default handler
