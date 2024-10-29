import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import path,{dirname} from 'path'
import { connectDB } from './config/db.js'
import Worker from './models/workers.model.js'
import Arab from './models/arabs.model.js'
import { fileURLToPath } from 'url'



dotenv.config()
connectDB()

const app = express()

app.use(express.json())      // allow to pass json to body
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname,'dist')))



app.get('/api/arabs', async (req,res)=>{
    const data = await Arab.find()
    res.send(data)
});

app.get('/api/workers', async (req,res) => {
    // const datta = await Worker.find()
    // const aaaa = await datta.sort()
    
    res.send(await Worker.find().sort({createdAt:-1}))  
});

app.get('/api/workers/:id', async (req,res) => {
    const data = await Worker.findById(req.params.id)
    res.send(data)
});


app.get('/api/arabworkers/:id', async (req,res) => {
    const data = await Worker.find({arab:req.params.id})
    // Worker.find()
    res.send(data)
});




app.post('/api/workers',async (req,res) => {
    const worker = req.body 
    const newWorker = new Worker(worker)
    await newWorker.save()
    res.send('saved succsfully \n'+ await Worker.find())
});



app.post('/api/arabs',async (req,res)=>{

    const newArab = new Arab(req.body)

    await newArab.save()
    res.send('saved \n'+await Arab.find())  
});

app.patch('/api/workers/:id',async (req,res) => {
    const worker = req.body 
    const updatedWorker = await Worker.findByIdAndUpdate(req.params.id,worker,{new:true})
    
    res.send('saved succsfully \n'+ await Worker.findById(req.params.id))
})


app.get('*',(req,res)=>{
    const page = path.join(__dirname, 'index.html')
    res.sendFile(page)
})
    
    
    
let Port = 4000
if (process.env.DEVELOPMENT=='true') {
    app.listen(Port,()=>console.log(`web is running on port ${Port}`))
    
} else {
    app.listen(process.env.PORT ,()=>console.log(`web is running on port ${process.env.PORT}`))
    
}