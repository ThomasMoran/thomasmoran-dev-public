import Cors from 'cors'
import fetch from 'node-fetch'

import { runMiddleware } from './utils'

const cors = Cors({
  methods: ['GET'],
  origin: 'https://www.thomasmoran.dev',
})

export default async function getJoke(req, res) {
  // Run Cors middleware and handle errors.
  await runMiddleware(req, res, cors)

  try {
    if (req.method !== 'GET') {
      return res.status(405).send('Error: 405') // method not allowed response
    }

    const response = await fetch('https://icanhazdadjoke.com', {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      return res.status(response.status).send(response.statusText)
    }
    const data = await response.json()

    res.json({ msg: data.joke })
  } catch (error) {
    res.status(500).send(error)
  }
}
