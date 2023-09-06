const { default: mongoose } = require("mongoose");

async function dropAllCollections(){
    const db = mongoose.connection.db;

    // Get all collections
    const collections = await db.listCollections().toArray();

    // Create an array of collection names and drop each collection
    collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
        db.dropCollection(collectionName);
    });
}

//Connecting to DB
mongoose.connect(process.env.DB_URI)
.then(async ()=>{
    console.log('DB has been successfully connected');

    // await dropAllCollections();

    // console.log('Collections have been deleted from db');
})
.catch((error)=>{
    console.log('Failed to connect to db: ' + error.message )
})