import 'module-alias/register.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors' // Mengimpor CORS
import dataRoutes from '../server/routes/dataRoutes.js'

const app = express()
const port = 5001

// Daftar origins yang diizinkan
const allowedOrigins = [
  'http://localhost:3001',
  'http://10.129.48.138:3001',
  'http://fad-grm.local:3001',
]

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('CORS not allowed'), false)
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}

// Menggunakan CORS middleware dengan konfigurasi yang lebih fleksibel
app.use(cors(corsOptions))

app.use(bodyParser.json()) // Middleware untuk parsing JSON
app.use(express.json()) // Middleware untuk parsing JSON

// Endpoint untuk testing
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello Express',
  })
})

// Menggunakan routes untuk data
app.use('/api', dataRoutes)

app.listen(port, () => {
  console.log('Server Running in port 5001')
})
