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

        // work 3 delete method
        app.delete('/crafts/:id', async (req, res) => {
            const id = req.params.id;
            console.log('Delete id :', id)
            const query = { _id: new ObjectId(id) };
            const result = await craftsCollection.deleteOne(query);
            res.send(result)
        })

        // work 4 : craft details get method

        app.get('/crafts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await craftsCollection.findOne(query);
            res.send(result)
        })



        // work 5: craft update
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

        const CreativeExpressionCollection = client.db("assignment10DB").collection('CreativeExpressions');

        app.get('/CreativeExpressions', async (req, res) => {
            const cursor = CreativeExpressionCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })
        app.get('/CreativeExpressions/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await CreativeExpressionCollection.findOne(query);
            res.send(result)
        })

        const HandcraftedWondersCollection = client.db("assignment10DB").collection('HandcraftedWonders');
        app.get('/HandcraftedWonders', async (req, res) => {
            const cursor = HandcraftedWondersCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })
        app.get('/HandcraftedWonders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await HandcraftedWondersCollection.findOne(query);
            res.send(result)
        })


        const ArtisianDelightsCollection = client.db("assignment10DB").collection('ArtisianDelights');
        app.get('/ArtisianDelights', async (req, res) => {
            const cursor = ArtisianDelightsCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })

        app.get('/ArtisianDelights/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await ArtisianDelightsCollection.findOne(query);
            res.send(result)

        })

        const MasterpieceCollectionsCollection = client.db("assignment10DB").collection('MasterpieceCollections');


        app.get('/MasterpieceCollections', async (req, res) => {
            const cursor = MasterpieceCollectionsCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })

        app.get('/MasterpieceCollections/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await MasterpieceCollectionsCollection.findOne(query);
            res.send(result)

        })

        const ArtisticTreasuresCollection = client.db("assignment10DB").collection('ArtisticTreasures');

        app.get('/ArtisticTreasures', async (req, res) => {
            const cursor = ArtisticTreasuresCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })
        app.get('/ArtisticTreasures/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await ArtisticTreasuresCollection.findOne(query);
            res.send(result)

        })

        const CraftedEleganceCollection = client.db("assignment10DB").collection('CraftedElegance');

        app.get('/CraftedElegance', async (req, res) => {
            const cursor = CraftedEleganceCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })
