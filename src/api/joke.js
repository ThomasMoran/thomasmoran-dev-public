import fetch from 'node-fetch'

export default async function getJoke(req, res) {
  try {
    const response = await fetch('https://icanhazdadjoke.com', {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      res.status(response.status).send(response.statusText)
    }
    const data = await response.json()

    res.json({ msg: data.joke })
  } catch (error) {
    res.status(500).send(error)
  }
}
