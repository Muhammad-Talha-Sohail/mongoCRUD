/*
const express = require('express');
const app = express();
const port = 3000; 

 

app.get( '/',(req,res)=>{
    res.send('<h1>Hello User you are on Home Page</h1>');
})

app.get('/contact',(req,res)=>
{
     res.send(`<h1>Hello User you are on Contact Page</h1>`);
})

app.get('/about',(req,res)=>
{
     res.send(`<h1>Hello User you are on About Page</h1>`);
})



app.listen(port,()=>
{
    console.log(" Program Run ");
})





*/

//mongoDB connection establishment

// const moongose = require('mongoose');
// const express = require('express');
// const app = express();
// app.use(express.json());

// const port = 3000;
// async function connectDB(){
//     try{
//         await mangoose.connect("mongodb+srv://TalhaSohail:talha12345s@cluster0.xjwahqi.mongodb.net/", {
//             useNewUrlParser: true
//         });
//         console.log("Database is connected successfully!")
//     }
//     catch(error){
//         console.log(error);
//         process.exit(1);
//     }
// }
// connectDB()
const mongoose = require('mongoose');

const express = require('express');
const app = express();
app.use(express.json())



const port = 3000; 
async function connectDb() {
  try {
      await mongoose.connect("mongodb+srv://TalhaSohail:talha12345s@cluster0.xjwahqi.mongodb.net/" ,{
          useNewUrlParser: true
      });
      console.log("Database connected successfully!")
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
}

connectDb()


const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    phone:Number,
})


const User = mongoose.model('user',UserSchema);

app.post('/create',async (req,res)=>{
    const {username,email,phone}=req.body;            // Writwe data into data base
    const user = new User ({
        username ,
        email,
        phone
    })


await user.save()
    res.status(200).json(user)


})

app.get('/getUser',async (req,res)=>{
  
  const user =await User.find()     // Read data to data base
  res.status(200).json(user)

    })

app.put('/update/:id', async(req,res)=>{
   // const { username, email, phone } = req.body; 
    const options = { new: true };
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,options);        //Updating the data
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }

})




app.delete('/delete/:id' ,async(req,res)=>{
    const options = { new: true };
    try {
        const user = await User.findByIdAndDelete(req.params.id, options);        //delete  the data
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }

})









app.listen(port,()=>
{
    console.log(`Example of  mongoose db on port : ${port}`);
})






/*
CRUD operation 
without CRUD no backend perform


*/