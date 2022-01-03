import  express from "express";
import  mongoose  from "mongoose";
import Cards from "./dbCards.js";
import Cors from 'cors'

const app  = express();
const port  = process.env.PORT || 8081
const conection_url = 'mongodb+srv://adm:uOqy0wjlBvCHtGPi@cluster0.vf9rj.mongodb.net/tinder-db?retryWrites=true&w=majority'

app.use(express.json())
app.use(Cors())
mongoose.connect(conection_url,{
    useNewUrlParser : true,
    //useCreateIndex : true,
    useUnifiedTopoLogy : true
})

app.get('/',(req,res)=>res.status(200).send("hello"))

app.post('/tinder/cards',(req,res)=>{
    const dbCard = req.body

    Cards.create(dbCard,(err,data)=>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
app.get('/tinder/cards',(req,res)=>{
    
    Cards.find((err,data)=>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.listen(port, ()=> console.log(`listening on localhost: ${port}`))

