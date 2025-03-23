import app from './app.js';
import { dbConnection } from './db/dbConnection.js';
import dotnev from 'dotenv'
dotnev.config({
    path:'./.env'
})

const PORT = process.env.PORT || 8000;

dbConnection().
then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running at the ${PORT}`)
})})
.catch((error)=>
    {
        console.log('Error connecting to the database');
    })