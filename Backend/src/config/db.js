import mongoose from 'mongoose';


const connectDB = async ()=>{

    if (mongoose.connections[0].readyState) {
    return; // Already connected
  }
if(process.env.DB_URI){
    try{
        await mongoose.connect(process.env.DB_URI)
        //the name of database to which my app is connected to
        const dbName = mongoose.connection.name
        // also  the host
        const host = mongoose .connection.host
        console.log(`database connected to ${host} and db name is ${dbName}`)
    }catch(error){
        console.log(`Error connecting to database: ${error.message}`)
    }
}else{
    console.log('couldn\'t find a connection string')
}
}

export default connectDB