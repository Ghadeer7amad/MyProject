import "dotenv/config.js"
import express from "express"
import initApp from './App.Router.js'
const app = express()
const port = process.env.port || 3000


initApp(app, express)


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})