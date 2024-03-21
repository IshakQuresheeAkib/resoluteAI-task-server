const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors')

app.use(cors({
  origin:['http://localhost:5173','https://resoluteai-91587.web.app','https://resoluteai-91587.firebaseapp.com'],
  credentials: true
}))
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://resoluteAI:H4T6m07VeyS8bB03@cluster0.vuba6ki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db('resolteAI')
    const users = database.collection('users')

    app.get('/users',async(req,res)=>{
      const usersList = await users.find().toArray();
      console.log(usersList);
      res.send(usersList);
    })

    app.post('/users',async(req,res)=>{
      const user = req.body;
      const result = await users.insertOne(user)
      console.log(result);
      res.send(result)
    })

    app.delete('/users/:id',async(req,res)=>{
      const {id} = req.params;
      const query = {_id: new ObjectId(id)}
      const result = await users.deleteOne(query)
      res.send(result);
    })

    app.get('/',(req,res)=>{
        res.send('Hi World'); 
    })

    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
    client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// 

