const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const app = express()
const bearerToken = require('express-bearer-token')
const PORT = 4000


app.use(express.json())
app.use(cors())

app.use(bearerToken())

app.get('/',(req,res)=>{
    res.status(200).send('<h1>API</h1>')
})

const{ dbConf }= require('./config/db')
dbConf.getConnection((err,connection)=>{
    if(err){
        console.log('Error MYSQL', err.sqlMessage);
    }
    console.log(`mySql connect: ${connection.threadId}`);
})

const { userRouter }= require('./routers')
app.use('/user',userRouter)


app.listen(PORT,()=>console.log(`Running API at ${PORT}`));