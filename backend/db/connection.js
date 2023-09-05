const { default: mongoose } = require("mongoose");


mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log('Successfully connected to db');
})
.catch((error)=>{
    console.log('Failed to connect to db: ' + error.message )
})