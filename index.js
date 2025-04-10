const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middlewate
app.use(cors());
app.use(express.json());




const uri = process.env.MONGODB_URI;

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

    const userCollection = client.db("AURAFashionDB").collection("users");

    // User API
    app.post('/users', async(req, res) => {
      const user = req.body;
      const query = {email: user.email};
      const existingUser = await userCollection.findOne(query);
      if(existingUser){
        return res.send({message: 'user already exist', insertedId: null})
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    

    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`AURA server setting on port ${port}`);
})