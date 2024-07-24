import express from 'express'
import dotenv from 'dotenv'
import { AppDataSource } from './database/config'
import errorMiddleware from './middlewares/errorMiddleware'
import { authRouter } from './routes/authRoutes'
import { apiRouter } from './routes/apiRoutes'
import { findBalanceService } from './services/findBalanceService'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authRouter)

app.use(apiRouter)

app.use(errorMiddleware)

app.listen(3003, async () => {
    await AppDataSource.initialize()
        .then((data) => {
            // here you can start to work with your database
            console.log("DB working!");

            // console.log(data.getRepository(Users).find());
        })
        .catch((error) => console.log("Error: ", error))
    }
)




