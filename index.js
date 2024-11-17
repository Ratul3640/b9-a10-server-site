const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o9b6e9v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)
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

        const craftsCollection = client.db("assignment10DB").collection('crafts');


        // work 1
        app.post('/crafts', async (req, res) => {
            const newCrafts = req.body;
            console.log(newCrafts)
            const result = await craftsCollection.insertOne(newCrafts);
            res.send(result)
        })

        // work 2

        app.get('/crafts', async (req, res) => {
            const cursor = craftsCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




        app.put('/crafts/:id', async (req, res) => {
            const id = req.params.id;
            const updateCraft = req.body;
            // console.log( updateCraft)
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const craft = {
                // {item_name, subcategory_Name, short_description, price, rating, customization, processing_time, stockStatus, image }
                $set: {
                    item_name: updateCraft.item_name,
                    subcategory_Name: updateCraft.subcategory_Name,
                    short_description: updateCraft.short_description,
                    price: updateCraft.price,
                    rating: updateCraft.rating,
                    customization: updateCraft.customization,
                    processing_time: updateCraft.processing_time,
                    stockStatus: updateCraft.stockStatus,
                    image: updateCraft.image,
                }
            }

            const result = await craftsCollection.updateOne(filter, craft, options);
            res.send(result)


        })