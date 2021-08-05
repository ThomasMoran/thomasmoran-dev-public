import S3 from 'aws-sdk/clients/s3'
import Cors from 'cors'
import faunadb from 'faunadb'
import { v4 as uuidv4 } from 'uuid'

import { runMiddleware } from './utils'

const cors = Cors({
  methods: ['GET', 'POST'],
  origin: 'https://www.thomasmoran.dev',
})

// configure fauna
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
})

const handler = async (req, res) => {
  // Run Cors middleware and handle errors.
  await runMiddleware(req, res, cors)

  try {
    if (req.method === 'POST') {
      const name = req.body.name
      const imageURI = req.body.imageURI

      // upload to s3
      const imageAwsURL = await uploadImage(imageURI)

      // save to database
      if (imageAwsURL) {
        client
          .query(q.Create(q.Collection(process.env.FAUNA_COLLECTION), { data: { status: 'pending', name, imageURL: imageAwsURL } }))
          .then(() => {
            res.status(200).send('Success') // success
          })
          .catch(err => {
            res.status(500).send('Error: 500') // internal server error
            console.error('Error:', err) // output for netlify log
          })
        return
      }

      return res.status(400).send('Error: 400') // bad request
    } else if (req.method === 'GET') {
      // handle GET request
      // fetch all from database in random order
      client
        .query(q.Paginate(q.Match(q.Index('all_by_status'), 'approved')))
        .then(dbRes => {
          if (!dbRes.data) {
            res.status(200).json(jsonData) // success
            return
          }

          const jsonData = dbRes.data.map(item => ({
            name: item[0],
            imageURL: item[1],
          }))
          res.status(200).json(jsonData) // success
        })
        .catch(err => {
          res.status(500).send('Error: 500') // internal server error
          console.error('Error:', err) // output for netlify log
        })

      return
    }

    res.status(405).send('Error: 405') // method not allowed response
  } catch (err) {
    res.status(500).json({ msg: err.message })
    console.error(err) // output for netlify log
  }
}

const uploadImage = async imageURI => {
  var s3 = new S3({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  })
  const buffer = Buffer.from(imageURI.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  const params = {
    Key: uuidv4() + '.png',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
  }

  const response = await s3.upload(params).promise()

  return response.Location || null
}

export default handler
