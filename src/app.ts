import express from 'express'
import { AppDataSource } from './database/config'
import errorMiddleware from './middlewares/errorMiddleware'
import { authRouter } from './routes/authRoutes'
import { apiRouter } from './routes/apiRoutes'
import cors from 'cors'
import { envVariables } from './env'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authRouter)

app.use(apiRouter)

app.use(errorMiddleware)

app.listen(envVariables.PORT, async () => {
    await AppDataSource.initialize()
        .then((data) => {
            // here you can start to work with your database
            console.log("DB working!");

        })
        .catch((error) => console.log("Error: ", error))
    }
)




