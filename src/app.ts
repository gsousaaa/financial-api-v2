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
    console.log(`Server rodando na porta ${envVariables.PORT}`)
    await AppDataSource
        .initialize()
        .then(async () => {
            console.log('Database connectado com sucesso!');

            return AppDataSource.isInitialized;
        })
        .catch((error) => console.log(error));
}
)




