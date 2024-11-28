import express from 'express'
import cors from 'cors'
import { Mongo } from './database/mongo.js'
import { config } from 'dotenv' 
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'
import platesRouter from './routes/plates.js'
import ordersRouter from './routes/orders.js'

config()

//função principal do aplicativo
async function main () {
    const hostname = 'localhost'
    const port = 3000

    //construção do aplicativo
    const app = express()

    const mongoConnection = await Mongo.connect({ mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME })
    console.log(mongoConnection)
    
    //organiza a resposta do servidor
    app.use(express.json())
    app.use(cors())

    //refinindo as rotas
    app.get('/', (req, res) => {
        res.send({
            success: true, 
            statusCode: 200,
            body: 'Bem vindo ao MyGastronomy!'
        })
    })

    // rotas
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/plates', platesRouter)
    app.use('/orders', ordersRouter)
  
    app.listen(port, () => {
        console.log(`Servidor sendo executado em: http://${hostname}:${port}`)
    })
}

//fazer rodar a função
main()