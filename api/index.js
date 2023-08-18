import express from 'express'
const app = express()
import userRouter from './routes/users.js'
import postRouter from './routes/posts.js'
import likeRouter from './routes/likes.js'
import authRouter from './routes/auth.js'
import cmtRouter from './routes/comments.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

//middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', true);
    next();
})
app.use(express.json())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/auth', authRouter)
app.use('/api/likes', likeRouter)
app.use('/api/cmt', cmtRouter)

app.listen(8800, () => {
    console.log(`Server running at 8800`)
})