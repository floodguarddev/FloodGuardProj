const { default: mongoose } = require("mongoose");
const { addAdmin } = require("../src/services/admins.services");
const { seedUsers } = require("../src/seeders/users.seeders");
const { getMonthlyCounts } = require("../src/repositories/transaction.repository");
const { getNgosSummary } = require("../src/services/reports.services");
const { getMonthlyUserCounts } = require("../src/repositories/users.repository");

async function dropAllCollections(){
    const db = mongoose.connection.db;

    // Get all collections
    const collections = await db.listCollections().toArray();

    // Create an array of collection names and drop each collection
    collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
        await db.dropCollection(collectionName);
    });
}

//Connecting to DB
mongoose.connect(process.env.DB_URI)
.then(async ()=>{
    console.log('DB has been successfully connected');
    console.log(await getMonthlyUserCounts())
    // await dropAllCollections();

    // console.log('Collections have been deleted from db');

    //Creating Admin Right After Database Starts
    setTimeout(
        ()=>{
            addAdmin(process.env.ADMIN_NAME, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
            .then(
                (admin)=>{
                    console.log(`Admin has been created on ${admin.email}`);
                }
            ).catch(
                (error)=>{
                    console.log(`Unable to Creating admin due to ${error.message}`);
                }
            )
        }, 5000
    )
    
    
})
.catch((error)=>{
    console.log('Failed to connect to db: ' + error.message )
})