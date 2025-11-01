import mongoose from 'mongoose'
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DataBase")
    } catch (error) {
        console.log("DataBase Error" + error)
    }
}

export default connectToDb