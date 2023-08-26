import { connect } from "mongoose";

const connectDB= (url)=>{
    const options={
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }
    connect(url)
    .then((data)=>{
        console.log('connection successful');
    })
    .catch((err)=>{
        console.log('failed ',err);
    })
}

export default connectDB;