import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("MONGODB_URI is not defined");
}

let cached=global.mongoose;

if (!cached) {
    cached=global.mongoose={conn:null,promise:null}
}


export async function DBConnection(){
    if (cached.conn) {
        return cached.conn; 
    }
    if (!cached.promise) {
        cached.promise=mongoose.connect(`${MONGODB_URI}`).then(mongoose => mongoose.connection)
    }

 try {
    cached.conn = await cached.promise;
 } catch (error) {
    throw new Error(`connection error ${error}`)
 }
 return cached.conn
}
