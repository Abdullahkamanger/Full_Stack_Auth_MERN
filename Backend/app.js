import 'dotenv/config'
import express from 'express'
import connectDb from './src/config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors())

connectDb();

app.use('/api/auth', userRoutes)




app.listen(PORT, ()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
})